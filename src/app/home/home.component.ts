import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  currentPath: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentPath = this.router.url;
    this.showComponentsBasedOnPath();
  }
  
  showComponentsBasedOnPath(): void {
    switch (this.currentPath) {
      case '/path1':
        break;
      case '/path2':
        break;
      default:
    }
  }
}
