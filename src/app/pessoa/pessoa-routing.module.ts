import { AuthGuard } from './../security/securiry/auth.guard';
import { PessoaCadastroComponent } from './component/pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './component/pessoa-pesquisa/pessoa-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoCadastroComponent } from '../lancamento/component/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from '../lancamento/component/lancamento-pesquisa/lancamento-pesquisa.component';

const router: Routes = [
  { path: 'pessoas', component: PessoaPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'pessoas/novo', component: PessoaCadastroComponent, canActivate: [AuthGuard] },
  { path: 'pessoas/:codigo', component: PessoaCadastroComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(router),
  ],
  exports: [ ]
})
export class PessoaRoutingModule { }
