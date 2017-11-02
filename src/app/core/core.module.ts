import { PageUnauthorizedComponent } from './component/page-unauthorized/page-unauthorized.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { PessoaModule } from './../pessoa/pessoa.module';
import { LancamentoModule } from './../lancamento/lancamento.module';
import { CoreRoutingModule } from './core.routing.module';

import { PessoaCadastroComponent } from './../pessoa/component/pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './../pessoa/component/pessoa-pesquisa/pessoa-pesquisa.component';
import { LancamentoCadastroComponent } from './../lancamento/component/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './../lancamento/component/lancamento-pesquisa/lancamento-pesquisa.component';
import { AppComponent } from './component/bootstrap/app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    LancamentoModule,
    PessoaModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    CoreRoutingModule
  ],
  declarations: [ NavbarComponent, AppComponent, PageNotFoundComponent, PageUnauthorizedComponent ],
  exports: [ NavbarComponent, AppComponent ]
})
export class CoreModule { }
