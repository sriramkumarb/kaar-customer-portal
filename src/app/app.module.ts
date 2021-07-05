import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerModule } from './customer/customer.module'
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserService } from './service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { VendorModule } from './vendor/vendor.module';
import { DashboardModule } from './vendor/dashboard/dashboard.module';
import { JwtInterceptor } from './service/jwt.interceptor'
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
    DashboardModule,
    EmployeeModule
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
