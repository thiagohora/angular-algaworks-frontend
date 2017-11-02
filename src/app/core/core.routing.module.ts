import { PageUnauthorizedComponent } from './component/page-unauthorized/page-unauthorized.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { PessoaCadastroComponent } from '../pessoa/component/pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from '../pessoa/component/pessoa-pesquisa/pessoa-pesquisa.component';
import { LancamentoCadastroComponent } from '../lancamento/component/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from '../lancamento/component/lancamento-pesquisa/lancamento-pesquisa.component';


const router: Routes = [
    { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
    { path: 'pagina-nao-encontrada', component: PageNotFoundComponent },
    { path: 'unauthorized', component: PageUnauthorizedComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ];


@NgModule({
  imports: [
    RouterModule.forRoot(router),
  ],
  exports: [ RouterModule ]
})
export class CoreRoutingModule { }
