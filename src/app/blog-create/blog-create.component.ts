import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { ImageService } from "src/app/services/image.service";
import Swal from "sweetalert2";
import { AngularMultiSelect } from "angular2-multiselect-dropdown";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  productList: any = [];
  loading = false;
  loadingBtn = false;
  showPopup = false;
  stockBox = false;
  modalBoxName = "";
  keyword = "name";


  sno = 1;
  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  viewBox = false;
  showImage = true;


  defaultImage = "assets/images/loader.gif";
  @ViewChild('tagDropDown', { static: false }) tagDropDown: AngularMultiSelect;
  @ViewChild("auto", { static: false }) auto;
  @ViewChild("auto", { static: false, read: ElementRef }) dishAuto: ElementRef;
  @ViewChild("sizeDropDown", { static: false })
  sizeDropDown: AngularMultiSelect;
  @ViewChild("flavourDropDown", { static: false })
  flavourDropDown: AngularMultiSelect;
 

  secthreeimg: any = "";
  secthreeTxt: any = "";
  secfourTxt: any = "";
  secfourimg: any = "";
  wedding_textcontent : any = "";
  all_textContent : any = ""

  blog_id:any;
  blogHeader:any;
  blogDate:any;
  blogTag:any;
  blogContent:any;

  tagSettings ={};
  tagNameList : any = []
  tagNameArrayId : any = []
  tagNameArray : any =[]
  TagNameSettings = {}
  selectedTag: any=[];
  reqTag: any;
  tagid: any=[];
  tagId: any=[];
  // tags: any;


  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.tagSettings = {
      singleSelection: false,
      text: 'Select Product Tag',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.getActiveProductTag();
  
   
     this.route.params.subscribe(params => {
        this.blog_id = +params['id']; 
      });
      if(this.blog_id){
         this.getbloglist(this.blog_id);
       }
    
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
  onDeSelectAllSizes(event) {
    // this.selectedSize = [];
    // this.sizeArray = [];
    // this.sizeId = [];
   }
   openSize(event) {
    this.sizeDropDown.openDropdown();
}

  getbloglist(blog_id) {
    this.apiService.show('getBlogDetailsById/' + blog_id).subscribe((data) => {
        const value = data.data;

        this.blogHeader = value[0].blog_heading;
        // this.blogDate = value[0].created_at; 
        this.tagNameArray = value[0].tag_name; 
        this.blogContent = value[0].blog_content; 

    });
  }


  Createblog(){

    if(this.blogHeader == "" ||this.blogHeader == null ){
      this.toastr.error("Enter Blog Header   ");
      return false;
     }
     else if(this.blogContent == "" ||this.blogContent == null ){
      this.toastr.error("Enter Blog Content   ");
      return false;
     }else if(this.tagNameArray == "" ||this.tagNameArray == null ){
      this.toastr.error("Enter Tag ");
      return false;
     }
    this.tagNameArray.forEach(element => {
      this.tagId.push(element.id)
    });
 
     this.loadingBtn = true;
     const value = {

      blog_heading :this.blogHeader,
      // blog_date: this.blogDate,
      tag_name: this.tagId.toString(),
      blog_content: this.blogContent,
  
      };

     this.apiService.postData(value, 'storeNewBlogDetails').subscribe((data) => {
      this.reqTag = data.data
     
         if (data.error === false) {
          this.router.navigate(['blogs']);
          this.toastr.success(data.message);
             this.loadingBtn = false;
         } else {
             this.toastr.warning(data.message);
             this.loadingBtn = false;
         }
     }, error => {
         this.loadingBtn = false;
     });
   }

   
  updateblog() { 
    if(this.blogHeader == "" ||this.blogHeader == null ){
      this.toastr.error("Enter Blog Header   ");
      return false;
     }
      else if(this.blogContent == "" ||this.blogContent == null ){
      this.toastr.error("Enter Blog Content ");
      return false;
     }else if(this.tagNameArray == "" ||this.tagNameArray == null ){
      this.toastr.error("Enter Tag ");
      return false;
     }

    this.tagNameArray.forEach(element => {
      this.tagId.push(element.id)
    });

    const value = {
      id :this.blog_id,
      blog_heading :this.blogHeader,
      // blog_date: this.blogDate,
      tag_name: this.tagId.toString(),
      blog_content: this.blogContent,


    };
    this.apiCall("update2", "updateBlogDetails", value);
    this.router.navigate(['blogs']);
  }



  apiCall(name, url, value: any = "") {
    this.apiService[name](url, value).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.loadingBtn = false;
      } else {
        this.toastr.error(data.message);
        this.loadingBtn = false;
        this.errorMsg = data.data;
      }
      this.getbloglist(this.blog_id);
    });
  }


}


