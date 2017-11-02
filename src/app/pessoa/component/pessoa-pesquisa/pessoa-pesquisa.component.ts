import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../../core/service/error-handler/error-handler.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Filtro, PessoaService } from './../../service/pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent {

  public pessoas = [];
  public filtro: Filtro = { itensPorPaginas: 5, total: 0, pagina: 0} as Filtro;
  @ViewChild('table') table: any;

  constructor(
    private service: PessoaService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  public pesquisar() {
    this.service
        .pesquisar(this.filtro)
        .then(pagination => {
          this.pessoas = pagination.pessoas;
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

  private updateTable() {
    this.table.first === 0 ? this.pesquisar() : this.table.first = 0;
  }

  private callDelete(codigo: number) {
    this.service.delete(codigo).then(() => {
      this.updateTable();
      this.toastyService.success('Lançamento excluido com sucesso!');
    }).catch(error => this.errorHandlerService.handle(error));
  }

  public updateStatus(codigo: number, status: boolean) {
    this.service.updateStatus(codigo, status)
        .then(() => this.updateTable())
        .catch(error => this.errorHandlerService.handle(error));
  }
}
