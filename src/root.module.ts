import { NgModule } from '@angular/core';

import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from './app/app.module';
import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    RootRoutingModule,
    AppModule
  ],
  bootstrap: [RootComponent]
})
export class RootModule { }
