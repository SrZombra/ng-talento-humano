import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.Token.loggedIn());
  public authStatus: Observable<boolean> = this.loggedIn.asObservable();

  constructor(
    private Token: TokenService
  ) { }

  changeAuthStatus(value: boolean) : void {
    this.loggedIn.next(value);
  }

}
