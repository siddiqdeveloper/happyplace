import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect, Item } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, find, map, switchMap } from 'rxjs/operators';
import { element } from 'protractor';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  // qtd:any[] = {};

  SubCategoryId: any = []
    productList: any = [];
    loading = false;
    loadingBtn = false;
    showPopup = false;
    stockBox = false;
    modalBoxName = '';
    keyword = 'name';

    sno = 1;
    searchField: FormControl = new FormControl();
    errorMsg: any = [];
    viewBox = false;
    showImage = true;
    imageUrl = '';


    defaultImage = 'assets/images/loader.gif';
    @ViewChild('auto', { static: false }) auto;
    @ViewChild('auto', { static: false, read: ElementRef }) dishAuto: ElementRef;
    @ViewChild('sizeDropDown', { static: false }) sizeDropDown: AngularMultiSelect;
    @ViewChild('colorDropDown', { static: false }) colorDropDown: AngularMultiSelect;
    @ViewChild('tagDropDown', { static: false }) tagDropDown: AngularMultiSelect;
  productTags: any = [];
  sub_category_id: any = [];
  productTagsss: any;
  itemName: any;
  subcategory_id: any;

    constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.index();

        this.search();
        this.imageUrl = this.imageService.getMinImageurl();
     

    }
    
    index() {
        this.loading = true;
        this.apiService.index('getAllBlogDetails').subscribe(data => {
            this.productList = data.data;
            this.loading = false;
        });
    }

    destroy(id) {
        this.swalCall(id);
    }

    productSwitch(id) {
        this.apiCall('getData', 'blogdetailsSwitch/' + id);
    }

    search() {
        this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
            this.apiService.searchData('searchBlog', query)
        )).subscribe((result) => {
            if (this.searchField.value === '') {
                this.index();
                return false;
            }
            if (result.data.length === 0) {
                this.productList = [];
            } else {
                this.productList = result.data;
            }
        });
    }


    apiCall(name, url, value: any = '') {

        value = name === 'store' || name === 'update' ? {

        } : value;

        this.apiService[name](url, value).subscribe((data) => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.loadingBtn = false;
                this.index();
            } else {
                this.toastr.error(data.message);
                this.loadingBtn = false;
                this.errorMsg = data.data;
            }
        });

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
                this.apiCall('destroy', 'blogdetails/' + id);
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
