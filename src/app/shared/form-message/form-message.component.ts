import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-message',
  template: `
  <span *ngIf="hasError()" class="ui-message ui-messages-error">{{ text }}</span>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class FormMessageComponent {

  @Input()
  private error: string;

  @Input()
  private control: FormControl;

  @Input()
  public text: string;

  public hasError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
