import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    MainPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,

  ]
})
export class VendorModule { }
