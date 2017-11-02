import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-unauthorized',
  template: `
    <div class="container">
      <h1 class="text-center">Acesso negado</h1>
    </div>
  `,
  styles: []
})
export class PageUnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
