import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = environment.backendUrl + '/material';

  constructor(private http: HttpClient) { }

  getMaterials(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
