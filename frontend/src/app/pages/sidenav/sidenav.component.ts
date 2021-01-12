import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/token/auth.service';
import { TokenService } from 'src/app/token/token.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnChanges {

  public loggedIn: boolean;

  @ViewChild('drawer') drawer: MatDrawer;
  @Input() opened: boolean = true;

  constructor(
    private router: Router,
    private Auth: AuthService,
    private Token: TokenService,
  ) { }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value => this.ready(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.opened && this.drawer){
      this.drawer.toggle();
    }
  }

  logout(): void {
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('login');
  }

  ready(value): void {
    this.loggedIn = value;
  }

}
