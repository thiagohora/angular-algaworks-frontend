import { AuthService } from './../../../security/service/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { LancamentoService, Filtro } from './../../service/lancamento.service';
import { ErrorHandlerService } from './../../../core/service/error-handler/error-handler.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent {

  public lancamentos = [];
  public filtro: Filtro = { itensPorPaginas: 5, total: 0, pagina: 0} as Filtro;
  @ViewChild('table') table: any;

  constructor(
    private service: LancamentoService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService
  ) {}

  public pesquisar() {
    this.service
        .pesquisar(this.filtro)
        .then(pagination => {
          this.lancamentos = pagination.lancamentos;
          this.filtro.total = pagination.total;
        }).catch(error => this.errorHandlerService.handle(error));
  }

  public changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.pesquisar();
  }

  public delete(codigo: number) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.callDelete(codigo)
    });
  }

  private callDelete(codigo: number) {
    this.service.delete(codigo).then(() => {
      this.table.first === 0 ? this.pesquisar() : this.table.first = 0;
      this.toastyService.success('Lançamento excluido com sucesso!');
    }).catch(error => this.errorHandlerService.handle(error));
  }

  public getAuthService() {
    return this.authService;
  }
}
