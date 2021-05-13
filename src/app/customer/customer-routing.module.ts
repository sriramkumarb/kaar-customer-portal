import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

const customerRoutes: Routes = [
    {
        path: 'cus-portal',
        component: MainPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
        ]
    },
    {
        path: 'cus-portal/dashboard',
        loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)

    }
];

@NgModule({
    imports: [RouterModule.forRoot(customerRoutes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
