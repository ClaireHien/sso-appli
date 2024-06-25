import { Component, OnInit, HostListener  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReloadDataService } from '../services/reload-data.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  reloadDataSubscription!: Subscription;
  
  formAddXp: FormGroup;  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private reloadDataService: ReloadDataService
  ) {
    this.formAddXp = this.fb.group({
      xp: ['0', Validators.required]
    });
  }

  character: any;

  backendUrl = environment.backendUrl;
  createdByUser:boolean = false;
  
  ngOnInit(){
    this.reloadDataSubscription = this.reloadDataService.reloadData$.subscribe(() => {
      this.reloadData();
    });
  }
  ngOnDestroy(): void {
    this.reloadDataSubscription.unsubscribe();
  }

  reloadData(){
    const userId = this.cookieService.get('userId');
    this.http.get(`${this.backendUrl}/character/${this.route.snapshot.paramMap.get('characterId')}`,{ headers: new HttpHeaders({ 'Authorization': `Bearer ${this.cookieService.get('token')}` }) }).subscribe(
      data => {
        this.character = data;
        console.log(this.character)
        if (Number(this.cookieService.get('userId')) === this.character.user_id ){ this.createdByUser = true;}
      },
      error => {
        console.error('Erreur', error);
      }
    );
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
  
}
