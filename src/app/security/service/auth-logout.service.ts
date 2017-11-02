import { environment } from './../../../environments/environment';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthLogoutService {

  private readonly BASE_URL: string;
  private token: string;

  constructor(
    private http: AuthHttp
  ) {
    this.BASE_URL = `${environment.BASE_URL}/token/revoke`;
  }

  public logout() {
    return this.http.delete(this.BASE_URL, { withCredentials: true })
          .toPromise()
          .then(() => localStorage.removeItem('tokenJWT'));
  }
}
