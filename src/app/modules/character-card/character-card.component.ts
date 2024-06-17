import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  
  @Input() name: any; 
  @Input() image: any;
  @Input() description: any;
  @Input() user: any;
  @Input() level: any; 
  @Input() group: any;
  @Input() world: any;

}
