import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-category-image',
  templateUrl: './testimonials-img.component.html',
  styleUrls: ['./testimonials-img.component.css']
})
export class TestimonialsImgComponent implements OnInit {
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

    imageUpdateCategory(imageFile) {
        const formData: FormData = new FormData();
        formData.append('testimonials_id', this.route.snapshot.paramMap.get('id'));
          formData.append('testimonials_image', imageFile);
        this.apiService.postData(formData, 'imageUpdateTestimonials').subscribe(data => {
        if (data.error === false) {
            this.toastr.success(data.message);
            this.router.navigate(['/testimonials']);
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
        this.imageCompress.compressFile(this.croppedImage, -1, 75, 50).then(
        result => {
            var ImageURL = result;
            var block = ImageURL.split(';');
            var contentType = block[0].split(':')[1];
            var realData = block[1].split(',')[1];
            var blob = this.imageService.b64toBlob(realData, contentType);
            this.imageUpdateCategory(blob);
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        });
    }

}
