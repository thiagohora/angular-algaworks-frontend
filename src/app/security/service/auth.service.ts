import { environment } from './../../../environments/environment';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private readonly BASE_URL: string;
  private token: string;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.token = this.getToken();
    this.BASE_URL = `${environment.BASE_URL}/oauth/token`;
  }

  public login(user: string, pass: string): Promise<void> {
    const headers = new Headers();

    headers.set('Authorization', 'Basic dGVzdGU6MTIz');
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${user}&password=${pass}&grant_type=password`;

    return this.http.post(this.BASE_URL, body, { headers, withCredentials: true })
                .toPromise()
                .then(response => {
                  this.saveToken(response.json().access_token);
                  this.token = this.getToken();
                })
                .catch(response => {
                  if (response.status === 400) {
                    const responseJson = response.json();
                    if (responseJson.error === 'invalid_grant') {
                      return Promise.reject('Usuário ou senha inválida');
                    }
                  }
                  return Promise.reject(response);
                });
  }

  private saveToken(token: string) {
    localStorage.setItem('tokenJWT', token);
  }

  private getToken() {
    return localStorage.getItem('tokenJWT') ;
  }

  public getTokenInfo() {
    const token = localStorage.getItem('tokenJWT');

    if (token) {
      return this.jwtHelper.decodeToken(token);
    }

    return null;
  }
  public hasPermission(permission: string) {
    const token = this.getTokenInfo();
    return token && token.authorities.includes(permission);
  }

  public isTokenExpired() {
    const token = this.getToken();
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public newToken(): Promise<void> {
    const headers = new Headers();

    headers.set('Authorization', 'Basic dGVzdGU6MTIz');
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `grant_type=refresh_token`;

    return this.http.post(this.BASE_URL, body, { headers, withCredentials: true })
                .toPromise()
                .then(response => {
                  this.saveToken(response.json().access_token);
                  this.token = this.getToken();
                })
                .catch(response => {
                  return Promise.reject(response);
                });
  }
}
