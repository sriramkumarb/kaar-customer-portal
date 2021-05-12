import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRoutingModule } from './customer/customer-routing.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'cus-portal',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
