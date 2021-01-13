import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/token/auth.service';
import { TokenService } from 'src/app/token/token.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnChanges, OnDestroy {

  public loggedIn: boolean; // variable para gestionar si el usuario está logeado.
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild('drawer') drawer: MatDrawer; // Cargar el elemento de drawer (Barra de navegación).
  @Input() opened: boolean = false; // Valor de entrada para verificar la acción del botón de menú.

  constructor(
    private router: Router, // Redireccionamiento.
    private Auth: AuthService, // Servicio para gestionar cuando se logeo el usuario.
    private Token: TokenService, // Servicio para gestionar el token.
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value => this.ready(value)); // Verificar el estado del logeo actual.
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si opened cambió para mostrar/ocultar barra de navegación.
    if(changes.opened && this.drawer && this.loggedIn){
      this.drawer.toggle();
    }
  }

  // Función para realizar el logout.
  logout(): void {
    this.Token.remove(); // Remover el token de LocalStorage.
    this.Auth.changeAuthStatus(false); // Deshabilitar autorización del logeo.
    this.drawer.toggle();
    this.router.navigateByUrl('login'); // Navegar al componente de Login.
  }

  ready(value): void {
    this.loggedIn = value; // Asignar logeo a verdadero.
  }

}
