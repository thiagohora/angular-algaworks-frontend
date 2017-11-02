import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (next.data.roles) {

      if (this.authService.isTokenExpired()) {
        return this.authService.newToken()
            .then(_ => true)
            .catch(error => {
              this.router.navigate(['/login']);
              return false;
            });
      }

      if (next.data.roles.some(role => this.authService.hasPermission(role))) {
        return true;
      }
      this.router.navigate(['/unauthorized']);
    }
    return true;
  }
}
