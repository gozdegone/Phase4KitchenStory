import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ChangepasswordComponent } from './Components/change-password/change-password.component';
import { AllProductsComponent } from './Components/product/all-products/all-products.component';
import { AddProductComponent } from './Components/product/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';
import { LoginService } from './Services/login.service';
import { AuthGuard } from './Services/auth.guard';
import { UpdateProductComponent } from './Components/product/update-product/update-product.component';
import { SearchProductComponent } from './Components/product/search-product/search-product.component';
import { PlaceOrderComponent } from './Components/order/place-order/place-order.component';
import { OrderConfirmComponent } from './Components/order/order-confirm/order-confirm.component';
import { AllOrdersComponent } from './Components/order/all-orders/all-orders.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ChangepasswordComponent,
    AllProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    SearchProductComponent,
    PlaceOrderComponent,
    OrderConfirmComponent,
    AllOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    LoginService,
    AuthGuard,
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    {
      provide: 'BASE_URL', useValue: 'http://localhost:9595'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
