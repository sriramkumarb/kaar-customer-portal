import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenAuthGuard } from '../../service/ven-auth.guard'
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { PaymentComponent } from './payment/payment.component';
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
        path: 'payment',
        component: PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
