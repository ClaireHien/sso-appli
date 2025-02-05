import { Component, OnInit,ChangeDetectorRef } from '@angular/core';

import { CraftSkillService } from '../../services/craft-skill.service';
import { CraftService } from '../../services/craft.service';
import { MaterialService } from '../../services/material.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CraftTable, CraftSkill, Material } from '../../tree.type'; // Importation des interfaces

declare var Math: any;

@Component({
  selector: 'app-craft',
  templateUrl: './craft.component.html',
  styleUrl: './craft.component.scss'
})
export class CraftComponent implements OnInit {
  
  craftSkills: any[] = [];
  craftTables: any[] = [];
  materials: any[] = [];
  
  constructor(
    private craftSkillService: CraftSkillService,
    private craftService: CraftService,
    private materialService: MaterialService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }
  
  
  calculateRoundedValue(value: number): number {
    return Math.floor(value);
  }

  ngOnInit() {

    this.craftSkillService.getCraftSkills().subscribe(
      (data: CraftSkill[]) => {
        this.craftSkills = data; 
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.craftService.getCraftTables().subscribe(
      (data: CraftTable[]) => {
        this.craftTables = data;
      },
      error => {
        console.error('Error fetching stereotype', error);
      }
    );

    this.materialService.getMaterials().subscribe(
      (data: Material[]) => {
        this.materials = data;
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
