import { Component, OnInit, HostListener  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
  }

  backendUrl = environment.backendUrl;
  character: any[] = [];

  themes: any[] = [];
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.reloadData();
    });

  };

  worlds:any;
  
  reloadData(){
    this.http.get(`${this.backendUrl}/world`).subscribe(
      data => {
        this.worlds = data;
      },
      error => {
        console.error('Erreur', error);
      }
    );
  }

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-');
  }

}
