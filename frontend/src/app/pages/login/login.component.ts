import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/swal/swal.service';
import { AuthService } from 'src/app/token/auth.service';
import { LoginService } from 'src/app/token/login.service';
import { TokenService } from 'src/app/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
  });

  public error: boolean = false;
  public hide: boolean = true;

  constructor(
    private LoginService: LoginService,
    private SwalService: SwalService,                                                                                                                                                                                                                                                                  
    private Token: TokenService,
    private Auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitLogin(): void {
    this.error = false;
    this.SwalService.loading();
    this.LoginService.login(this.formLogin.value).subscribe(
      data => this.handleResponse(data),
      err => this.handleError(err),
    );
  }

  handleResponse(data): void {
    this.SwalService.closeSwal();
    this.Token.handle(data.token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/');
  }

  handleError(err){
    this.SwalService.closeSwal();
    if(err.status == 400){
      this.error = true;
    }else{
      this.SwalService.error(err);
    }
  }

  // Error messages.
  getErrorMessage() {

    if (this.formLogin.controls['email'].hasError('required')) { return 'You must enter a value'; };
    if (this.formLogin.controls['email'].hasError('email')) { return 'Not a valid email' };

  }

  getPasswordErrorMessage() {

    if (this.formLogin.controls['password'].hasError('required')) { return 'You must enter a value'; };
    if (this.formLogin.controls['password'].hasError('minlength')) { return 'Not a valid password' };
    if (this.formLogin.controls['password'].hasError('maxlength')) { return 'Not a valid password' };

  }

}
