import { NgModule, SimpleChange } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component'
import { SidebarComponent } from './sidebar/sidebar.component'
const dashboardRoutes: Routes = [
    {
        path: 'cus-portal/dashboard',
        component: LayoutComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
