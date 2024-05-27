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
        // Logique pour afficher les composants pour /path1
        break;
      case '/path2':
        // Logique pour afficher les composants pour /path2
        break;
      // Ajoutez d'autres cas selon vos besoins
      default:
        // Logique par défaut ou pour d'autres chemins
    }
  }
}
