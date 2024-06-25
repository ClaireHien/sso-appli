import { Component, OnInit, HostListener  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
  }

  character: any;

  backendUrl = environment.backendUrl;
  createdByUser:boolean = false;
  
  ngOnInit(){
    this.reloadData();
  }

  reloadData(){
    const userId = this.cookieService.get('userId');
    this.http.get(`${this.backendUrl}/character/${this.route.snapshot.paramMap.get('characterId')}`,{ headers: new HttpHeaders({ 'Authorization': `Bearer ${this.cookieService.get('token')}` }) }).subscribe(
      data => {
        this.character = data;
        console.log(this.character)
        if (this.cookieService.get('userId') === this.character.user_id ){ this.createdByUser = true;}
      },
      error => {
        console.error('Erreur', error);
      }
    );
  }

  globalForm:boolean = false;
  swapGlobal(){
    this.globalForm = !this.globalForm;
  }
}
