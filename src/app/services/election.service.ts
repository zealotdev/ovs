import { Injectable, OnInit } from '@angular/core';
import { ELECTIONS } from '../data/results-mock-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class electionDataService implements OnInit {
  constructor() {}

  getElectionData(): Observable<any[]> {
    return of(ELECTIONS);
  }
  ngOnInit() {}
}
