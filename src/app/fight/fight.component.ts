import { Component, OnInit,ChangeDetectorRef } from '@angular/core';

import { FightSkillService } from '../services/fight-skill.service';
import { StereotypeService } from '../services/stereotype.service';
import { Stereotype, FightSkill } from '../tree.type'; // Importation des interfaces

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.scss'
})
export class FightComponent implements OnInit{

  skills: any[] = [];
  stereotypes: any[] = [];

  constructor(
    private stereotypeService: StereotypeService,
    private fightSkillService: FightSkillService,
    private cdr: ChangeDetectorRef 
  ) { }

  
  ngOnInit() {

    this.fightSkillService.getSkills().subscribe(
      (data: FightSkill[]) => {
        this.skills = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.stereotypeService.getStereotypes().subscribe(
      (data: Stereotype[]) => {
        this.stereotypes = data;
      },
      error => {
        console.error('Error fetching stereotype', error);
      }
    );

  };
}
