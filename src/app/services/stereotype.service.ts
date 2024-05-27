import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StereotypeService {

  private apiUrl = environment.backendUrl + '/stereotype';

  constructor(private http: HttpClient) { }

  getStereotypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
