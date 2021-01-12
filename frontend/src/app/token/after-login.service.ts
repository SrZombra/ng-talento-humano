import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // return this.Token.loggedIn();
    return this.checkLoggedIn(state.url);
  }
  constructor(private Token: TokenService, private router: Router) { }

  checkLoggedIn(url: string): boolean {
    
    if (this.Token.loggedIn()) {
      return true;
    }

    // Retain the attempted URL for redirection
    // this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;

  }
}