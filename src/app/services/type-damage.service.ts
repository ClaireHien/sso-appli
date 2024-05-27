import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeDamageService {

  private apiUrl = environment.backendUrl + '/type-damage';

  constructor(private http: HttpClient) { }

  getTypeDamages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
