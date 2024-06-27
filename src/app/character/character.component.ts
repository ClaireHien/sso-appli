import { Component, OnInit, HostListener  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReloadDataService } from '../services/reload-data.service';
import { MaterialService } from '../services/material.service';
import { Material } from '../tree.type'; // Importation des interfaces


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  reloadDataSubscription!: Subscription;
  
  materials: any[] = [];

  formAddXp: FormGroup;  
  formAddMoney: FormGroup;  
  formAddItem: FormGroup;  
  formAddMaterial: FormGroup;  
  constructor(
    private router: Router,
    private materialService: MaterialService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private reloadDataService: ReloadDataService
  ) {
    this.formAddXp = this.fb.group({
      xp: ['0', Validators.required]
    });
    this.formAddMoney = this.fb.group({
      money: ['0', Validators.required]
    });
    this.formAddMaterial = this.fb.group({
      material_id: ['', Validators.required]
    });
    this.formAddItem = this.fb.group({
      name: ['', Validators.required],
      quantity: ['1', Validators.required],
      description: ['', Validators.required]
    });
  }
 
  character: any;

  backendUrl = environment.backendUrl;
  createdByUser:boolean = false;
  
  ngOnInit(){
    this.reloadDataSubscription = this.reloadDataService.reloadData$.subscribe(() => {
      this.reloadData();
    });
    
    this.materialService.getMaterials().subscribe(
      (data: Material[]) => {
        this.materials = data;
      },
      error => {
        console.error('Error fetching stereotype', error);
      }
    );

  }

  groupedMaterials: any[] = [];
  groupMaterials() {
    const materialMap = new Map();
    
    this.character.materials.forEach((material: any) => {
      if (materialMap.has(material.id)) {
        materialMap.get(material.id).quantity++;
      } else {
        materialMap.set(material.id, { ...material, quantity: 1 });
      }
    });

    this.groupedMaterials = Array.from(materialMap.values());
  }

  ngOnDestroy(): void {
    this.reloadDataSubscription.unsubscribe();
  }

  weaponTrees: any[] = [];
  magicTrees: any[] = [];
  reloadData(){
    const userId = this.cookieService.get('userId');
    this.http.get(`${this.backendUrl}/character/${this.route.snapshot.paramMap.get('characterId')}`,{ headers: new HttpHeaders({ 'Authorization': `Bearer ${this.cookieService.get('token')}` }) }).subscribe(
      data => {
        this.character = data;
        console.log(this.character)
        if (Number(this.cookieService.get('userId')) === this.character.user_id ){ this.createdByUser = true;}
        this.filterTrees();
        this.groupMaterials();
      },
      error => {
        console.error('Erreur', error);
      }
    );

  }

  filterTrees() {
    this.weaponTrees = this.character.trees.filter((tree: any) => tree.type_tree_id === 1);
    this.magicTrees = this.character.trees.filter((tree: any) => tree.type_tree_id === 2);
  }

  onSubmitAddXp(){

    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/addXP`,
       this.formAddXp.value, { headers }).subscribe(
      (data) => {
        this.reloadData();
        console.log(data);
        this.formAddXp.reset({ xp: 0 });
      },
      (error) => {
        console.error('Erreur', error);
      }
    );

  }

  dead(){

    const id = this.route.snapshot.paramMap.get('characterId');

    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/dead`, {},{ headers }).subscribe(
      data => {
        this.reloadData();
        console.log(data);
      },
      (error) => {
        console.error('Erreur', error);
      }
    );

  }

  formGlobal:boolean = false;
  swapGlobal(){this.formGlobal = !this.formGlobal;}

  formSpirit:boolean = false;
  swapSpirit(){this.formSpirit = !this.formSpirit;}

  formLevel:boolean = false;
  swapLevel(){this.formLevel = !this.formLevel;}

  formStatMain:boolean = false;
  swapStatMain(){this.formStatMain = !this.formStatMain;}

  formStatPhysical:boolean = false;
  swapStatPhysical(){this.formStatPhysical = !this.formStatPhysical;}
  
  formStatMagic:boolean = false;
  swapStatMagic(){this.formStatMagic = !this.formStatMagic;}
  
  formClothe:boolean = false;
  swapClothe(){this.formClothe = !this.formClothe;}
  
  formJewelry:boolean = false;
  swapJewelry(){this.formJewelry = !this.formJewelry;}
  
  formWeapon:boolean = false;
  swapWeapon(){this.formWeapon = !this.formWeapon;}
  
  formArmor:boolean = false;
  swapArmor(){this.formArmor = !this.formArmor;}

  roundDown(value: number): number {return Math.floor(value);}


  addNeutralSkill(){
    
  }
  
  addTree(){
    
  }
  onSubmitMoney(type:string){
    
  }
  onSubmitAddItem(){
    
  }
  
  onSubmitAddMaterial(){
    
  }
  
}
