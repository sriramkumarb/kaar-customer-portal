import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenAuthGuard } from '../../service/ven-auth.guard'
import { CreditComponent } from './credit/credit.component';
import { FinanceSheetComponent } from './finance-sheet/finance-sheet.component';
import { GoodsReceiptDetailComponent } from './goods-receipt-detail/goods-receipt-detail.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { HomeComponent } from './home/home.component';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LayoutComponent } from './layout/layout.component';
import { PaymentComponent } from './payment/payment.component';
import { PoCreateComponent } from './po-create/po-create.component';
import { PurchaseOrderDetailsComponent } from './purchase-order-details/purchase-order-details.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { QuotationDetailComponent } from './quotation-detail/quotation-detail.component';
import { QuotationComponent } from './quotation/quotation.component';
import { VenDetailsComponent } from './ven-details/ven-details.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [VenAuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'vendor-details',
        component: VenDetailsComponent
      },
      {
        path: 'quotation',
        component: QuotationComponent
      },
      {
        path: 'quotation/detail/:ebeln',
        component: QuotationDetailComponent
      },
      {
        path: 'purchase-order',
        component: PurchaseOrderComponent
      },
      {
        path: 'purchase-order/detail/:ebeln',
        component: PurchaseOrderDetailsComponent
      },
      {
        path: 'po-create',
        component: PoCreateComponent
      },
      {
        path: 'goods-receipt',
        component: GoodsReceiptComponent
      },
      {
        path: 'goods-receipt/detail/:mblnr/:mjahr',
        component: GoodsReceiptDetailComponent
      },
      {
        path: 'finance-sheet',
        component: FinanceSheetComponent
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'invoice/pdf/:INV_DOC_NO/:FISC_YEAR',
        component: InvoicePdfComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'credit',
        component: CreditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
