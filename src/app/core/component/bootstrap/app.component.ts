import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title: String = 'app h';

  constructor(private toastConfig: ToastyConfig, private router: Router) {
    this.toastConfig.theme = 'bootstrap';
  }

  public showMenu() {
    return this.router.url !== '/login';
  }
}
