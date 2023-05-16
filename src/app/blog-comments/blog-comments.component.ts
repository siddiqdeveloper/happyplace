import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, find, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.css']
})
export class BlogCommentsComponent implements OnInit {

  searchField: FormControl = new FormControl();
  errorMsg: any = [];
  sno = 1;
  showPopup = false;
  loading = false;
  blogCommentList: any = [];
  bannerName = '';
  editBannerId = '';
  customer_name:any;
  email:any;
  website:any;
  blog_name:any;
  modalBoxName;
  loadingBtn = false;
  viewBox = false;
  viewImagePreview = '';
  viewNamePreview = '';
  showImage = true;
  imageUrl = '';
  viewImageDisc = '';
  defaultImage = 'assets/images/loader.gif';

  constructor(private apiService: ApiService, private toastr: ToastrService, private imageService: ImageService) { }

  ngOnInit() {
      this.index();
      this.search();
      this.imageUrl = this.imageService.getImageUrl();
  }

  index() {
      this.loading = true;
      this.apiService.index('blogComment').subscribe(data => {
          this.blogCommentList = data.data;
          // alert(this.blogCommentList.blogdetails[0].blog_heading);

          this.loading = false;
      });
  }


  store() {
      this.loadingBtn = true;
      this.apiCall('store', 'blogComment');
  }

  show(id) {
      this.apiService.show('blogComment/' + id).subscribe((data) => {
          const value = data.data;
         // this.blog_name = value.blogdetails[0].blog_heading;
          this.customer_name = value.name;
          this.email =value.email;
          this.website = value.website
          this.bannerName = value.comments;
          this.editBannerId = id;
      });
  }

  update(id) {
      this.loadingBtn = true;
      this.apiCall('update', 'bottomBanner/' + id);
  }

  destroy(id) {
      this.swalCall(id);
  }

  bannerSwitch(id) {
      this.apiCall('getData', 'blogCommentSwitch/' + id);
  }

  search() {
    this.searchField.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), switchMap((query) =>
        this.apiService.searchData('searchComments', query)
    )).subscribe((result) => {
        if (this.searchField.value === '') {
            this.index();
            return false;
        }
        if (result.data.length === 0) {
            this.blogCommentList = [];
        } else {
            this.blogCommentList = result.data;
        }
    });
}

  apiCall(name, url, value: any = '') {
      value = name === 'store' || name === 'update' ? {
          banner_name: this.bannerName,
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
          this.modalBoxName = 'View';
          this.show(id);
      } else {
          this.modalBoxName = 'Create';
      }
      this.showPopup = true;
  }

  popUpClose() {
      this.showPopup = false;
      this.bannerName  = this.editBannerId = '';
      this.errorMsg = [];
      this.viewBox = false;
  }

  keyPress(event, type, id = '') {
      if (event.keyCode === 13) {
          if (type === 'Create') {
              this.store();
          } else if (type === 'View') {
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
              this.apiCall('destroy', 'blogComment/' + id);
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
