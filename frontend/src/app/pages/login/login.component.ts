import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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

  // Formulario del logeo.
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
  });

  // Variable para mostrar el error de credenciales.
  public error: boolean = false;

  // Variable para mostrar la contraseña en el formulario de acuerdo al usuario.
  public hide: boolean = true;

  constructor(
    private LoginService: LoginService, // Servicio el cual gestionará las peticiones al backend.
    private SwalService: SwalService, // Servicio para mostrar las alertas de Swal personalizadas.                                                                                                                                                                                                                                                        
    private Token: TokenService, // Servicio para gestionar el token.
    private Auth: AuthService, // Servicio para gestionar cuando se logeo el usuario.
    private router: Router, // Redireccionamiento.
    private Title: Title, // Titulo.
  ) { }

  ngOnInit(): void {
    this.Title.setTitle('TH | Login'); // Modificar el titulo del encabezado.
  }

  // Función para cuando se accione el botón de iniciar sesión.
  submitLogin(): void {
    this.error = false; // Asignar falso al error para dejar de mostrarlo.
    this.SwalService.loading(); // Mostrar la alerta de carga.
    // Enviar petición de logeo.
    this.LoginService.login(this.formLogin.value).subscribe(
      data => this.handleResponse(data),
      err => this.handleError(err),
    );
  }

  // Manejar la respuesta en caso de exito.
  handleResponse(data): void {
    this.SwalService.closeSwal(); // Cerrar la alerta de carga.
    this.Token.handle(data.token); // Guardar el token. 
    this.Auth.changeAuthStatus(true); // Autorizar el Logeo.
    this.router.navigateByUrl('/'); // Navegar al componente Home.
  }

  // Manjear la respuesta en caso de error.
  handleError(err){
    this.SwalService.closeSwal(); // Cerrar la alerta de carga.
    // Si el error es 400 (credenciales erroneas), mostrar error.
    if(err.status == 400){
      this.error = true;
    }else{
      this.SwalService.error(err); // Mostrar alerta personalizada si el error es diferente a 400.
    }
  }

  // Error messages.
  getErrorMessage() {

    if (this.formLogin.controls['email'].hasError('required')) { return 'Debe de ingresar un valor.'; };
    if (this.formLogin.controls['email'].hasError('email')) { return 'No es un email válido.' };

  }

  getPasswordErrorMessage() {

    if (this.formLogin.controls['password'].hasError('required')) { return 'Debe de ingresar un valor.'; };
    if (this.formLogin.controls['password'].hasError('minlength')) { return 'No es una contraseña válida.' };
    if (this.formLogin.controls['password'].hasError('maxlength')) { return 'No es una contraseña válida.' };

  }

}
