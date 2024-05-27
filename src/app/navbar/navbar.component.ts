import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../services/darkmode.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    private darkmodeService: DarkmodeService,
    private router: Router,
    private http: HttpClient,
  ) {}

  toggleTheme() {
    this.darkmodeService.toggleTheme();
  }


}
