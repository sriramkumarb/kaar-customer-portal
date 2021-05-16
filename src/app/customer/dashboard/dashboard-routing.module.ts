import { NgModule, SimpleChange } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit/credit.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { FinanceSheetComponent } from './finance-sheet/finance-sheet.component';
import { HomeComponent } from './home/home.component';
import { InquiryDataComponent } from './inquiry-data/inquiry-data.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LayoutComponent } from './layout/layout.component'
import { OverallSaleComponent } from './overall-sale/overall-sale.component';
import { PaymentComponent } from './payment/payment.component';
import { SaleOrderComponent } from './sale-order/sale-order.component';
const dashboardRoutes: Routes = [
    {
        path: 'cus-portal/dashboard/:email',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'inquiry-data',
                component: InquiryDataComponent
            },
            {
                path: 'sale-order',
                component: SaleOrderComponent
            },
            {
                path: 'delivery-list',
                component: DeliveryListComponent
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
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
