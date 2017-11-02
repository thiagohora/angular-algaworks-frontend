import { environment } from './../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import Lancamento from '../domain/lancamento.model';
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

export interface Filtro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina?: number;
  itensPorPaginas?: number;
  total: number;
}

@Injectable()
export class LancamentoService {

  private readonly BASE_URL: string;

  constructor(private http: AuthHttp) {
    this.BASE_URL = `${environment.BASE_URL}/lancamentos`;
  }

  private getHeader(): Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  public pesquisar({ descricao, dataVencimentoDe, dataVencimentoAte, pagina = 0, itensPorPaginas = 5 }: Filtro): Promise<any> {

    const search = new URLSearchParams();

    search.set('page', pagina.toString());
    search.set('size', itensPorPaginas.toString());

    if (descricao) {
      search.set('descricao', descricao);
    }

    if (dataVencimentoDe) {
      search.set('dataVencimentoDe', this.parseDateToString(dataVencimentoDe));
    }

    if (dataVencimentoAte) {
      search.set('dataVencimentoAte', this.parseDateToString(dataVencimentoAte));
    }

    return this.http.get(`${this.BASE_URL}?resumo`, { headers: this.getHeader(), search })
                .toPromise()
                .then(response => {
                  const body = response.json();
                  return {
                    lancamentos: body.content,
                    total: body.totalElements
                  };
                });
  }

  public delete(codigo: number): Promise<void> {
    return this.http.delete(`${this.BASE_URL}/${codigo}`)
      .toPromise()
      .then(response => {});
  }

  public save(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.BASE_URL, lancamento)
                .toPromise()
                .then(response => response.json());
  }

  public update(lancamento: Lancamento): Promise<void> {
    return this.http.put(`${this.BASE_URL}/${lancamento.codigo}`, lancamento)
                .toPromise()
                .then(response => response.json());
  }

  public get(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.BASE_URL}/${codigo}`)
                .toPromise()
                .then(response => ({ ...response.json(),
                                      dataPagamento: this.parseStringToDate(response.json().dataPagamento),
                                      dataVencimento: this.parseStringToDate(response.json().dataVencimento)
                                  }));
  }

  private parseDateToString(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  private parseStringToDate(date: string) {
    return date ? moment(date, 'YYYY-MM-DD').toDate() : null;
  }
}
