import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = environment.backendUrl + '/status';

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
