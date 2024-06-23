import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../services/darkmode.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service'

interface LoginResponse {
  token?: string;
  userId?: number;
  userName: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  
  name: string | null = null;
  formLogin: FormGroup;  
  formRegister: FormGroup;  

  constructor(
    private darkmodeService: DarkmodeService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
    this.formLogin = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      code: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.name = this.cookieService.get('userName'); 
  }

  backendUrl = environment.backendUrl;

  toggleTheme() {
    this.darkmodeService.toggleTheme();
  }

  isMenuVisible: boolean = false;
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  //connexion
  

  loginVisible: boolean = false;
  login(){
    this.loginVisible = !this.loginVisible;
    this.registerVisible = false;
  }
  
  registerVisible: boolean = false;
  register(){
    this.registerVisible = !this.registerVisible;
    this.loginVisible = false;
  }
  
  isLoggedIn(): boolean {
    return this.authService.isAuthenticatedUser();
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  
  //inscription
  
  errorCode: boolean = false;
  invalidCredentialsErrorRegister: boolean = false;

  onSubmitRegister(): void {
    
    const code = this.formRegister.get('code')?.value;

    if (code === 'NomNom'){

      if (this.formRegister.valid) {
        this.http.post<LoginResponse>(`${this.backendUrl}/register`, this.formRegister.value).subscribe(
          (data: LoginResponse) => {
            console.log(data);
            this.router.navigate(['/message'], { state: { message: 'Inscription réussie' } });
            this.registerVisible = false;
            this.loginVisible = true;
          },
          (error) => {
            console.error('Erreur lors de l\'inscription :', error);
            this.invalidCredentialsErrorRegister = true;
          }
        );
      } else {
        // Marquer les champs comme touchés pour afficher les messages d'erreur
        this.formRegister.markAllAsTouched();
      }

    } else {
      this.errorCode = true;
    }
  }


  //connexion
  
  invalidCredentialsErrorLogin: boolean = false;
  
  onSubmitLogin(): void {
    if (this.formLogin.valid) {
      this.http.post<LoginResponse>(`${this.backendUrl}/login`, this.formLogin.value).subscribe(
        (data: LoginResponse) => {
          if (data.token && data.userId) {
            this.authService.login(data.token, data.userId, data.userName);
            this.name = this.cookieService.get('userName');
            this.loginVisible = false;
            this.router.navigate(['/']);
          } else {
            this.invalidCredentialsErrorLogin = true;
            console.error('Token non trouvé dans la réponse du backend.');
          }
        },
        (error) => {
          this.invalidCredentialsErrorLogin = true;
          console.error('Erreur lors de la connexion :', error);
          console.log(JSON.stringify(error));
        }
      );
    } else {
      this.formLogin.markAllAsTouched();
    }
  }
  
  


}
