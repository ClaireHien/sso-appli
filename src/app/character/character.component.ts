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
import { FightSkillService } from '../services/fight-skill.service';
import { CraftSkillService } from '../services/craft-skill.service';
import { WeaponTreeService } from '../services/weapon-tree.service';
import { StatusService } from '../services/status.service';
import { MagicTreeService } from '../services/magic-tree.service';
import { NeutralSkillService } from '../services/neutral-skill.service';
import { Material,NeutralSkill,CraftSkill,FightSkill,Tree,Status } from '../tree.type'; // Importation des interfaces


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  reloadDataSubscription!: Subscription;
  
  materials: any[] = [];
  statuses: any[] = [];
  neutralSkills: any[] = [];
  fightSkills: any[] = [];
  craftSkills: any[] = [];
  magicalTrees: any[] = [];
  physicalTrees: any[] = [];

  formAddXp: FormGroup;  
  formAddMoney: FormGroup;  
  formAddItem: FormGroup;  
  formAddMaterial: FormGroup;  
  formAddStatus: FormGroup;  

  formNewNeutralSkill: FormGroup;  
  formNewTree: FormGroup;  

  constructor(
    private router: Router,
    private weaponTreeService: WeaponTreeService,
    private magicTreeService: MagicTreeService,
    private materialService: MaterialService,
    private fightSkillService: FightSkillService,
    private craftSkillService: CraftSkillService,
    private neutralSkillService: NeutralSkillService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private reloadDataService: ReloadDataService
  ) {
    this.formAddXp = this.fb.group({
      xp: ['0', Validators.required]
    });
    this.formAddStatus = this.fb.group({
      status_id: ['', Validators.required]
    });
    this.formAddMoney = this.fb.group({
      money: ['0', Validators.required]
    });
    this.formAddMaterial = this.fb.group({
      material_id: ['', Validators.required]
    });
    this.formAddItem = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.formNewNeutralSkill = this.fb.group({
      skillType: ['', Validators.required],
      neutralSkill: ['', Validators.required],
      craftSkill: ['', Validators.required],
      fightSkill: ['', Validators.required]
    });
    this.formNewTree = this.fb.group({
      treeType: ['', Validators.required],
      physicalTree: ['', Validators.required],
      magicalTree: ['', Validators.required]
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
    
    this.neutralSkillService.getSkills().subscribe(
      (data: NeutralSkill[]) => {
        this.neutralSkills = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.craftSkillService.getCraftSkills().subscribe(
      (data: CraftSkill[]) => {
        this.craftSkills = data; 
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.fightSkillService.getSkills().subscribe(
      (data: FightSkill[]) => {
        this.fightSkills = data; 
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.weaponTreeService.getWeapons().subscribe(
      (data: Tree[]) => {
        this.physicalTrees = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );
    
    this.magicTreeService.getMagics().subscribe(
      (data: Tree[]) => {
        this.magicalTrees = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error fetching magic trees', error);
      }
    );

    this.statusService.getStatuses().subscribe(
      (data: Status[]) => {
        this.statuses = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error fetching magic trees', error);
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
        this.filterCharacterTrees();
        this.groupMaterials();
      },
      error => {
        console.error('Erreur', error);
      }
    );

    this.statusRecap = false;

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
      },
      (error) => {
        console.error('Erreur', error);
      }
    );

  }

  statusRecap:boolean = false;
  brulureDmg:number = 0;
  onSubmitAddStatus(type:string, statusId:number){
    if (type == 'new'){statusId = this.formAddStatus.value.status_id;}
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/status/${type}/${statusId}`, {},{ headers }).subscribe(
      data => {
        this.reloadData();
        this.formAddStatus.reset({ status_id: ''});
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
  }

  PVlost: number = 0;
  PVheal: number = 0;
  newturn(){
    
    this.PVlost = 0;
    this.PVheal = 0;
    const statuses = this.character.statuses;

    const rollDice = (sides: number) => {
      return Math.floor(Math.random() * sides) + 1;
    };

    statuses.forEach((status: { id: number; pivot: { number: number } }) => {
      switch (status.id) {
        case 1:
          this.PVlost += status.pivot.number;
          break;
        case 2:
          switch (status.pivot.number) {
            case 1:
              this.brulureDmg = rollDice(4)
              this.PVlost += this.brulureDmg;
              break;
            case 2:
              this.brulureDmg = rollDice(6)
              this.PVlost += this.brulureDmg;
              break;
            case 3:
              this.brulureDmg = rollDice(8)
              this.PVlost += this.brulureDmg;
              break;
            case 4:
              this.brulureDmg = rollDice(10)
              this.PVlost += this.brulureDmg;
              break;
            case 5:
              this.brulureDmg = rollDice(12)
              this.PVlost += this.brulureDmg;
              break;
            default:
              break;
          }
          break;
        case 3:
          this.PVlost += status.pivot.number;
          break;
        case 10:
          this.PVheal += status.pivot.number;
          break;
        default:
          break;
      }
    });

    this.character.pv -= this.PVlost;

    let bloodNbr =0;
    const statusBlood = statuses.find((status: { id: number; pivot: { number: number } }) => status.id === 1);
    if(statusBlood && this.PVheal > 0){
      if (this.PVheal>0){
        for (let i=0;i<statusBlood.pivot.number;i++){
          
          const id = this.route.snapshot.paramMap.get('characterId');
          const token = this.cookieService.get('token');
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          });

          this.http.put(`${this.backendUrl}/character/${id}/status/minus/1`, {},{ headers }).subscribe(
            data => {},
            (error) => {
              console.error('Erreur', error);
            }
          );

          this.PVheal -=1;
          console.log(i, this.PVheal)
          if (this.PVheal == 0){i = statusBlood.pivot.number}
        };
      }
    }
    this.character.pv += this.PVheal;

    if (this.character.pv < 0){this.character.pv = 0;}

    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/pv-status/${this.character.pv}`, {}, { headers }).subscribe(
      (data: any) => {
        this.reloadData();
        this.statusRecap = true;
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
  swapStatPhysical(){this.formStatPhysical = !this.formStatPhysical; this.formStatMagic = false;}
  
  formStatMagic:boolean = false;
  swapStatMagic(){this.formStatMagic = !this.formStatMagic; this.formStatPhysical = false;}
  
  formClothe:boolean = false;
  swapClothe(){this.formClothe = !this.formClothe;}
  
  formJewelry:boolean = false;
  swapJewelry(){this.formJewelry = !this.formJewelry;}
  
  formWeapon:boolean = false;
  swapWeapon(){this.formWeapon = !this.formWeapon;}
  
  formArmor:boolean = false;
  swapArmor(){this.formArmor = !this.formArmor;}

  roundDown(value: number): number {return Math.floor(value);}

  starCount(type:string){
    if (type=='plus'){this.character.star +=1;}
    else {this.character.star -=1;}
    if (this.character.star < 0){this.character.star = 0;}

    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/star/${this.character.star}`, {},{ headers }).subscribe(
      data => {
        this.reloadData();
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
  }

  onSubmitMoney(type:string){

    if (type=='add'){this.character.money += Math.floor(this.formAddMoney.value.money);}
    else {this.character.money -= Math.floor(this.formAddMoney.value.money);}
    if (this.character.money < 0){this.character.money = 0;}

    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/money/${this.character.money}`, {},{ headers }).subscribe(
      data => {
        this.reloadData();
        this.formAddMoney.reset({ money: 0 });
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
    
  }

  qteInventory(type:string, idItem:number, addSub:string){
    
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/inventory/${type}/${idItem}/${addSub}`, {},{ headers }).subscribe(
      data => {
        this.reloadData();
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
    
  }
  onSubmitAddItem(){
    
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/add-item`,
       this.formAddItem.value, { headers }).subscribe(
      (data) => {
        this.reloadData();
        this.formAddItem.reset({ name: '', description: '' });
        
      },
      (error) => {
        console.error('Erreur', error);
      }
    );

  }
  
  onSubmitAddMaterial(){
    const idItem = this.formAddMaterial.value.material_id;
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/inventory/material/${idItem}/create`, {},{ headers }).subscribe(
      data => {
        this.reloadData();
        this.formAddMaterial.reset({ material_id: '' });
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
    
  }
  
  openNeutralSkillForm: boolean=false;
  openNeutralSkill(){
    this.openNeutralSkillForm = !this.openNeutralSkillForm;
  }
  openTreeForm: boolean=false;
  openTree(){
    this.openTreeForm = !this.openTreeForm;
  }


  
  onSkillTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const type = selectElement.value;

    // Reset the specific skill select when skillType changes
    if (type === 'neutral') {
      this.formNewNeutralSkill.get('fightSkill')?.reset(); // Use optional chaining
      this.formNewNeutralSkill.get('craftSkill')?.reset(); // Use optional chaining
    } else if (type === 'fight') {
      this.formNewNeutralSkill.get('neutralSkill')?.reset(); // Use optional chaining
      this.formNewNeutralSkill.get('craftSkill')?.reset(); // Use optional chaining
    } else if (type === 'craft') {
      this.formNewNeutralSkill.get('neutralSkill')?.reset();
      this.formNewNeutralSkill.get('fightSkill')?.reset();
    }
  }

  onSubmitNewNeutralSkill(){
    
    let skillId = "";
    if (this.formNewNeutralSkill.value.skillType == 'neutral'){
      skillId = this.formNewNeutralSkill.value.neutralSkill;
    } else if (this.formNewNeutralSkill.value.skillType == 'fight'){
      skillId = this.formNewNeutralSkill.value.fightSkill;
    } else {
      skillId = this.formNewNeutralSkill.value.craftSkill;
    };
    
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const type = this.formNewNeutralSkill.value.skillType;

    this.http.put(`${this.backendUrl}/character/${id}/add-neutral-skill/${type}/${skillId}`, {},{ headers }).subscribe(
      data => {
        console.log(data);
        this.reloadData();
        this.formNewNeutralSkill.reset({ treeType: '',neutralSkill: '',fightSkill: '',craftSkill:''});
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
  }



  onTreeTypeChange(type: string) {
    if (type === 'physical') {
      this.formNewTree.get('magicalTree')!.reset();
    } else if (type === 'magical') {
      this.formNewTree.get('physicalTree')!.reset();
    }
  }

  
  filteredPhysicalTrees:any;
  filteredMagicalTrees:any;
  filteredNeutralSkills:any;
  filteredFightSkills:any;
  filteredCraftSkills:any;
  filterCharacterTrees() {
    if (this.character && this.physicalTrees.length && this.magicalTrees.length) {
      const characterTreeIds = this.character.trees.map((tree: any) => tree.id);
      this.filteredPhysicalTrees = this.physicalTrees.filter(tree => !characterTreeIds.includes(tree.id));
      this.filteredMagicalTrees = this.magicalTrees.filter(tree => !characterTreeIds.includes(tree.id));
    }
    if (this.character && this.neutralSkills.length && this.fightSkills.length && this.craftSkills.length) {
      const characterNeutralSkillIds = this.character.neutral_skills.map((skill: any) => skill.id);
      const characterFightSkillIds = this.character.fight_skills.map((skill: any) => skill.id);
      const characterCraftSkillIds = this.character.craft_skills.map((skill: any) => skill.id);

      this.filteredNeutralSkills = this.neutralSkills.filter(skill => !characterNeutralSkillIds.includes(skill.id));
      this.filteredFightSkills = this.fightSkills.filter(skill => !characterFightSkillIds.includes(skill.id));
      this.filteredCraftSkills = this.craftSkills.filter(skill => !characterCraftSkillIds.includes(skill.id));
    }
 
  }
  onSubmitNewTree(){

    let treeId = "";
    if (this.formNewTree.value.treeType == 'physical'){
      treeId = this.formNewTree.value.physicalTree;
    } else {
      treeId = this.formNewTree.value.magicalTree;
    };

    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/add-tree/${treeId}`, {},{ headers }).subscribe(
      data => {
        this.reloadData();
        this.formNewTree.reset({ treeType: '',magicalTree: '',physicalTree: ''});
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
    
    
  }

}
