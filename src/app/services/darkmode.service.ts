import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private isDarkTheme: boolean = false;

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.saveTheme();
    this.applyTheme();
  }

  isThemeDark(): boolean {
    return this.isDarkTheme;
  }

  private loadTheme() {
    if (this.isBrowser()) {
      const savedTheme = localStorage.getItem('isDarkTheme');
      this.isDarkTheme = savedTheme !== null ? JSON.parse(savedTheme) : false;
      this.applyTheme();
    } else {
      this.isDarkTheme = false;
    }
  }

  private saveTheme() {
    if (this.isBrowser()) {
      localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme));
    }
  }

  private applyTheme() {
    if (this.isBrowser()) {
      const body = document.body;
      if (this.isDarkTheme) {
        body.classList.add('darkmode');
        body.classList.remove('lightmode');
      } else {
        body.classList.add('lightmode');
        body.classList.remove('darkmode');
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
