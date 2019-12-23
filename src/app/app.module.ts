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
import { IdentityListComponent } from './identity-management/identity-list/identity-list.component';
import { ServiceProxyModule } from './shared/services/api/api.module';
import { InitialsPipe } from './shared/pipes/initials.pipe';

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
    IdentityListComponent,
    InitialsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceProxyModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
