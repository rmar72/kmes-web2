import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '../login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { IdentityManagementComponent } from 'src/app/identity-management/identity-management.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { SystemAdminComponent } from 'src/app/system-admin/system-admin.component';


@NgModule({
  declarations: [
    LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // CommonModule,
    // LoginRoutingModule
  ],
})
export class LoginModule { }
