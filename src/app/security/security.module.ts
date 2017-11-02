import { AuthLogoutService } from './service/auth-logout.service';
import { AuthGuard } from './securiry/auth.guard';
import { AuthService } from './service/auth.service';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AuthHttpFactory } from './factory/auth-http-factory';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    SecurityRoutingModule
  ],
  providers: [ { provide: AuthHttp, useFactory: AuthHttpFactory, deps: [AuthService, Http, RequestOptions] },
                AuthGuard, AuthLogoutService ],
  declarations: [LoginComponent]
})
export class SecurityModule { }
