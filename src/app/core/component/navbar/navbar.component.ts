import { ErrorHandlerService } from './../../service/error-handler/error-handler.service';
import { Router } from '@angular/router';
import { AuthLogoutService } from './../../../security/service/auth-logout.service';
import { AuthService } from './../../../security/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showMenu = false;

  constructor(
    private authService: AuthService,
    private logoutService: AuthLogoutService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  public getAuthService() {
    return this.authService;
  }

  public logout() {
    return this.logoutService.logout()
          .then(() => this.router.navigate(['/login']))
          .catch(error => this.errorHandlerService.handle(error));
  }

}
