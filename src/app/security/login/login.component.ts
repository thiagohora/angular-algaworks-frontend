import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/service/error-handler/error-handler.service';
import { AuthService } from './../service/auth.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    private title: Title,
    private service: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  public login: any = {};

  ngOnInit() {
    this.title.setTitle('Login');
  }

  public logar(form: FormControl) {
    this.service.login(this.login.user, this.login.pass)
        .then(_ => this.router.navigate(['/lancamentos']))
        .catch(error => this.errorHandlerService.handle(error));
  }
}
