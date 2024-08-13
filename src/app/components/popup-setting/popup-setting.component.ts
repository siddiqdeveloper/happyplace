import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-dashboard",
  templateUrl: "./popup-setting.component.html",
  styleUrls: ["./popup-setting.component.css"],
})
export class PopupSettingComponent implements OnInit, AfterViewInit {
  loading: boolean;
  dashboardDetails: any = [];
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(
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
}
