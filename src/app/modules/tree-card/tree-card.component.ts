import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tree-card',
  templateUrl: './tree-card.component.html',
  styleUrl: './tree-card.component.scss'
})
export class TreeCardComponent {
  @Input() tree: any; 
  openTrees: Set<number> = new Set<number>();

  isOpen: boolean = false;

  openTree(){
    this.isOpen = !this.isOpen;
  }
}
