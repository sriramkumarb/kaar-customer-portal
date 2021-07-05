import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
const employeeRoutes: Routes = [
  {
    path: 'emp-portal',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'emp-portal/dashboard',
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
