import { Component, OnInit } from '@angular/core';
import { WeaponTreeService } from '../services/weapon-tree.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { StereotypeService } from '../services/stereotype.service';
import { RangeService } from '../services/range.service';
import { StatisticPhysicService } from '../services/statistic-physic.service';

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

  constructor(
    private weaponTreeService: WeaponTreeService,
    private stereotypeService: StereotypeService,
    private rangeService: RangeService,
    private statisticPhysicService: StatisticPhysicService,
  ) { }

  ngOnInit() {
    this.weaponTreeService.getWeapons().subscribe(
      data => {
        this.trees = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.stereotypeService.getStereotypes().subscribe(
      data => {
        this.stereotypes = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.rangeService.getRanges().subscribe(
      data => {
        this.ranges = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );

    this.statisticPhysicService.getStatisticPhysics().subscribe(
      data => {
        this.statistics = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching weapon trees', error);
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

}
