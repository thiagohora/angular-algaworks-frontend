import { environment } from './../../../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

  private readonly BASE_URL: string;

  constructor(private http: AuthHttp) {
    this.BASE_URL = `${environment.BASE_URL}/categorias`;
  }

  private getHeader(): Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  public getAll(): Promise<any> {
    return this.http.get(`${this.BASE_URL}`)
                    .toPromise()
                    .then(response => response.json());
  }


}
