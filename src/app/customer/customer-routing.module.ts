import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page/main-page.component';

const customerRoutes: Routes = [
    {
        path: '',
        redirectTo: 'cus-portal',
        pathMatch: 'full'
    },
    {
        path: 'cus-portal',
        component: MainPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
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
        path: 'dash',
        component: DashboardComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(customerRoutes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
