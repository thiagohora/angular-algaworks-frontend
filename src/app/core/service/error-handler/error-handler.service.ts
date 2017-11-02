import { NotAuthenticatedError } from './../../../security/service/auth-wrap-http.service';
import { Router } from '@angular/router';
import { AuthHttpError } from 'angular2-jwt';
import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService,
    private router: Router
  ) { }

  public handle(error: any) {
    if (typeof error === 'string') {
      this.toastyService.error(error);
    } else if (error instanceof NotAuthenticatedError) {
      this.toastyService.error('Sessão expirada');
      this.router.navigate(['/login']);
    } else if ( (typeof error === 'object') && (error.status > 399) && (error.status < 500 )) {

      let msg = 'Erro ao processar solicitação';

      if (error.status === 403) {
        msg = 'Voce não tem acesso para essa operação';
        return this.toastyService.error(msg);
      }

      try {
        msg = error.json()[0].mensagemUsuario;
      } finally {
        this.toastyService.error(msg);
      }
    } else {
      this.toastyService.error('Ocorreu um erro, tente mais tarde!');
      console.log('Error:', error);
    }
  }

}
