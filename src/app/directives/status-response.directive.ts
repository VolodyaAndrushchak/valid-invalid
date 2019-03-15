import { Directive, Input, OnChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStatusResponse]'
})
export class StatusResponseDirective implements OnChanges{

  @Input() appStatusResponse: boolean;
  constructor(
    private el: ElementRef
  ) { }

  ngOnChanges() {
    if (this.appStatusResponse) {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else {
      this.el.nativeElement.style.backgroundColor = '#cb444a';
    }
  }

}
