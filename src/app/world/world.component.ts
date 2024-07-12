import { Component, OnInit, HostListener  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})
export class WorldComponent  implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
  }

  backendUrl = environment.backendUrl;

  currentSection = 0;
  isScrolling = false;  // Variable pour éviter les scrolls multiples

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {

    if (!this.isScrolling) {

      if (event.deltaY > 0) {
        this.scrollToSection(this.currentSection + 1);
      } else if (event.deltaY < 0) {
        this.scrollToSection(this.currentSection - 1);
      }

      this.isScrolling = true;
      setTimeout(() => {
        this.isScrolling = false;
      }, 500); // Temps d'attente avant de permettre un autre scroll
    }

  }

  scrollToSection(index: number) {

    if (index >= 0 && index < this.worlds.length+1) {
      this.currentSection = index;
      for (let i = 0; i < this.worlds.length+1; i++) {
        const sectionElement = document.getElementById('world-section');
        if (sectionElement) {
          sectionElement.style.top = `-${(this.currentSection) * 100}vh`;
        }
      }
    }
    
  }

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

  
  toggleList(world: any): void {
    world.showList = !world.showList;
  }

}
