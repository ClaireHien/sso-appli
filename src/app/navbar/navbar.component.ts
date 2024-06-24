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
  
  isAuthenticated: boolean = false;
  ngOnInit(): void {
    this.name = this.cookieService.get('userName'); 
    
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.updateUserData();
      }
    });
  }

  backendUrl = environment.backendUrl;

  toggleTheme() {
    this.darkmodeService.toggleTheme();
  }
  isMenuVisible: boolean = false;
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  
  profile():void{
    const userId = this.cookieService.get('userId');
    const userName = this.cookieService.get('userName');
    this.router.navigate([`/profil/${userId}/${this.slugify(userName)}`]);
  }
  
  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-');
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

  
  //liste des perso
  userData: any; 
  updateUserData(): void {
    const token = this.cookieService.get('token');
    const tokenId = this.cookieService.get('userId');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.get(`${this.backendUrl}/user/${tokenId}`, { headers }).subscribe(
      data => {
        this.userData = data;
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    );

  }

  redirectToCharacter(id:number,name:string){
    this.router.navigate([`/personnage/${id}/${this.slugify(name)}`]);
  }
  
  //inscription
  
  errorCode: boolean = false;
  invalidCredentialsErrorRegister: boolean = false;

  onSubmitRegister(): void {
    
    const code = this.formRegister.get('code')?.value;

    if (code === 'Feuille'){

      if (this.formRegister.valid) {
        this.http.post<LoginResponse>(`${this.backendUrl}/register`, this.formRegister.value).subscribe(
          (data: LoginResponse) => {
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
            this.loginVisible = false;
            this.router.navigate([`/profil/${data.userId}/${data.userName}`]);
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
