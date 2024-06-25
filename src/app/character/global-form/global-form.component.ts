import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-global-form',
  templateUrl: './global-form.component.html',
  styleUrl: './global-form.component.scss'
})
export class GlobalFormComponent {

  formCharacter: FormGroup;  
  
  @Input() character: any; 
  
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
    this.formCharacter = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  onSubmitCharacter(){
    console.log(this.formCharacter);
  }
}
