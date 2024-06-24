import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.scss'
})
export class MessagePageComponent {
  
  message: string;
  subtext: string = "";

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { message: string };
    this.message = state?.message || 'Il se passe quelque chose ?';
  }

  ngOnInit(): void {
    if (this.message = "Inscription réussie"){
      this.subtext = "Il ne te reste plus qu'à te connecter !"
    }

  }

}
