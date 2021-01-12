import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../base-url';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private baseUrl: BaseUrl,
    private http: HttpClient
  ) { }

  login(data: User){
    return this.http.post(`${this.baseUrl.url}/NEUgbYOtO8DvjfEmfXHu`, data);
  }

}
