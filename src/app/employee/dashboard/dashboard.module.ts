import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { LeaveDataComponent } from './leave-data/leave-data.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { PaySlipDetailsComponent } from './pay-slip-details/pay-slip-details.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    EmpDetailsComponent,
    LeaveDataComponent,
    LeaveRequestComponent,
    PaySlipComponent,
    PaySlipDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    Ng2SmartTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    PdfViewerModule,
  ]
})
export class DashboardModule { }
