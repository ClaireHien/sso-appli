import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FightSkillService {

  private apiUrl = environment.backendUrl + '/fight';

  constructor(private http: HttpClient) { }

  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
