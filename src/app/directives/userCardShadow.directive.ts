import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[userCardShadow]',
  standalone: true
})

export class UserCardShadowDirective {
  shadow = 'none';

  @HostBinding('style.boxShadow')
  get boxShadow() {
    return this.shadow
  }

  @HostListener('mouseenter')
  mouseenter() {
    this.shadow = '0px 0px 6px #ccc'
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.shadow = 'none'
  }
}
