import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  // Variables
  @Input() inputText;
  @Input() direction;
  @Input() type;
  directionTooltip: string;
  tooltipType: string;

  /**
   * This method is used to create dynamic classes
   */
  ngOnInit() {

    // switch case based on tooltip direction - top/bottom/left/right
    switch (this.direction) {
      case 'top': {
        this.directionTooltip = 'ng-tooltip-top';
        break;
      }
      case 'right': {
        this.directionTooltip = 'ng-tooltip-right';
        break;
      }
      case 'left': {
        this.directionTooltip = 'ng-tooltip-left';
        break;
      }
      case 'bottom': {
        this.directionTooltip = 'ng-tooltip-bottom';
        break;
      }
      default: {
        this.directionTooltip = 'ng-tooltip-left';
      }
    }

    // switch case based on tooltip type - error/success
    switch (this.type) {
      case 'error': {
        this.tooltipType = 'error-text';
        break;
      }
      case 'success': {
        this.tooltipType = 'success-text';
        break;
      }
      default: {
        this.tooltipType = 'success-text';
      }
    }
  }

}
