import { environment } from './../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import Pessoa from '../domain/pessoa.model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

export interface Filtro {
  nome: string;
  pagina?: number;
  itensPorPaginas?: number;
  total: number;
}

@Injectable()
export class PessoaService {

  private readonly BASE_URL: string;

  constructor(private http: AuthHttp) {
    this.BASE_URL = `${environment.BASE_URL}/pessoas`;
  }

  public pesquisar({ nome, pagina = 0, itensPorPaginas = 5 }: Filtro) {

    const search = new URLSearchParams();

    search.set('page', pagina.toString());
    search.set('size', itensPorPaginas.toString());

    if (nome) {
      search.set('nome', nome);
    }

    return this.http.get(`${this.BASE_URL}`)
                .toPromise()
                .then(response => {
                  const body = response.json();
                  return {
                    pessoas: body.content,
                    total: body.totalElements
                  };
                });
  }

  getAll(): Promise<any> {
    return this.http.get(this.BASE_URL)
      .toPromise()
      .then(response => response.json().content);
  }

  public delete(codigo: number): Promise<void> {
    return this.http.delete(`${this.BASE_URL}/${codigo}`)
      .toPromise()
      .then(response => {});
  }

  public updateStatus(codigo: number, status: boolean): Promise<void> {
    return this.http.put(`${this.BASE_URL}/${codigo}/ativo`, status)
            .toPromise()
            .then(response => {});
  }

  public save(pessoa: Pessoa): Promise<void> {
    return this.http.post(`${this.BASE_URL}`, pessoa)
            .toPromise()
            .then(response => response.json());
  }

  public update(pessoa: Pessoa): Promise<void> {
    return this.http.put(`${this.BASE_URL}/${pessoa.codigo}`, pessoa)
            .toPromise()
            .then(response => response.json());
  }

  public get(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.BASE_URL}/${codigo}`)
                .toPromise()
                .then(response => response.json());
  }
}
