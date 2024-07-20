import { Component, OnInit,ChangeDetectorRef } from '@angular/core';

import { FightSkillService } from '../../services/fight-skill.service';
import { StereotypeService } from '../../services/stereotype.service';
import { Stereotype, FightSkill } from '../../tree.type'; // Importation des interfaces

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.scss'
})
export class FightComponent implements OnInit{

  skills: any[] = [];
  stereotypes: any[] = [];
  
  filteredSkills: any[] = [];
  
  selectedStereotypes: Set<string> = new Set<string>();

  constructor(
    private stereotypeService: StereotypeService,
    private fightSkillService: FightSkillService,
    private cdr: ChangeDetectorRef 
  ) { }
  

  
  ngOnInit() {

    this.fightSkillService.getSkills().subscribe(
      (data: FightSkill[]) => {
        this.skills = data.sort((a, b) => a.name.localeCompare(b.name)); 
        this.filteredSkills = data.sort((a, b) => a.name.localeCompare(b.name));
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

  
  toggleFilter(set: Set<string>, value: string) {
    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredSkills = this.skills.filter(skill => {
      return (
        (this.selectedStereotypes.size === 0 || skill.stereotypes.some((stereotype: Stereotype) => this.selectedStereotypes.has(stereotype.label)))
      );
    });
    this.cdr.markForCheck();  // Forcer la détection des changements
  }

}
