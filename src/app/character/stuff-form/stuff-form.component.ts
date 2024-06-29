import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { ReloadDataService } from '../../services/reload-data.service';


@Component({
  selector: 'app-stuff-form',
  templateUrl: './stuff-form.component.html',
  styleUrl: './stuff-form.component.scss'
})
export class StuffFormComponent {

  formCharacter: FormGroup;  
  
  @Input() character: any; 
  @Input() type: any; 
  @Output() formSubmitted = new EventEmitter<void>();
  
  constructor(
    private reloadDataService: ReloadDataService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
    this.formCharacter = this.fb.group({
      weapon_name: ['', Validators.required],
      weapon_description: ['', Validators.required],
      armor_name: ['', Validators.required],
      armor_description: ['', Validators.required],
      clothe1_name: ['', Validators.required],
      clothe1_description: ['', Validators.required],
      ornament1_name: ['', Validators.required],
      ornament1_description: ['', Validators.required],
      clothe2_name: ['', Validators.required],
      clothe2_description: ['', Validators.required],
      ornament2_name: ['', Validators.required],
      ornament2_description: ['', Validators.required],
      jewelry1_name: ['', Validators.required],
      jewelry1_description: ['', Validators.required],
      stone1_name: ['', Validators.required],
      stone1_description: ['', Validators.required],
      jewelry2_name: ['', Validators.required],
      jewelry2_description: ['', Validators.required],
      stone2_name: ['', Validators.required],
      stone2_description: ['', Validators.required],
    });
  }

  backendUrl = environment.backendUrl;

  onSubmitCharacter(){
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/stuff`,
       this.formCharacter.value, { headers }).subscribe(
      (data) => {
        this.reloadDataService.triggerReload();
        this.formSubmitted.emit();
      },
      (error) => {
        console.error('Erreur', error);
      }
    );

  }
}
