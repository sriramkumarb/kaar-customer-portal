import { NgModule, SimpleChange } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit/credit.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { FinanceSheetComponent } from './finance-sheet/finance-sheet.component';
import { HomeComponent } from './home/home.component';
import { InquiryDataDetailComponent } from './inquiry-data-detail/inquiry-data-detail.component';
import { InquiryDataComponent } from './inquiry-data/inquiry-data.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LayoutComponent } from './layout/layout.component'
import { OverallSaleComponent } from './overall-sale/overall-sale.component';
import { PaymentComponent } from './payment/payment.component';
import { SaleOrderDetailComponent } from './sale-order-detail/sale-order-detail.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
import { AuthGuard } from '../../service/auth.guard'
import { MasterDataComponent } from './master-data/master-data.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
const dashboardRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'inquiry-data',
                component: InquiryDataComponent
            },
            {
                path: 'inquiry-data/detail/:vbeln',
                component: InquiryDataDetailComponent
            },
            {
                path: 'sale-order',
                component: SaleOrderComponent
            },
            {
                path: 'sale-order/detail/:vbeln',
                component: SaleOrderDetailComponent
            },
            {
                path: 'delivery-list',
                component: DeliveryListComponent
            },
            {
                path: 'delivery-list/detail/:vbeln',
                component: DeliveryDetailsComponent
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
                path: 'payment',
                component: PaymentComponent
            },
            {
                path: 'credit',
                component: CreditComponent
            },
            {
                path: 'overall-sale',
                component: OverallSaleComponent
            },
            {
                path: 'customer-details',
                component: CustomerDetailsComponent
            },
            {
                path: 'master-data-upload',
                component: MasterDataComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
