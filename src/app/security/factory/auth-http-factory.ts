import { AuthService } from './../service/auth.service';
import { AuthWrapHttpService } from './../service/auth-wrap-http.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

export function AuthHttpFactory(authService: AuthService, http: Http, options: RequestOptions) {
    options.headers.set('Content-Type', 'application/json');
    return new AuthWrapHttpService(authService, new AuthConfig({ tokenName: 'tokenJWT' }), http, options);
}
