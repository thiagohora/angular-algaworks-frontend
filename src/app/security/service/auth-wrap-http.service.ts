import { AuthService } from './auth.service';
import { JwtHelper, AuthHttp, AuthConfig } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Provider, ModuleWithProviders } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import 'rxjs/add/operator/toPromise';

export class NotAuthenticatedError  { }

@Injectable()
export class AuthWrapHttpService extends AuthHttp {

    constructor(
        private authService: AuthService,
        options: AuthConfig,
        http: Http,
        defOps: RequestOptions
    ) {
        super(options, http, defOps);
    }

    private checkTokenBeforeRequest(requestCall: Function): Observable<Response> {

        if (this.authService.isTokenExpired()) {
            console.log('Renewing token');

            return Observable.fromPromise(this.authService.newToken()
                                                .then(() => requestCall().toPromise())
                                                .catch(() => {
                                                    if (this.authService.isTokenExpired()) {
                                                        return Promise.reject(new NotAuthenticatedError());
                                                    }
                                                }));
        }

        return requestCall();
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.checkTokenBeforeRequest(() => super.get(url, options));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.checkTokenBeforeRequest(() => super.post(url, body, options));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.checkTokenBeforeRequest(() => super.put(url, body, options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.checkTokenBeforeRequest(() => super.delete(url, options));
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.checkTokenBeforeRequest(() => super.patch(url, body, options));
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.checkTokenBeforeRequest(() => super.head(url, options));
    }

    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.checkTokenBeforeRequest(() => super.options(url, options));
    }
}
