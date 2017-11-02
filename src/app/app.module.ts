import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './security/service/auth.service';
import { SecurityModule } from './security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PessoaCadastroComponent } from './pessoa/component/pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa/component/pessoa-pesquisa/pessoa-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento/component/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento/component/lancamento-pesquisa/lancamento-pesquisa.component';

import { CategoriaService } from './lancamento/service/categoria/categoria.service';
import { AppComponent } from './core/component/bootstrap/app.component';
import { ErrorHandlerService } from './core/service/error-handler/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { SharedModule } from './shared/shared.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { LancamentoModule } from './lancamento/lancamento.module';

import { LancamentoService } from './lancamento/service/lancamento.service';
import { PessoaService } from './pessoa/service/pessoa.service';

import { CoreModule } from './core/core.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SecurityModule,
    LancamentoModule,
    PessoaModule,
    SharedModule,
    CoreModule,
    HttpModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ConfirmationService,
    ErrorHandlerService,
    CategoriaService,
    AuthService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
