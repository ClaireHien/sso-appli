import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spirit-form',
  templateUrl: './spirit-form.component.html',
  styleUrl: './spirit-form.component.scss'
})
export class SpiritFormComponent {

  @Input() character: any; 

  
}
