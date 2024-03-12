import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-promo-codes',
    templateUrl: './coupon-codes.component.html',
    styleUrls: ['./coupon-codes.component.css']
})
export class CouponCodesComponent implements OnInit {

    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    sno = 1;
    showPopup = false;
    loading = false;
    promoList: any = [];
    promoCode = '';
    discount: any = '';
    minValue = '';
    influencer = false;
    editPromoId = '';
    modalBoxName;
    loadingBtn = false;
    type = 'category';
    category_id = '';
    product_id = '';
    categoryList:any = [];
    productList:any = [];
    date:any= '';

    constructor(private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit() {
        this.index();
        this.search();
    }

    index() {
        this.loading = true;
        this.apiService.index('promo').subscribe(data => {
          this.promoList = data.data.filter((res:any)=>{
            return res.data_type == 1;
          });
            this.loading = false;
        });

        this.apiService.getData('getActiveSubCategory').subscribe(data => {
            this.categoryList = data.data;
        });

        this.apiService.index('product').subscribe(data => {
            this.productList = data.data;
        });

    }


    store() {
        this.loadingBtn = true;
        this.apiCall('store', 'promo');
    }

    onSelectChange(selectedValue: string) {
      // Handle the selected value

      if(selectedValue == 'category'){
        this.product_id = null;
      }else{
        this.category_id = null;

      }
      // Perform additional actions based on the selected value
    }

    show(id) {
        this.apiService.show('promo/' + id).subscribe((data) => {
            const value = data.data;
            this.promoCode = value.promo_code;
            this.minValue = value.min_value;
            this.influencer = value.influencer;
            this.discount = value.discount;
            this.category_id = value.category_id;
            this.product_id = value.product_id;
            this.date = value.date;
            this.type = value.type;
            this.editPromoId = id;
        });
    }

    update(id) {
        this.loadingBtn = true;
        this.apiCall('update', 'promo/' + id);
    }

    destroy(id) {
        this.swalCall(id);
    }

    promoSwitch(id) {
        this.apiCall('getData', 'promoSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchPromo', query)
        )).subscribe((result:any) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.promoList = [];
            } else {
                this.promoList = result.data.filter((res:any)=>{
                  return res.data_type == 1;
                });
            }
        });
    }

    apiCall(name, url, value: any = '') {
        value = name === 'store' || name === 'update' ? {
            promo_code: this.promoCode,
            min_value: this.minValue,
            influencer:this.influencer,
            discount: this.discount,
            type:this.type,
            category_id:this.category_id,
            product_id:this.product_id,
            date:this.date,
            data_type:1
        } : value;
        this.apiService[name](url, value).subscribe((data) => {
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
        this.promoCode = this.discount = this.minValue = this.editPromoId = '';
        this.errorMsg = [];
    }

    keyPress(event, type, id = '') {
        if (event.keyCode === 13) {
            if(this.discount !== '' && this.discount > 100) {
                this.toastr.error('Discount Should below to 100');
                return false;
            }
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
                this.apiCall('destroy', 'promo/' + id);
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
