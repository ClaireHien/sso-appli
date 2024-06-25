import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadDataService {
  private reloadDataSubject = new BehaviorSubject<boolean>(false);

  reloadData$ = this.reloadDataSubject.asObservable();

  constructor() {}

  triggerReload() {
    this.reloadDataSubject.next(true);
  }
}
