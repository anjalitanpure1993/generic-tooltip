import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Generic Tooltip Component';

  // Variables
  public tooltipText = 'Lorem Ipsum is simply dummy text of the printing' +
   'and typesetting industry. Lorem Ipsum has been; the industrys standard' +
   'dummy text ever since the 1500s';
  public direction = 'top';
}
