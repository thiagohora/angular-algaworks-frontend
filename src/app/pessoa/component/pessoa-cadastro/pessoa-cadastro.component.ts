import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../../core/service/error-handler/error-handler.service';
import { PessoaService } from './../../service/pessoa.service';
import Pessoa from '../../domain/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  public pessoa: Pessoa =  PessoaCadastroComponent.emptyPessoa();

  private static emptyPessoa(): Pessoa {
    return { ativo: true, endereco: { }, nome: '', codigo: undefined } as Pessoa;
  }

  constructor(
    private service: PessoaService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  private get updateMode() {
    return this.route.snapshot.paramMap.get('codigo');
  }

  ngOnInit(): void {
    const codigo: number = + this.updateMode;
    this.title.setTitle('Cadastro de pessoa');

    if (codigo) {
      this.service.get(codigo)
          .then(pessoa => this.pessoa = pessoa)
          .catch(error => this.errorHandlerService.handle(error));
      this.title.setTitle('Alteração de Pessoa');
    }
  }

  public save(form: FormControl) {
    return this.updateMode ? this.update(form) : this.create(form);
  }

  public create(form: FormControl) {
    return this.service.save(this.pessoa)
                .then(() => {
                  this.toastyService.success('Pessoa cadastrada com sucesso!');
                  this.pessoa = PessoaCadastroComponent.emptyPessoa();
                  form.reset();
                })
                .catch(error => this.errorHandlerService.handle(error));
  }

  public update(form: FormControl) {
    return this.service.update(this.pessoa)
                        .then(() => {
                          // this.pessoa = pessoa;
                          this.toastyService.success('Pessoa alterado com sucesso!');
                        })
                        .catch(error => this.errorHandlerService.handle(error));
  }

  public newOne(form: FormControl) {
    this.router.navigate(['/pessoas/novo']);
    this.pessoa = PessoaCadastroComponent.emptyPessoa();
  }

}
