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
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // qtd:any[] = {};

  SubCategoryId: any = [];
  editofferTime: any = []
  productL;ist: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = '';
  keyword = 'name';
  categoryName: any=  {id: 6, name: "Shop"};
  productName: any;
  productPrice: any = [];
  productDiscPrice: any = [];
  productDesc: any = [];
  productSize = '';
  productImages: any = [];
  editProductId: any;
  editSubCategoryId:any;
  offerTime:any;
  edit_on_sale:any
  edit_best_seller:any
  on_sale:any = false;
  best_seller:any = false;
  youtube_link:any ='';
  product_description_sort:any= '';
  editProductTag:any;
  productTagsArray : any = []

  sizesList: any = [];
  tagNameList : any = []
  sizeArray: any = [];
  tagNameArray : any =[]
  productTagNameList :  any = []
  colorList:any = []
  colorArray :any =[];
  tagArray :any =[];
  sizeId: any = [];
  tagNameArrayId : any = []
  selectedSize: any = [];
  selectedTagName : any = []
  sizeSettings = {};
  TagNameSettings = {}
  colorSettings ={};
  tagSettings ={};
  filter_type
  categories: any = [];
  subcategory: any = []
  productTagName : any = []
  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;
  imageUrl = '';
  productList:any = []
  productStocks:any = [];
  stockProductName = '';
  stockForm: FormGroup;
  selectedColor: any=[];

  selectedTag: any=[];
  colorId: any[];
  tagId: any[];
  testingArray : any[]
  // sizeQuantity:any[] = [];

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
  productListOg:any = [];
  constructor(public router:Router,private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.index();

    this.getActiveCategory();
    this.getActiveSize();
    this.getActivecolor();
    this.getActiveSubCategory();
    this.getActiveProductTag();

    this.search();
    this.imageUrl = this.imageService.getMinImageurl();
    this.tagSettings = {
      singleSelection: false,
      text: 'Select Product Tag',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    this.sizeSettings = {
      singleSelection: false,
      text: 'Select Weight',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.colorSettings = {
      singleSelection: false,
      text: 'Select Color',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.TagNameSettings = {
      singleSelection: false,
      text: 'Select Tag Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.stockForm = this.formBuilder.group({
      product_id: new FormControl('', Validators.required),
    });




  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  getActiveCategory() {
    this.categories = [];

    this.loading = true;
    this.apiService.getData('getActiveCategory').subscribe(data => {
      const categories = data.data;
      for (const category of categories) {
        this.categories.push({ id: category.id, name: category.category_name });
      }

      this.categoryName = categories[0].category_name;

    });
  }
  getActiveSubCategory(){
    this.subcategory = [];

    this.loading = true;
    this.apiService.getData('getActiveSubCategory').subscribe(data => {
      const subcategories = data.data;
      for (const subcategory of subcategories) {
        this.subcategory.push({ id: subcategory.id, name: subcategory.sub_category_name});
      }

    });

  }

  // getActiveProductTag(){
  //   this.productTagName = [];

  //   this.loading = true;
  //   this.apiService.getData('getActiveTag').subscribe(data => {
  //       const productTagName = data.data;
  //       for (const tag_name of productTagName) {
  //           this.productTagName.push({ id: tag_name.id, name: tag_name.productTags });
  //       }

  //   });

  // }

  getActiveSize() {
    this.sizesList = [];
    this.loading = true;
    this.apiService.getData('getActiveSize').subscribe(data => {
      const sizes = data.data;
      for (const size of sizes) {
        this.sizesList.push({ id: size.id, itemName: size.size_name });
      }
    });
  }

  getActiveProductTag() {
    this.tagNameList = [];
    this.loading = true;
    this.apiService.getData('getActiveTag').subscribe(data => {
      const tags = data.data;
      for (const tag of tags) {
        this.tagNameList.push({ id: tag.id, itemName: tag.tag_name });
      }

    });
  }




  getActivecolor() {
    this.colorList = [];
    this.loading = true;
    this.apiService.getData('getActiveColor').subscribe(data => {
      const colors = data.data;
      for (const color of colors) {
        this.colorList.push({ id: color.id, itemName: color.color_name });
      }
    });
  }

  index() {
    this.loading = true;
    this.apiService.index('product').subscribe(data => {
      this.productList = data.data;
      this.productListOg = data.data
      this.loading = false;
    });
  }

  store(form:NgForm) {
    var resetform  = document.getElementById("create-form")

    this.loadingBtn = true;
    this.sizeId = [];
    this.colorId = []
    this.tagNameArrayId = []


    this.productTags =[]
    this.sub_category_id = []




    this.sizeArray.forEach(element => {
      this.sizeId.push(element.id);

    });
    this.tagNameArray.forEach(element => {
      this.tagNameArrayId.push(element.id);
    })

    this.sub_category_id.forEach(element => {
      this.sub_category_id.push(element.id)
    })
    this.colorArray.forEach(element => {
      this.colorId.push(element.id);
    });
    this.sub_category_id =  this.sub_category_id.toString();
    // this.selectedSize = this.sizeId.toString();
    // this.selectedColor = this.colorId.toString();
    this.selectedTag = this.tagNameArrayId.toString();





    this.apiCall('store', 'product');
    form.reset();

  }


  show(id) {

    var myurl = `products/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });

    //   alert("alert one")
    //     this.apiService.show('product/' + id).subscribe((data) => {
    //     //   alert("alert two")
    //         const value = data.data;
    //         this.editProductId = id;
    //         this.editSubCategoryId  = id;
    //         this.productTags = value.product_tags;
    //         this.SubCategoryId = value.sub_category.sub_category_name;
    //         this.sizeArray = value.product_sizes;
    //         this.tagNameArray = value.product_tags
    //         this.colorArray = value.color
    //         this.editofferTime = value.offer_time;
    //         this.offerTime = value.offer_time;
    //         this.youtube_link  = value.youtube_link;
    //         this.product_description_sort = value.product_description_sort;
    //         this.edit_on_sale = value.on_sale=='1'?true:false;
    //         this.edit_best_seller = value.best_seller=='1'?true:false;
    //         this.selectedSize = value.selectSizes;
    //         this.selectedColor = value.selectColor;
    //         this.on_sale = value.on_sale=='1'?true:false;
    //         this.best_seller = value.best_seller=='1'?true:false;
    //         this.productName = value.product_name;
    //         this.productPrice = value.product_price;
    //         this.productDiscPrice = value.product_discount_price;
    //         this.productDesc = value.product_description;
    //         this.productImages = value.images;
    //         this.categoryName = value.sub_category.category.category_name;
    //
    //
    //     });
    // console.log("12/05/2022",value)
  }

  update(id) {

    var resetform  = document.getElementById("create-form")

    this.loadingBtn = true;
    this.sizeId = [];
    this.colorId = []
    this.tagNameArrayId = []


    this.productTags =[]
    this.sub_category_id = []




    this.sizeArray.forEach(element => {
      this.sizeId.push(element.id);
      console.log("for size array",this.sizeId)

    });
    this.tagNameArray.forEach(element => {
      this.tagNameArrayId.push(element.id);
    });
    console.log(this.sub_category_id)

    this.sub_category_id.forEach(element => {
      this.subcategory_id.push(element.id)
    });
    this.colorArray.forEach(element => {
      this.colorId.push(element.id);
    });
    this.sub_category_id =  this.sub_category_id.toString();
    console.log("232",this.sub_category_id)

    // this.selectedSize = this.sizeId.toString();
    // this.selectedColor = this.colorId.toString();
    this.selectedTag = this.tagNameArrayId.toString();

    const abc = this.subcategory.filter(sub => {
      console.log('in fileter',this.SubCategoryId)
      console.log('in name', sub.name)

      sub.name == this.SubCategoryId})


    this.apiCall('update', 'product/' + id);
    console.log( abc)

  }

  destroy(id) {
    this.swalCall(id);
  }

  productSwitch(id) {
    this.apiCall('getData', 'productSwitch/' + id);
  }

  productSwitchStock(id) {
    this.apiCall('getData', 'productSwitchStock/' + id);
  }

  search() {
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
      this.apiService.searchData('searchProduct', query)
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
    console.log(this.sizeArray,this.selectedSize);

    let Dis = this.sizeArray.find((item)=>{
      return item.id == this.selectedSize;
    });
    value = name === 'store' || name === 'update' ? {



      category_id : this.categoryName.id,
      category_name:this.categoryName,
      product_name: this.productName,
      offer_time: this.offerTime,
      on_sale:this.on_sale,
      best_seller:this.best_seller,
      youtube_link:this.youtube_link,
      product_description_sort:this.product_description_sort,
      product_price:  Dis.productPrice,//this.productPrice.toString(),
      product_discount_price: Dis.productDiscPrice, //this.productDiscPrice.toString() == (null || 0 || "") ? this.productPrice.toString() : this.productDiscPrice.toString(),
      product_description:this.productDesc,
      sub_category_id:this.SubCategoryId.id,
      // color:this.colorArray,
      product_color:this.colorArray,
      sizes:this.sizeArray,
      pricebasedonWeight : this.testingArray,

    } : value;

    console.log(value);

    // // if(this.selectedSize.length && this.selectedColor.length && this.selectedTag.length) {
    // value['product_sizes'] = this.selectedSize,
    //   value['color'] = this.selectedColor
    // value['product_tags'] = this.selectedTag
    // // }

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

  keyPress(event, type, id = '') {
    if (event.keyCode === 13) {
      if (type === 'Create') {
        this.store(type);
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
        this.apiCall('destroy', 'product/' + id);
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

  openModalBox(type, id = '', name = '') {
    if(type === 'Edit') {
      this.modalBoxName = type;
      this.show(id);
      this.showPopup = true;
    } else if (type === 'Stocks') {
      this.modalBoxName = type;
      this.stockBox = true;
      this.stockProductName = name;
      this.getStockOfProduct(id);
    } else if (type === 'Create') {
      this.modalBoxName = 'Create';
      this.showPopup = true;
    }
  }

  viewImage(id) {
    console.log(id);
    this.show(id);
    this.viewBox = true;

  }

  popUpClose() {
    this.showPopup = this.viewBox = this.stockBox = false;
    this.categoryName =
      this.productName =
        this.productPrice =
          this.productDiscPrice =
            this.productDesc =
              this.colorArray = [];
    this.sizeArray = [];
    this.tagNameArray =
      this.SubCategoryId=
        this.selectedSize = '';
    this.errorMsg = this.sizeArray = [];
  }
  openTag(event) {
    this.tagDropDown.openDropdown();
  }

  openSize(event) {
    this.sizeDropDown.openDropdown();
  }
  openColor(event) {
    this.colorDropDown.openDropdown();
  }


  onDeSelectAllSizes(event) {
    this.selectedSize = [];
    this.sizeArray = [];
    this.sizeId = [];
  }

  onDeSelectAllcolor(event) {
    this.selectedColor = [];
    this.colorArray = [];
    this.colorId = [];
  }
  onDeSelectAllTag(event) {
    this.selectedTag = [];
    this.tagArray = [];
    this.tagId = [];
  }

  onChangeSearch(val: string) {
    if (val === '') {
      this.auto.close();
      return false;
    }
  }

  onFocused(e) {
    this.auto.close();
  }

  getStockOfProduct(id) {
    this.apiService.getData('getStockOfProduct', id).subscribe(data => {
      this.productStocks = data.data;
      this.productStocks.forEach((stock: any) => {
        this.stockForm.addControl(stock.id, new FormControl('', Validators.required));
        const element = this.stockForm.get(stock.id.toString());
        element.patchValue(stock.stock_quantity);
      });
    });
  }

  updateProductStocks() {
    const value = this.stockForm.value;
    delete value['product_id'];
    this.apiService.postData(value, 'updateProductStocks').subscribe(data => {
      this.toastr.success(data.message);
      this.popUpClose();
    });
  }

  outOfStocks() {
    this.productStocks.forEach((stock: any) => {
      const element = this.stockForm.get(stock.id.toString());
      element.patchValue(0);
    });
    this.updateProductStocks();
  }


  filter(){
    if(this.filter_type == 'all'){
      this.productList = this.productListOg
    }

    if(this.filter_type == 'on_sale'){
      this.productList = this.productListOg.filter((item)=>{
        return item.on_sale == 1;
      })

    }

    if(this.filter_type == 'best_seller'){
      this.productList = this.productListOg.filter((item)=>{
        return item.best_seller == 1;
      })
    }

  }










}
