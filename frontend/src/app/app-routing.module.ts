import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AfterLoginService } from './token/after-login.service';
import { BerforeLoginService } from './token/before-login.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [BerforeLoginService] },
  { path: '', component: HomeComponent, canActivate: [AfterLoginService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
