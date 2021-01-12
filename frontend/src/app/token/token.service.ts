import { Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { BehaviorSubject } from 'rxjs';
import { BaseUrl } from '../base-url';

class token {
  iss: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private expire = new BehaviorSubject<any>(0);
  expired = this.expire.asObservable();
  private iss = {
    login: `${this.baseUrl.url}/NEUgbYOtO8DvjfEmfXHu`
  }

  constructor(
    private baseUrl: BaseUrl,
    private idle: Idle
  ) { }

  handle(token: string) : void{
    this.set(token);
  }

  set(token: string) : void{
    this.processIdle();
    localStorage.setItem('UernrI5w9zP5egHsbRvC', token);
  }

  processIdle() : void{
    this.idle.setIdle(180);
    this.idle.setTimeout(0);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onTimeout.subscribe(()=>{
      this.expire.next(true);
    });
    this.reset();
  }

  reset() : void {
    this.idle.watch();
  }

  get() : string{
    return localStorage.getItem('UernrI5w9zP5egHsbRvC');
  }

  remove() : void {
    this.idle.stop();
    localStorage.removeItem('UernrI5w9zP5egHsbRvC');
  }

  isValid() : boolean{
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token: string) : token {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: string): token {
    return JSON.parse(atob(payload));
  }

  loggedIn() : boolean{
    return this.isValid();
  }


}
