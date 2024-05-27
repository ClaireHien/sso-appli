import { Component, OnInit } from '@angular/core';
import { WeaponTreeService } from '../services/weapon-tree.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.scss'
})
export class WeaponComponent implements OnInit {
  
  trees: any[] = [];

  constructor(private weaponTreeService: WeaponTreeService) { }

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
  }

}
