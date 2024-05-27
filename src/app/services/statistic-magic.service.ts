import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticMagicService {

  private apiUrl = environment.backendUrl + '/statistic-magic';

  constructor(private http: HttpClient) { }

  getStatisticMagics(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
