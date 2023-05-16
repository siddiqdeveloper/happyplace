import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryImageComponent } from './components/category-image/category-image.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { BannerComponent } from './components/banner/banner.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { TagsComponent } from './components/tags/tags.component';
import { SubCategoryImageComponent } from './components/sub-category-image/sub-category-image.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CancelOrdersComponent } from './components/cancel-orders/cancel-orders.component';
import { CancelOrderDetailsComponent } from './components/cancel-order-details/cancel-order-details.component';
import { PromoCodesComponent } from './components/promo-codes/promo-codes.component';
import { CategoryBannerImageComponent } from './components/category-banner-image/category-banner-image.component';
import { MobileBannerComponent } from './components/mobile-banner/mobile-banner.component';
import { MobileBannerImageComponent } from './components/mobile-banner-image/mobile-banner-image.component';
import { ColorsComponent } from './components/colors/colors.component';
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
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';
import {TestimonialsComponent} from './components/testimonials/testimonials.component';
import {ShippingComponent} from './components/shipping/shipping.component';

const routes: Routes = [
    {path: 'categories', component: CategoryComponent},
    {path: 'category-image/:id', component: CategoryImageComponent},
    {path: 'category-banner-image/:id', component: CategoryBannerImageComponent},
    {path: 'sub-categories', component: SubCategoryComponent},
    {path: 'sub-category-image/:id', component: SubCategoryImageComponent},
    {path: 'tags', component: TagsComponent},
    {path: 'sizes', component: SizesComponent},
    {path: 'color', component: ColorsComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product-image/:id', component: ProductImageComponent},
    {path: 'link-products', component: LinkProductsComponent},
    {path: 'linking-products/:id', component: LinkingProductsComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'order-detail/:id', component: OrderDetailsComponent},
    {path: 'cancel-orders', component: CancelOrdersComponent},
    {path: 'cancel-order-detail/:id', component: CancelOrderDetailsComponent},
    {path: 'banner', component: BannerComponent},
    {path: 'banner-image/:id', component: BannerImageComponent},
    {path: 'bottom-banner', component: BottomBannerComponent},
    {path: 'bottom-banner-image/:id', component: BottomBannerImageComponent},
    {path: 'ad-banner', component: AdBannerComponent},
    {path: 'ad-banner-image/:id', component: AdBannerImageComponent},
    {path: 'mobile-banner', component: MobileBannerComponent},
    {path: 'mobile-banner-image/:id', component: MobileBannerImageComponent},
    {path: 'promo-code', component: PromoCodesComponent},
    {path: 'header-menu', component: HeaderMenuComponent},
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'location', component: LocationComponent},
    {path: 'settings', component: SettingsComponent},
    {path:'blogs',component:BlogsComponent},
    {path:'blogs-image/:id',component:BlogImageComponent},
    {path:'blogs-edit/:id',component:BlogCreateComponent},
    {path:'blogs-create',component:BlogCreateComponent},
    {path:'blogs-comments',component:BlogCommentsComponent},
    {path:'reports-details',component:ReportsComponent},
    {path:'sticky-header',component:StickyHeaderComponent},
    {path:'testimonials',component:TestimonialsComponent},
    {path:'shipping',component:ShippingComponent},

    // {path: 'users', component: UsersComponent, data: {role: 'user'}, canActivate: [AuthGuard]},
    {path: 'users', component: UsersComponent},
    {path: 'unauth', component: UnauthorizedComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
