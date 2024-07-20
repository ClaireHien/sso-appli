import { Component, OnInit, HostListener  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MagicTreeService } from '../services/magic-tree.service';
import { WeaponTreeService } from '../services/weapon-tree.service';
import { Subscription } from 'rxjs';

interface CharacterResponse {
  characterId?: number;
  characterName: string;
}
interface Group {
  id: number;
  name: string;
  world_id: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  formCharacter: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private magicTreeService: MagicTreeService,
    private weaponTreeService: WeaponTreeService,
  ) {
    this.formCharacter = this.fb.group({
      name: ['', Validators.required],
      weapon_id: ['', Validators.required],
      magic_id: ['', Validators.required],
      group_id: ['', Validators.required],
      spirit_id: ['', Validators.required]
    });
  }

  backendUrl = environment.backendUrl;
  character: any[] = [];
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.reloadData();
    });

  };

  user:any;
  weapons:any;
  magics:any;
  
  reloadData(){
    this.loadGroups();
    const userId = this.cookieService.get('userId');
    this.http.get(`${this.backendUrl}/user/${userId}`,{ headers: new HttpHeaders({ 'Authorization': `Bearer ${this.cookieService.get('token')}` }) }).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Erreur', error);
      }
    );
    
    this.magicTreeService.getMagics().subscribe(
      (data) => {
        this.magics = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error fetching magic trees', error);
      }
    );
    this.weaponTreeService.getWeapons().subscribe(
      (data) => {
        this.weapons = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.error('Error fetching weapon trees', error);
      }
    );

  }

  popupCharacter:boolean = false;
  popNewCharacter(){
    this.popupCharacter = !this.popupCharacter;
  }

  groups:any;
  loadGroups(): void {
    this.http.get(`${environment.backendUrl}/groups`).subscribe(
      (data) => {
        this.groups = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des groupes :', error);
      }
    );
  }

  spiritVisible:boolean = false;
  spirits:any;

  onGroupChange(): void {
    const selectedGroup = this.groups.find((group:Group) => group.id == this.formCharacter.value.group_id);

    const worldId = selectedGroup.world_id;

    this.http.get<any[]>(`${environment.backendUrl}/spirits/${worldId}`).subscribe(
      (spiritsData) => {
        this.spirits = spiritsData;
      },
      (error) => {
        console.error('Erreur lors du chargement des esprits :', error);
      }
    );
    this.spiritVisible = true;
  }

  buttonCreateVisible: boolean = false;
  onButtonnCreateVisible(){
    this.buttonCreateVisible = true;
  }

  invalidCredentialsErrorRegister:boolean = false;
  onSubmitCharacter(){

    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const userId = this.cookieService.get('userId');
    this.http.post<CharacterResponse>(`${this.backendUrl}/character/${userId}`,
       this.formCharacter.value, { headers }).subscribe(
      (data: CharacterResponse) => {
        console.log(data);
        if (data.characterId && data.characterName) {
        this.router.navigate([`/personnage/${data.characterId}/${this.slugify(data.characterName)}`], { state: { message: 'Création de personnage réussie' } });
        };
      },
      (error) => {
        console.error('Erreur lors de l\'inscription :', error);
        this.invalidCredentialsErrorRegister = true;
      }
    );
  }



  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-');
  }

}
