import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { AngularMultiSelect, Item } from 'angular2-multiselect-dropdown';
import { debounceTime, distinctUntilChanged, find, map, switchMap } from 'rxjs/operators';
import { element } from 'protractor';
import {Router} from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './age-products.component.html',
  styleUrls: ['./age-products.component.css']
})
export class AgeProductsComponent implements OnInit {
  // qtd:any[] = {};

  SubCategoryId: any = [];
  editofferTime: any = []
  productL;
  ist: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  categoryName: any = {id: 6, name: "Shop"};
  productName: any;
  productPrice: any = [];
  productDiscPrice: any = [];
  productDesc: any = [];
  productSize = '';
  productImages: any = [];
  editProductId: any;
  editSubCategoryId: any;
  ageFilter: any;
  edit_on_sale: any
  edit_best_seller: any
  on_sale: any = false;
  best_seller: any = false;
  youtube_link: any = '';
  product_description_sort: any = '';
  editProductTag: any;
  productTagsArray: any = []

  sizesList: any = [];
  tagNameList: any = []
  sizeArray: any = [];
  tagNameArray: any = []
  productTagNameList: any = []
  colorList: any = []
  colorArray: any = [];
  tagArray: any = [];
  sizeId: any = [];
  tagNameArrayId: any = []
  selectedSize: any = [];
  selectedTagName: any = []
  sizeSettings = {};
  TagNameSettings = {}
  colorSettings = {};
  tagSettings = {};

  categories: any = [];
  subcategory: any = []
  productTagName: any = []
  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;
  imageUrl = '';
  productList: any = []
  productStocks: any = [];
  stockProductName = '';
  stockForm: FormGroup;
  selectedColor: any = [];

  selectedTag: any = [];
  colorId: any[];
  tagId: any[];
  testingArray: any[]
  // sizeQuantity:any[] = [];

  defaultImage = 'assets/images/loader.gif';
  @ViewChild('auto', {static: false}) auto;
  @ViewChild('auto', {static: false, read: ElementRef}) dishAuto: ElementRef;
  @ViewChild('sizeDropDown', {static: false}) sizeDropDown: AngularMultiSelect;
  @ViewChild('colorDropDown', {static: false}) colorDropDown: AngularMultiSelect;
  @ViewChild('tagDropDown', {static: false}) tagDropDown: AngularMultiSelect;
  productTags: any = [];
  sub_category_id: any = [];
  productTagsss: any;
  itemName: any;
  subcategory_id: any;
  productListArray: any;
  bestProductList: any = [];

  constructor(public router: Router, private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.apiService.ageUpdateproductget().subscribe((data:any)=>{
      this.bestProductList = data.data;
    })

    this.apiService.getProductAgeList().subscribe((data:any)=>{
      for (const size of    data.data) {
        this.productList.push({ id: size.id, itemName: size.product_name });
      }
    })
  }

  Apply(){
    let data = {list:this.productListArray,age:this.ageFilter};
    this.apiService.ageUpdateproduct(data).subscribe((res:any)=>{

      this.bestProductList =  res.data;

      Swal.fire(
        'Age',
        'Age updated',
        'success'
      );

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });

    });


  }




  destroy(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {


        this.apiService.ageUpdateproductDelete({id:id}).subscribe((res:any)=>{

          this.bestProductList =  res.data;


          Swal.fire(
            'Deleted!',
            'Your data has been deleted.',
            'success'
          );

          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });

        });



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
