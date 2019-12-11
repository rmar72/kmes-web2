import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { LoginModule } from 'src/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    IdentityManagementComponent,
    DashboardComponent,
    SystemAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
