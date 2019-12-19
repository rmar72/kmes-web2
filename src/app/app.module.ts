import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { SystemAdminComponent } from './system-admin/system-admin.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { IdentityCreateComponent } from './identity-management/identity-create/identity-create.component';
<<<<<<< HEAD
import { IdentityListComponent } from './identity-management/identity-list/identity-list.component';
=======
>>>>>>> b4cd50ddf145afa6fd5cf3e20988adb4b8f661e0

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    DashboardComponent,
    IdentityManagementComponent,
    SystemAdminComponent,
    IdentityCreateComponent,
<<<<<<< HEAD
    IdentityListComponent,
=======
>>>>>>> b4cd50ddf145afa6fd5cf3e20988adb4b8f661e0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
