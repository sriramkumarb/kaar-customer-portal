import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
