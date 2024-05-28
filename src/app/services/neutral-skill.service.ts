import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeutralSkillService {

  constructor(private http: HttpClient) {}

  backendUrl = environment.backendUrl;
  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/neutral`);
  };
}
