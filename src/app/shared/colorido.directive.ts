import { element } from 'protractor';
import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appColorido]'
})
export class ColoridoDirective {

   private elementRef: ElementRef;
   private renderer2: Renderer2;

   @Input()
   private cor: string;

   @HostBinding('style.backgroundColor')
   private backgroundColor: string;


  constructor(elementRef: ElementRef, renderer2: Renderer2) {
    this.elementRef = elementRef;
    this.renderer2 = renderer2;
  }

  @HostListener('focus')
  private earnFocus() {
    this.backgroundColor =  this.cor;
    // this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
  }

  @HostListener('blur')
  private leaveFocus() {
    this.backgroundColor = 'transparent';
    // this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }

}
