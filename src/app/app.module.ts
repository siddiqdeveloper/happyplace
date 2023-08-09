import { HttpClientModule, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NumberPickerModule } from 'ng-number-picker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryImageComponent } from './components/category-image/category-image.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';
import { FoodDirective } from './directive/food.directive';
import { NumbersOnlyDirective } from './directive/numbers-only.directive';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { BannerComponent } from './components/banner/banner.component';
import { MarkdownModule } from 'ngx-markdown';
import {NgxImageCompressService} from 'ngx-image-compress';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { TagsComponent } from './components/tags/tags.component';
import { SubCategoryImageComponent } from './components/sub-category-image/sub-category-image.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import {MatSliderModule} from '@angular/material/slider';
import { CancelOrdersComponent } from './components/cancel-orders/cancel-orders.component';
import { CancelOrderDetailsComponent } from './components/cancel-order-details/cancel-order-details.component';
import { PromoCodesComponent } from './components/promo-codes/promo-codes.component';
import { CategoryBannerImageComponent } from './components/category-banner-image/category-banner-image.component';
import { MobileBannerComponent } from './components/mobile-banner/mobile-banner.component';
import { MobileBannerImageComponent } from './components/mobile-banner-image/mobile-banner-image.component';
import { ColorsComponent } from './components/colors/colors.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { LinkProductsComponent } from './components/link-products/link-products.component';
import { LinkingProductsComponent } from './components/linking-products/linking-products.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LocationComponent } from './components/location/location.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { AdBannerImageComponent } from './components/ad-banner-image/ad-banner-image.component';
import { BottomBannerComponent } from './components/bottom-banner/bottom-banner.component';
import { BottomBannerImageComponent } from './components/bottom-banner-image/bottom-banner-image.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogImageComponent } from './blog-image/blog-image.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
// import { AngularEditorComponent } from '@kolkov/angular-editor';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';
import {TestimonialsComponent} from './components/testimonials/testimonials.component';
import {ShippingComponent} from './components/shipping/shipping.component';
import {CouponCodesComponent} from './components/coupon-codes/coupon-codes.component';
import {SubscribeComponent} from './components/subscribes/subscribe.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {ProductsViewComponent} from './components/products-view/products-view.component';
import {ProductsCreateComponent} from './components/products-create/products-create.component';
import {BestProductsComponent} from './components/products-bestdeal/best-products.component';
import {TestimonialsImgComponent} from './components/test-image/testimonials-img.component';
import {AgeProductsComponent} from './components/products-age/age-products.component';
import {OrdersGuestComponent} from "./components/orders-guest/orders-guest.component";
import {UCComponent} from "./components/userac/u-c.component";
import {CartDetailsComponent} from "./components/cart-details/cart-details.component";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => this.handleError(err)));
    }


    private handleError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.router.navigateByUrl(`/`);
            return of(err.message);
        }
        return Observable.throw(err);
    }
}
// const appRoutes: Routes = [
//   { path: '**', component: AppComponent },
// ];


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        SidemenuComponent,
        DashboardComponent,
        FoodDirective,
        NumbersOnlyDirective,
        UsersComponent,
        UnauthorizedComponent,
        PageNotFoundComponent,
        FooterComponent,
        CategoryComponent,
        CategoryImageComponent,
        DragAndDropDirective,
        ProgressComponent,
        ProductImageComponent,
        ProductsComponent,
        BannerImageComponent,
        BannerComponent,
        HeaderMenuComponent,
        SubCategoryComponent,
        TagsComponent,
        SubCategoryImageComponent,
        SizesComponent,
        OrdersComponent,
        OrderDetailsComponent,
        CancelOrdersComponent,
        CancelOrderDetailsComponent,
        PromoCodesComponent,
        CategoryBannerImageComponent,
        MobileBannerComponent,
        MobileBannerImageComponent,
        ColorsComponent,
        LinkProductsComponent,
        LinkingProductsComponent,
        SettingsComponent,
        LocationComponent,
        AdBannerComponent,
        AdBannerImageComponent,
        BottomBannerComponent,
        BottomBannerImageComponent,
        BlogsComponent,
        BlogImageComponent,
        BlogCreateComponent,
        BlogCommentsComponent,
        ReportsComponent,
        StickyHeaderComponent,
        TestimonialsComponent,
        ShippingComponent,
        CouponCodesComponent,
        SubscribeComponent,
      ContactsComponent,
      ProductsViewComponent,
      ProductsCreateComponent,
      BestProductsComponent,
      TestimonialsImgComponent,
      AgeProductsComponent,
      OrdersGuestComponent,
      UCComponent,
      CartDetailsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        AutocompleteLibModule,
        BrowserAnimationsModule,
        AngularEditorModule,

        ToastrModule.forRoot({
        preventDuplicates: true,
        positionClass: 'toast-top-right',
        timeOut: 3000,
        progressBar : true,
        progressAnimation: 'increasing',
        }),
        AppRoutingModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        TabsModule.forRoot(),
        AngularMultiSelectModule,
        NumberPickerModule,
        NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.rectangleBounce,
            backdropBackgroundColour: '#fff',
            backdropBorderRadius: '25px',
            primaryColour: '#185698',
            secondaryColour: '#185698',
            tertiaryColour: '#185698'
        }),
        ImageCropperModule,
        NgxFileDropModule,
        LazyLoadImageModule,
        DragDropModule,
        MatSliderModule,
        MarkdownModule.forRoot(),
        ColorPickerModule
    ],
    providers: [
        NgxImageCompressService,{
        provide: HTTP_INTERCEPTORS,
        useFactory: function(router:Router) {
        return new AuthInterceptor(router)
        },
        multi: true,
        deps: [Router]
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
