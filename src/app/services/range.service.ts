import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RangeService {

  private apiUrl = environment.backendUrl + '/range';

  constructor(private http: HttpClient) { }

  getRanges(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
