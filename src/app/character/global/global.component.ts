import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrl: './global.component.scss'
})
export class GlobalComponent {

  
  @Input() character: any; 

}
