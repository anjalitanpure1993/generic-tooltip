import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomTooltip]'
})
export class CustomTooltipDirective {
  @Input('appCustomTooltip') tooltipTitle: string;
  @Input() placement: string;
  @Input() delay: number;
  appCustomTooltip: HTMLElement;
  offset = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.appCustomTooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.appCustomTooltip) { this.hide(); }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.appCustomTooltip, 'custom-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.appCustomTooltip, 'custom-tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.appCustomTooltip);
      this.appCustomTooltip = null;
    }, this.delay);
  }

  create() {
    this.appCustomTooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.appCustomTooltip,
      this.renderer.createText(this.tooltipTitle) // textNode
    );

    this.renderer.appendChild(document.body, this.appCustomTooltip);
    // this.renderer.appendChild(this.el.nativeElement, this.appCustomTooltip);

    this.renderer.addClass(this.appCustomTooltip, 'custom-tooltip');
    this.renderer.addClass(this.appCustomTooltip, `custom-tooltip-${this.placement}`);

    // delay 설정
    this.renderer.setStyle(this.appCustomTooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.appCustomTooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.appCustomTooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.appCustomTooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.appCustomTooltip.getBoundingClientRect();

    // window의 scroll top
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
    this.renderer.setStyle(this.appCustomTooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.appCustomTooltip, 'left', `${left}px`);
  }
}
