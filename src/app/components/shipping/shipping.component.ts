import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-sizes',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    list:any = [];
    qty = '';
    price = '';
    to_qty = '';
    editSizeId = '';
    modalBoxName;
    loadingBtn = false;
    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
      this.index();
      this.search();
    }


    index() {
        this.loading = true;
        this.apiService.index('shipping').subscribe(data => {
            this.list = data.data;
            this.loading = false;
        });
    }


    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'shipping');
    }

    show(id) {
        this.apiService.show('shipping/' + id).subscribe((data) => {
            const value = data.data;
            this.qty = value.qty;
            this.price = value.price;
            this.to_qty = value.to_qty;
            this.editSizeId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'shipping/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    sizeSwitch(id) {
        this.apiCall('getData', 'shippingSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchshipping', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.list = [];
            } else {
                this.list = result.data;
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            price: this.price,
            qty: this.qty,
           to_qty: this.to_qty
        } : value;
        this.apiService[name](url, value).subscribe((data) => {
            console.log(data.error);
            if (data.error === false) {
                this.toastr.success(data.message);
                this.loadingBtn = false;
                this.popUpClose();
                this.index();
            } else {
                this.toastr.error(data.message);
                this.loadingBtn = false;
                this.errorMsg = data.data;
            }
        });
    }

    openModalBox(id = '') {
        if (id) {
            this.modalBoxName = 'Edit';
            this.show(id);
        } else {
            this.modalBoxName = 'Create';
        }
        this.showPopup = true;
    }

    popUpClose() {
        this.showPopup = false;
        this.price = this.editSizeId = '';
        this.qty =  '';
        this.to_qty =  '';
        this.errorMsg = [];
    }

    keyPress(event, type, id = '') {
        if (event.keyCode === 13) {
            if (type === 'Create') {
                this.store();
            } else if (type === 'Edit') {
                this.update(id);
            }
        }
    }

    swalCall(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.apiCall('destroy', 'shipping/' + id);
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your data is safe.',
                    'error'
                );
            }
        });
    }
}
