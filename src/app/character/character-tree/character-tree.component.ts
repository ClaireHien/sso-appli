import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-tree',
  templateUrl: './character-tree.component.html',
  styleUrl: './character-tree.component.scss'
})
export class CharacterTreeComponent {
  
  @Input() tree: any; 
  @Input() character: any; 

}
