import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-sizes',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    list:any = [];
    customer_name = '';
    customer_review = '';
    customer_place = '';
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
        this.apiService.index('testimonials').subscribe(data => {
            this.list = data.data;
            this.loading = false;
        });
    }


    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'testimonials');
    }

    show(id) {
        this.apiService.show('testimonials/' + id).subscribe((data) => {
            const value = data.data;
            this.customer_name = value.customer_name;
            this.customer_review = value.customer_review;
            this.customer_place = value.customer_place;
            this.editSizeId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'testimonials/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    sizeSwitch(id) {
        this.apiCall('getData', 'testimonialsSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchtestimonials', query)
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
            customer_name: this.customer_name,
            customer_place: this.customer_place,
            customer_review: this.customer_review,
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
        this.customer_name = this.editSizeId = '';
        this.customer_place =  '';
        this.customer_review = '';
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
                this.apiCall('destroy', 'testimonials/' + id);
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
