import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ChangepasswordComponent } from './Components/change-password/change-password.component';
import { AllProductsComponent } from './Components/product/all-products/all-products.component';
import { AddProductComponent } from './Components/product/add-product/add-product.component';
import { AuthGuard } from './Services/auth.guard';
import { UpdateProductComponent } from './Components/product/update-product/update-product.component';
import { SearchProductComponent } from './Components/product/search-product/search-product.component';
import { PlaceOrderComponent } from './Components/order/place-order/place-order.component';
import { OrderConfirmComponent } from './Components/order/order-confirm/order-confirm.component';
import { AllOrdersComponent } from './Components/order/all-orders/all-orders.component';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangepasswordComponent, pathMatch: 'full' },
  { path: 'all-products', component: AllProductsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'update-item/:id', component: UpdateProductComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'product-search/:name', component: SearchProductComponent, pathMatch: 'full' },
  { path: 'place-order/:id', component: PlaceOrderComponent, pathMatch: 'full' },
  { path: 'order-confirm/:id', component: OrderConfirmComponent, pathMatch: 'full' },
  { path: 'all-orders', component: AllOrdersComponent, pathMatch: 'full', canActivate: [AuthGuard] }
]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
