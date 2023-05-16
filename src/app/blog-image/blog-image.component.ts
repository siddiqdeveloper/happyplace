    // import { Component, OnInit } from '@angular/core';
    // import { ActivatedRoute, Router } from '@angular/router';
    // import { NgxFileDropEntry,FileSystemDirectoryEntry,FileSystemFileEntry } from 'ngx-file-drop';
    // import { NgxImageCompressService } from 'ngx-image-compress';
    // import { ImageCroppedEvent } from 'ngx-image-cropper';
    // import { ToastrService } from 'ngx-toastr';
    // import { ApiService } from 'src/app/services/api.service';
    // import { ImageService } from 'src/app/services/image.service';
    
    // @Component({
    //     selector: 'app-blog-image',
    //     templateUrl: './blog-image.component.html',
    //     styleUrls: ['./blog-image.component.css']
    //   })
    //   export class BlogImageComponent implements OnInit {
    
    //   imageChangedEvent: any = '';
    //   croppedImage: any = '';
    //   loading: boolean;
    //   loadingBtn: boolean;
    //   public files: NgxFileDropEntry[] = [];
    
    //   constructor(
    //       private apiService: ApiService,
    //       private toastr: ToastrService,
    //       private route: ActivatedRoute,
    //       private router: Router,
    //       private imageService: ImageService,
    //       private imageCompress: NgxImageCompressService
    //   ) { }
    
    //   ngOnInit() {
    //   }
    
    //   public dropped(files: NgxFileDropEntry[]) {
    //       this.loading = true;
    //       this.files = [];
    //       this.files.push(files[files.length - 1]);
    //       for (const droppedFile of files) {
    //       if (droppedFile.fileEntry.isFile) {
    //           const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //           fileEntry.file(
    //           (ev) => {
    //               this.imageChangedEvent = { target: { files: [ev] } };
    //           });
    //       } else {
    //           const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
    //       }
    //       }
    //   }
    
    //   deleteFile(index: number) {
    //       if (this.files.length !== 0) {
    //       this.files.splice(index, 1);
    //       }
    //       this.imageChangedEvent = '';
    //       this.croppedImage = '';
    //   }
    
    
    //   imageCropped(event: ImageCroppedEvent) {
    //       this.croppedImage = event.base64;
    //       this.loading = false;
    //   }
    
    //   imageUpdateBanner(imageFile) {
    //       const formData: FormData = new FormData();
    //       formData.append('banner_id', this.route.snapshot.paramMap.get('id'));
    //       formData.append('banner_image', imageFile);
    //       this.apiService.postData(formData, 'imageUpdateblogdetails').subscribe(data => {
    //       if (data.error === false) {
    //           this.toastr.success(data.message);
    //           this.router.navigate(['/blogs']);
    //       } else {
    //           this.toastr.error(data.message);
    //       }
    //       this.loadingBtn = false;
    //       }, error => {
    //       this.loadingBtn = false;
    //       });
    //   }
    
    //   convertFile() {
    //       this.loadingBtn = true;
    
    //       var ImageURL = this.croppedImage;
    //       var block = ImageURL.split(';');
    //       var contentType = block[0].split(':')[1];
    //       var realData = block[1].split(',')[1];
    //       var blob = this.imageService.b64toBlob(realData, contentType);
    //       this.imageUpdateBanner(blob);
    //   }
    
    
    
    // }

    
    import { Component, OnInit } from '@angular/core';
    import { FormControl } from '@angular/forms';
    import { ApiService } from 'src/app/services/api.service';
    import { ToastrService } from 'ngx-toastr';
    import { ImageService } from 'src/app/services/image.service';
    import Swal from 'sweetalert2';
    import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
    import { ActivatedRoute, Router } from '@angular/router';
    import { ImageCroppedEvent } from 'ngx-image-cropper';
    import { NgxImageCompressService } from 'ngx-image-compress';
    
    @Component({
        selector: 'app-blog-image',
        templateUrl: './blog-image.component.html',
        styleUrls: ['./blog-image.component.css']
      })
      export class BlogImageComponent implements OnInit {
    
        imageChangedEvent: any = '';
        croppedImage: any = '';
        loading: boolean;
        loadingBtn: boolean;
        public files: NgxFileDropEntry[] = [];
    
        constructor(
            private apiService: ApiService,
            private toastr: ToastrService,
            private route: ActivatedRoute,
            private router: Router,
            private imageService: ImageService,
            private imageCompress: NgxImageCompressService
        ) { }
    
        ngOnInit() {
        }
    
        public dropped(files: NgxFileDropEntry[]) {
            this.loading = true;
            this.files = [];
            this.files.push(files[files.length - 1]);
            for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file(
                (ev) => {
                    this.imageChangedEvent = { target: { files: [ev] } };
                });
            } else {
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            }
            }
        }
    
        deleteFile(index: number) {
            if (this.files.length !== 0) {
            this.files.splice(index, 1);
            }
            this.imageChangedEvent = '';
            this.croppedImage = '';
        }
    
    
        imageCropped(event: ImageCroppedEvent) {
            this.croppedImage = event.base64;
            this.loading = false;
        }
    
        imageUpdateBanner(imageFile) {
            const formData: FormData = new FormData();
            formData.append('banner_id', this.route.snapshot.paramMap.get('id'));
            formData.append('banner_image', imageFile);
            this.apiService.postData(formData, 'imageUpdateblogdetails').subscribe(data => {
            if (data.error === false) {
                this.toastr.success(data.message);
                this.router.navigate(['/blogs']);
            } else {
                this.toastr.error(data.message);
            }
            this.loadingBtn = false;
            }, error => {
            this.loadingBtn = false;
            });
        }
        
    
        convertFile() {
            this.loadingBtn = true;
            var ImageURL = this.croppedImage;
            var block = ImageURL.split(';');
            var contentType = block[0].split(':')[1];
            var realData = block[1].split(',')[1];
            var blob = this.imageService.b64toBlob(realData, contentType);
            this.imageUpdateBanner(blob);
        }
    
    
    
    }
    