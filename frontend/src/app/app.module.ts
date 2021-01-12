import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { PackMaterialModule } from './material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

/* App */
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { LoginComponent } from './pages/login/login.component';
import { BaseUrl } from './base-url';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SidenavComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    PackMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    BaseUrl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
