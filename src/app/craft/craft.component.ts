import { Component, OnInit,ChangeDetectorRef } from '@angular/core';

import { CraftSkillService } from '../services/craft-skill.service';
import { CraftService } from '../services/craft.service';
import { CraftTable, CraftSkill } from '../tree.type'; // Importation des interfaces

declare var Math: any;

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrl: './craft.component.scss'
})
export class CraftComponent implements OnInit {
  
  craftSkills: any[] = [];
  craftTables: any[] = [];
  
  constructor(
    private craftSkillService: CraftSkillService,
    private craftService: CraftService,
    private cdr: ChangeDetectorRef 
  ) { }
  
  
  calculateRoundedValue(value: number): number {
    return Math.floor(value);
  }

  ngOnInit() {

    this.craftSkillService.getCraftSkills().subscribe(
      (data: CraftSkill[]) => {
        this.craftSkills = data; 
        console.log(data);
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.craftService.getCraftTables().subscribe(
      (data: CraftTable[]) => {
        this.craftTables = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching stereotype', error);
      }
    );

  };

  
  activeSection: string = 'craft-table'; // Initial section

  setActiveSection(section: string) {
    this.activeSection = section;
  }

}
