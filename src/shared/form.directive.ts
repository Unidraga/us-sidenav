import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[usFormHost]',
})
export class FormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
