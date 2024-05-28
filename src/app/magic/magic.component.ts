import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { MagicTreeService } from '../services/magic-tree.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { StereotypeService } from '../services/stereotype.service';
import { RangeService } from '../services/range.service';
import { StatisticMagicService } from '../services/statistic-magic.service';
import { TypeDamageService } from '../services/type-damage.service';
import { Tree, Stereotype, Range, Statistic, TypeDamage } from '../tree.type'; // Importation des interfaces

@Component({
  selector: 'app-magic',
  templateUrl: './magic.component.html',
  styleUrl: './magic.component.scss'
})
export class MagicComponent implements OnInit {
  
  trees: any[] = [];
  openTrees: Set<number> = new Set<number>();
  stereotypes: any[] = [];
  ranges: any[] = [];
  statistics: any[] = [];
  damages: any[] = [];

  filteredTrees: any[] = [];
  
  selectedDice: Set<string> = new Set<string>();
  selectedStatistics: Set<string> = new Set<string>();
  selectedRanges: Set<string> = new Set<string>();
  selectedDamages: Set<string> = new Set<string>();
  selectedStereotypes: Set<string> = new Set<string>();

  constructor(
    private magicTreeService: MagicTreeService,
    private stereotypeService: StereotypeService,
    private rangeService: RangeService,
    private typeDamageService: TypeDamageService,
    private statisticMagicService: StatisticMagicService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit() {
    this.magicTreeService.getMagics().subscribe(
      (data: Tree[]) => {
        this.trees = data;
        this.filteredTrees = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching magic trees', error);
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
    
    this.rangeService.getRanges().subscribe(
      (data: Range[]) => {
        this.ranges = data;
      },
      error => {
        console.error('Error fetching range', error);
      }
    );

    this.statisticMagicService.getStatisticMagics().subscribe(
      (data: Statistic[]) => {
        this.statistics = data;
      },
      error => {
        console.error('Error fetching Magic stat', error);
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
        (this.selectedStereotypes.size === 0 || tree.stereotypes.some((stereotype: Stereotype) => this.selectedStereotypes.has(stereotype.label)))
      );
    });
    this.cdr.markForCheck();  // Forcer la détection des changements
  }

}
