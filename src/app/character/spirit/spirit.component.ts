import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spirit',
  templateUrl: './spirit.component.html',
  styleUrl: './spirit.component.scss'
})
export class SpiritComponent {

  
  @Input() character: any; 
  
}
