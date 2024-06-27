import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-neutral-skill',
  templateUrl: './neutral-skill.component.html',
  styleUrl: './neutral-skill.component.scss'
})
export class NeutralSkillComponent implements OnInit {

  @Input() skill: any; 
  @Input() character: any; 
  @Input() type: any; 

  ngOnInit(): void {
  }

  unlockUpgrade(){
    
  }

}
 