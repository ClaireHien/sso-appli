import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { ReloadDataService } from '../../services/reload-data.service';

@Component({
  selector: 'app-spirit',
  templateUrl: './spirit.component.html',
  styleUrl: './spirit.component.scss'
})
export class SpiritComponent {

  
  @Input() character: any; 
  @Input() createdByUser: any; 
  
  constructor(
    private reloadDataService: ReloadDataService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
  }



  backendUrl = environment.backendUrl;

  qteAff(type:string){
    if (type == "add"){
      this.character.affinity += 1;
    } else {
      this.character.affinity -= 1;
    }

    
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const aff = this.character.affinity;

    this.http.put(`${this.backendUrl}/character/${id}/update-aff/${aff}`, {},{ headers }).subscribe(
      (data) => {
        console.log("ok")
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
    
  }
  
}
