import { Injectable, OnInit } from '@angular/core';
import { Result } from '../interfaces/result';
import { RESULTS, ELECTIONS } from '../data/results-mock-data';
import { Observable, of } from 'rxjs';
import { Election } from '../interfaces/election';

@Injectable({
  providedIn: 'root',
})
export class resultService implements OnInit {
  constructor() {}

  getResults(): Observable<Result[]> {
    return of(RESULTS);
  }
  getElectionData(): Observable<any[]> {
    return of(ELECTIONS);
  }
  ngOnInit() {}
}
