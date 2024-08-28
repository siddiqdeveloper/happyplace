import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { NgxImageCompressService } from "ngx-image-compress";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";

@Component({
  selector: "app-dashboard",
  templateUrl: "./popup-setting.component.html",
  styleUrls: ["./popup-setting.component.css"],
})
export class PopupSettingComponent implements OnInit, AfterViewInit {
  loading: boolean;
  toptext
  loadingBtn:boolean;
  dashboardDetails: any = [];
  newPassword: string = "";
  confirmPassword: string = "";
  public files: NgxFileDropEntry[] = [];
  defaultImage = "assets/images/imageload.gif";
  imageUrl: any = "";
  existImages = false;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  currentImage: any = "";
  hoverClass = -1;
  exportImagesList: any = [];
  imageName = "";
  constructor(
    private imageCompress: NgxImageCompressService,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminDashboard();
  }

  ngAfterViewInit(): void {}

  adminDashboard() {
    this.loading = true;
    this.apiService.getData("popupuget").subscribe(
      (data) => {
        this.newPassword = data.data.popupcontent;
        this.toptext = data.data.bannertext;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  changePassword() {
    if (this.newPassword) {
      // Passwords match, you can proceed with password change logic here
      console.log("Password changed successfully");

      this.apiService
        .popupupdate({ content: this.newPassword })
        .subscribe(() => {
          Swal.fire("Success", "Passwords updated.", "success");
        });
    } else {
      // Passwords do not match, handle the error or show a message
 
      Swal.fire("Warning", "Please try again later", "warning");
    }
  }


  editImages() {
    this.existImages = true;
  }

  returnImage() {
    this.existImages = false;
  }

  public dropped(files) {
    for (const item of files) {
      this.files.push(item);
    }
    setTimeout(() => {
      const Index = document.querySelector("#selectImage0") as HTMLElement;
      Index.click();
    });
  }

  selectFileImage(files, id) {
    this.loading = true;
    this.imageName = files.name;
    this.croppedImage = [];
    this.hoverClass = id;
    const fileEntry = files;
    fileEntry.file((ev) => {
      this.imageChangedEvent = { target: { files: [ev] } };
    });
  }

  cropImageList(index) {
    this.exportImagesList.push(this.croppedImage);
    this.deleteFile(index);
    console.log(this.exportImagesList);
    this.croppedImage = [];
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  deleteFile(index: number) {
    if (this.files.length !== 0) {
      this.files.splice(index, 1);
    }
    setTimeout(() => {
      const Index = document.querySelector("#selectImage0") as HTMLElement;
      if (Index) {
        Index.click();
      }
    });
    this.imageChangedEvent = "";
    this.croppedImage = "";
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    // console.log(event);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.loading = false;
    // console.log('image-base64', event);
  }

  //   imageCropped(event: ImageCroppedEvent) {
  //     this.croppedImage = event.base64;
  //     this.loading = false;
  //     var width, height, myBase64 = this.croppedImage;
  //     var img = new Image();
  //     img.src = myBase64;
  //     img.addEventListener('load',function(){
  //         width=img.width;
  //         height=img.height;
  //     });
  //     this.imageWidth = img.width;
  //     this.imageHeigth = img.height;
  //     if(this.imageWidth > 401 || this.imageHeigth > 401 ) {
  //         this.toastr.error('Image Size is Too High');
  //     }else if (this.imageWidth == 0 || this.imageHeigth == 0) {
  //         this.toastr.error('Image Size is Too High');
  //     }else if (this.croppedImage.length > 1409458) {
  //         this.toastr.error('Image Resolution is Too High');
  //     } else{
  //         this.toastr.success('Image Size is Correct');
  //     }
  // }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  imageUpdateProduct(imageFile, index) {
    const formData: FormData = new FormData();

    formData.append("product_image", imageFile);

    // popupimageupload
    this.apiService.postData(formData, "popupimageupload").subscribe(
      (data) => {
        if (data.error === false) {
          this.toastr.success(data.message);
          this.deleteFile(index);
        } else {
          this.toastr.error(data.message);
        }
        this.loadingBtn = false;
        this.router.navigate(["products"]);
      },
      (error) => {
        this.loadingBtn = false;
      }
    );
  }

  b64toBlob(b64Data, contentType, sliceSize = 512) {
    contentType = contentType || "";
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  convertFile(index) {
    this.loadingBtn = true;
   
      this.imageCompress
        .compressFile(this.croppedImage, -1, 75, 50)
        .then((result) => {
          console.log(result);
          var ImageURL = result;
          var block = ImageURL.split(";");
          var contentType = block[0].split(":")[1];
          var realData = block[1].split(",")[1];
          var blob = this.b64toBlob(realData, contentType);
          this.imageUpdateProduct(blob, index);
        });

  }

  deleteImageProduct(id) {
 
  }

 

  drop() {
 
 
  }

  updatetoptext(){
    this.toptext;

    if (this.toptext) {


      this.apiService
        .updatetoptext({ bannertext: this.toptext })
        .subscribe(() => {
          Swal.fire("Success", "Top text updated.", "success");
        });
    } else {
      // Passwords do not match, handle the error or show a message
 
      Swal.fire("Warning", "Please try again later", "warning");
    }
  }

}
