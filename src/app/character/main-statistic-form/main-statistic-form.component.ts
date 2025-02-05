import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { ReloadDataService } from '../../services/reload-data.service';

@Component({
  selector: 'app-main-statistic-form',
  templateUrl: './main-statistic-form.component.html',
  styleUrl: './main-statistic-form.component.scss'
})
export class MainStatisticFormComponent {

  formCharacter: FormGroup;  
  
  @Input() character: any; 
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
      pv_max: ['', Validators.required],
      pv_bonus: ['', Validators.required],
      pe_max: ['', Validators.required],
      pe_bonus: ['', Validators.required],
      pt_max: ['', Validators.required],
      pt_bonus: ['', Validators.required],
      rp: ['', Validators.required],
      rp_bonus: ['', Validators.required],
      rm: ['', Validators.required],
      rm_bonus: ['', Validators.required],
      speed: ['', Validators.required],
      speed_bonus: ['', Validators.required],
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

    this.http.put(`${this.backendUrl}/character/${id}/main-stat`,
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
