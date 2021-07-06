import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerModule } from './customer/customer.module'
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EmployeeService, UserService, VendorService } from './service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { VendorModule } from './vendor/vendor.module';
import { JwtInterceptor } from './service/jwt.interceptor'
import { VenJwtInterceptor } from './service/ven-jwt.interceptor';
import { EmpJwtInterceptor } from './service/emp-jwt.interceptor';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomerModule,
    HttpClientModule,
    MatIconModule,
    VendorModule,
    EmployeeModule
  ],
  providers: [
    UserService,
    VendorService,
    EmployeeService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: VenJwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EmpJwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
