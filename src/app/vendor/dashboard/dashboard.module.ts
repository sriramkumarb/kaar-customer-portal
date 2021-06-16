import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VenDetailsComponent } from './ven-details/ven-details.component';
import { PaymentComponent } from './payment/payment.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import { InvoiceComponent } from './invoice/invoice.component';
import { CreditComponent } from './credit/credit.component';
import { FinanceSheetComponent } from './finance-sheet/finance-sheet.component';
import { QuotationComponent } from './quotation/quotation.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { QuotationDetailComponent } from './quotation-detail/quotation-detail.component';
import { GoodsReceiptDetailComponent } from './goods-receipt-detail/goods-receipt-detail.component';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    VenDetailsComponent,
    PaymentComponent,
    InvoiceComponent,
    CreditComponent,
    FinanceSheetComponent,
    QuotationComponent,
    PurchaseOrderComponent,
    GoodsReceiptComponent,
    QuotationDetailComponent,
    GoodsReceiptDetailComponent,
    InvoicePdfComponent
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
    PdfViewerModule
  ]
})
export class DashboardModule { }
