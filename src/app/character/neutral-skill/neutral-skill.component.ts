import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { ReloadDataService } from '../../services/reload-data.service';

@Component({
  selector: 'app-neutral-skill',
  templateUrl: './neutral-skill.component.html',
  styleUrl: './neutral-skill.component.scss'
})
export class NeutralSkillComponent implements OnInit {

  @Input() skill: any; 
  @Input() character: any; 
  @Input() type: any; 
  @Input() createdByUser: any; 

  constructor(
    private reloadDataService: ReloadDataService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }


  backendUrl = environment.backendUrl;

  unlockUpgrade(idSkill:number){
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/upgrade-fight/${idSkill}`, {}, { headers }).subscribe(
      (data) => {
        this.reloadDataService.triggerReload();
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
  }

  
}
