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
  selector: 'app-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.css']
})
export class StickyHeaderComponent implements OnInit {
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
  header:any;
  blogDate:any;
  blogTag:any;
  blogContent:any;

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

    this.getStickyHeader();

    
  }

  getStickyHeader(){
    this.loading = true;
    this.apiService.getData('getStickyHeader').subscribe((data) => {
        this.header = data.data[0].header; 

        this.loading = false;

     }, error => {
        this.loading = false;
    });
  }

  
  updateHeader(){
    if(this.header == "" ||this.header == null ){
      this.toastr.error("Enter Sticky Header   ");
      return false;
     }
    const value = {
      header: this.header,
     
   }
   
      this.apiCall("update2", "updateStickyHeader", value);
  
  }

  apiCall(name, url, value: any = '') {

    this.apiService[name](url, value).subscribe((data) => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.loadingBtn = false;
        } else {
            this.toastr.error(data.message);
            this.loadingBtn = false;
            this.errorMsg = data.data;
        }
        this.getStickyHeader();
    });
  }
  


}


