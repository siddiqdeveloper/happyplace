import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  searchField: FormControl = new FormControl();
  orderDetails: any = [];
  p = 1;
  imageURL;
  trackId = '';
  loading: boolean;
  constructor(private apiService: ApiService, private toastr: ToastrService,
    private route: ActivatedRoute,
    private imageService: ImageService) { }

  ngOnInit() {
    this.getOrderDetails();
    this.imageURL = this.imageService.getMinImageurl();
  }

  getOrderDetails() {
    this.loading = true;
    this.apiService.getData('getCartDetails', this.route.snapshot.paramMap.get('id')).subscribe((data) => {
      this.orderDetails = data.data;
      // alert(this.orderDetails.ordered_products.color);
      if (this.orderDetails.order_tracking_id) {
        this.trackId = this.orderDetails.order_tracking_id;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  goBack() {
    window.history.back();
  }

  orderTrackingUpdate(id) {
    this.apiService.getData('orderTrackingUpdate', `${id}/${this.trackId}`).subscribe((data) => {
      if (data.error === false) {
        this.toastr.success(data.message);
        this.getOrderDetails();
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
