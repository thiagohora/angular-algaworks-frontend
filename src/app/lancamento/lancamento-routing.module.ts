import { AuthGuard } from './../security/securiry/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoCadastroComponent } from '../lancamento/component/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from '../lancamento/component/lancamento-pesquisa/lancamento-pesquisa.component';

const router: Routes = [
    {
      path: 'lancamentos',
      component: LancamentoPesquisaComponent,
      canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
    },
    {
      path: 'lancamentos/novo',
      component: LancamentoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    },
    {
      path: 'lancamentos/:codigo',
      component: LancamentoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(router),
  ],
  exports: [ ]
})
export class LancamentoRoutingModule { }
