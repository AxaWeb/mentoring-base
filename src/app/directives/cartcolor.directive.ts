import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[cartColor]',
  standalone: true
})

export class CartColorDirective {
  color = 'grey';

  @HostBinding('style.background')
  get background() {
    return this.color
  }

  @HostListener('mouseenter')
  mouseenter() {
    this.color = '#F0BA4E'
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.color = 'grey'
  }
}
