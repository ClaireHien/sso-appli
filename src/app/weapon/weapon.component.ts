import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { WeaponTreeService } from '../services/weapon-tree.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { StereotypeService } from '../services/stereotype.service';
import { RangeService } from '../services/range.service';
import { StatisticPhysicService } from '../services/statistic-physic.service';
import { TypeDamageService } from '../services/type-damage.service';
import { StatusService } from '../services/status.service';

import { Tree, Stereotype, Range, Statistic, TypeDamage, Status } from '../tree.type'; // Importation des interfaces

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.scss'
})
export class WeaponComponent implements OnInit {
  
  trees: any[] = [];
  openTrees: Set<number> = new Set<number>();
  stereotypes: any[] = [];
  ranges: any[] = [];
  statistics: any[] = [];
  damages: any[] = [];
  statuses: any[] = [];

  filteredTrees: any[] = [];
  
  selectedDice: Set<string> = new Set<string>();
  selectedStatistics: Set<string> = new Set<string>();
  selectedRanges: Set<string> = new Set<string>();
  selectedDamages: Set<string> = new Set<string>();
  selectedStereotypes: Set<string> = new Set<string>();
  selectedStatuses: Set<string> = new Set<string>();

  constructor(
    private weaponTreeService: WeaponTreeService,
    private stereotypeService: StereotypeService,
    private rangeService: RangeService,
    private statusService: StatusService,
    private typeDamageService: TypeDamageService,
    private statisticPhysicService: StatisticPhysicService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit() {
    this.weaponTreeService.getWeapons().subscribe(
      (data: Tree[]) => {
        this.trees = data.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredTrees = this.trees.slice();
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.stereotypeService.getStereotypes().subscribe(
      (data: Stereotype[]) => {
        this.stereotypes = data.filter(stereotype => stereotype.id !== 1 && stereotype.id !== 2 && stereotype.id !== 12 && stereotype.id !== 13);
      },
      error => {
        console.error('Error fetching stereotype', error);
      }
    );
    
    this.rangeService.getRanges().subscribe(
      (data: Range[]) => {
        this.ranges = data;
      },
      error => {
        console.error('Error fetching range', error);
      }
    );

    this.statisticPhysicService.getStatisticPhysics().subscribe(
      (data: Statistic[]) => {
        this.statistics = data;
      },
      error => {
        console.error('Error fetching physic stats', error);
      }
    );

    this.typeDamageService.getTypeDamages().subscribe(
      (data: TypeDamage[]) => {
        this.damages = data;
      },
      error => {
        console.error('Error fetching damage', error);
      }
    );
    
    this.statusService.getStatuses().subscribe(
      (data: Status[]) => {
        this.statuses = data.filter(status => status.id !== 6 && status.id !== 7);
      },
      error => {
        console.error('Error fetching damage', error);
      }
    );
    
  }
  
  openTree(treeId: number): void {
    if (this.openTrees.has(treeId)) {
      this.openTrees.delete(treeId);
    } else {
      this.openTrees.add(treeId);
    }
  }

  isOpen(treeId: number): boolean {
    return this.openTrees.has(treeId);
  }

  
  toggleFilter(set: Set<string>, value: string) {
    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTrees = this.trees.filter(tree => {
      return (
        (this.selectedDice.size === 0 || this.selectedDice.has(tree.dice)) &&
        (this.selectedStatistics.size === 0 || tree.statistics.some((statistic: Statistic) => this.selectedStatistics.has(statistic.abreviation))) &&
        (this.selectedRanges.size === 0 || this.selectedRanges.has(tree.range.label)) &&
        (this.selectedDamages.size === 0 || this.selectedDamages.has(tree.type_damage.label)) &&
        (this.selectedStereotypes.size === 0 || tree.stereotypes.some((stereotype: Stereotype) => this.selectedStereotypes.has(stereotype.label))) &&
        (this.selectedStatuses.size === 0 || tree.statuses.some((status: Status) => this.selectedStatuses.has(status.name)))
      );
    });
    this.cdr.markForCheck();  // Forcer la détection des changements
  }

}
