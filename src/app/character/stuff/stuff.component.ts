import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrl: './stuff.component.scss'
})
export class StuffComponent implements OnInit{

  @Input() character: any; 
  @Input() type: any; 

  
  ngOnInit(): void {
    
  }
}
