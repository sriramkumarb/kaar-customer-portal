import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpAuthGuard } from '../../service/emp-auth.guard'
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { FinalSettlementComponent } from './final-settlement/final-settlement.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LeaveDataComponent } from './leave-data/leave-data.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { PaySlipDetailsComponent } from './pay-slip-details/pay-slip-details.component';
import { PaySlipComponent } from './pay-slip/pay-slip.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [EmpAuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'employee-details',
        component: EmpDetailsComponent
      },
      {
        path: 'leave-data',
        component: LeaveDataComponent
      },
      {
        path: 'leave-request',
        component: LeaveRequestComponent
      },
      {
        path: 'pay-slip',
        component: PaySlipComponent
      },
      {
        path: 'pay-slip/detail/:SEQUENCENUMBER',
        component: PaySlipDetailsComponent
      },
      {
        path: 'final-settlement',
        component: FinalSettlementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
