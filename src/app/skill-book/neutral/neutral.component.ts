import { Component, OnInit } from '@angular/core';
import { NeutralSkillService } from '../../services/neutral-skill.service';
import { NeutralSkill } from '../../tree.type'; // Importation des interfaces

@Component({
  selector: 'app-neutral',
  templateUrl: './neutral.component.html',
  styleUrl: './neutral.component.scss'
})
export class NeutralComponent implements OnInit{
  
  skills: any[] = [];

  constructor(
    private neutralSkillService: NeutralSkillService,
  ) { }
  
  ngOnInit() {

    this.neutralSkillService.getSkills().subscribe(
      (data: NeutralSkill[]) => {
        this.skills = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
  };

  
  

}
