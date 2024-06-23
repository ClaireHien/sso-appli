import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'token';
  private userIdKey: string = 'userId';
  private userNameKey: string = 'userName';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private cookieService: CookieService) {
    // Vérifiez si le token est déjà présent dans les cookies lors de l'initialisation du service
    this.isAuthenticated = !!this.cookieService.get(this.tokenKey);
  }

  login(token: string, userId: number, userName: string) {
    // Sauvegardez le token dans les cookies
    this.cookieService.set(this.tokenKey, token, { expires: 30 });
    this.cookieService.set(this.userIdKey, userId.toString(), { expires: 30 });
    this.cookieService.set(this.userNameKey, userName, { expires: 30 });
    // Mettez à jour l'état d'authentification
    this.isAuthenticated = true;
  }

  logout() {
    // Supprimez le token des cookies
    this.cookieService.delete(this.tokenKey);
    this.cookieService.delete(this.userIdKey);
    this.cookieService.delete(this.userNameKey);
    // Mettez à jour l'état d'authentification
    this.isAuthenticated = false;
  }
  isAuthenticatedUser(): boolean {
    // Renvoie l'état d'authentification actuel
    return this.isAuthenticated;
  }
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  set isAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }
}