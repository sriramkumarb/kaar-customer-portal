import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    CustomerRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    CustomerRoutingModule,
    MatIconModule
  ],
  providers: [
    UserService
  ]
})
export class CustomerModule { }
