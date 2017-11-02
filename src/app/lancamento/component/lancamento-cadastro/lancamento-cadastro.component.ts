import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../../service/lancamento.service';
import { PessoaService } from './../../../pessoa/service/pessoa.service';
import { ErrorHandlerService } from './../../../core/service/error-handler/error-handler.service';
import { CategoriaService } from './../../service/categoria/categoria.service';
import Lancamento, { Tipo } from '../../domain/lancamento.model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: Tipo.RECEITA, desc: 'Recebimento' },
    { label: 'Despesa', value: Tipo.DESPESA, desc: 'Pagamento' }
  ];

  public categorias;
  public pessoas;

  public lancamento: Lancamento =  LancamentoCadastroComponent.emptyLancamento();

  private static emptyLancamento(): Lancamento {
    return { pessoa: { codigo: 0 }, categoria: { codigo: 0 } } as Lancamento;
  }

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private service: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigo: number = + this.updateMode;
    this.title.setTitle('Cadastro de lançamento');

    if (codigo) {
      this.service.get(codigo)
          .then(lancamento => this.lancamento = lancamento)
          .catch(error => this.errorHandlerService.handle(error));
      this.title.setTitle('Alteração de lançamento');
    }

    this.loadCategoria();
    this.loadPessoas();
  }

  public get updateMode() {
    return this.route.snapshot.paramMap.get('codigo');
  }

  public loadCategoria() {
    return this.categoriaService.getAll()
                .then(categories => this.categorias = categories.map(c => ({ label: c.nome, value: c.codigo })))
                .catch(error => this.errorHandlerService.handle(error));
  }

  public loadPessoas() {
    return this.pessoasService.getAll()
                .then(pessoas => this.pessoas = pessoas.map(c => ({ label: c.nome, value: c.codigo })))
                .catch(error => this.errorHandlerService.handle(error));
  }

  public save(form: FormControl) {
    return this.updateMode ? this.update(form) : this.create(form);
  }

  private create(form: FormControl) {
    return this.service.save(this.lancamento)
                .then((lancamento) => {
                  this.toastyService.success('Lançamento cadastrado com sucesso!');
                  this.lancamento = LancamentoCadastroComponent.emptyLancamento();
                  form.reset();
                  this.router.navigate(['/lancamentos', lancamento.codigo]);
                })
                .catch(error => this.errorHandlerService.handle(error));
  }

  private update(form: FormControl) {
    return this.service.update(this.lancamento)
                .then((lancamento) => {
                  this.toastyService.success('Lançamento alterado com sucesso!');
                })
                .catch(error => this.errorHandlerService.handle(error));
  }

  public newOne(form: FormControl) {
    this.router.navigate(['/lancamentos/novo']);
    this.lancamento = LancamentoCadastroComponent.emptyLancamento();
  }

}
