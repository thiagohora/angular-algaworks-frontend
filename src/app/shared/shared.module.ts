import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColoridoDirective } from './colorido.directive';
import { FormMessageComponent } from './form-message/form-message.component';
import { WellcomeComponent } from './component/wellcome/wellcome.component';
import { HelloComponent } from './component/hello/hello.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HelloComponent,
    WellcomeComponent,
    ColoridoDirective,
    FormMessageComponent,
  ],
  exports: [
    HelloComponent,
    WellcomeComponent,
    ColoridoDirective,
    FormMessageComponent,
   ]
})
export class SharedModule { }
