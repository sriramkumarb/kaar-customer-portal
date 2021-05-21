import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { InquiryDataComponent } from './inquiry-data/inquiry-data.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { FinanceSheetComponent } from './finance-sheet/finance-sheet.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { CreditComponent } from './credit/credit.component';
import { OverallSaleComponent } from './overall-sale/overall-sale.component';
import { UserService } from 'src/app/service';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { InquiryDataDetailComponent } from './inquiry-data-detail/inquiry-data-detail.component';
import { SaleOrderDetailComponent } from './sale-order-detail/sale-order-detail.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    InquiryDataComponent,
    SaleOrderComponent,
    DeliveryListComponent,
    FinanceSheetComponent,
    InvoiceComponent,
    PaymentComponent,
    CreditComponent,
    OverallSaleComponent,
    CustomerDetailsComponent,
    InquiryDataDetailComponent,
    SaleOrderDetailComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    DashboardRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class DashboardModule { }
