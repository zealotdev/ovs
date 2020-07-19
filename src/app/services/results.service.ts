import { Injectable, OnInit } from '@angular/core';
import { chartData } from '../interfaces/chart-data';
import { ELECTIONS } from '../data/results-mock-data';
import { Observable, of } from 'rxjs';
import { Election } from '../interfaces/election';

@Injectable({
  providedIn: 'root',
})
export class resultService implements OnInit {
  private _chartData = [];
  private _candidateObj = {
    data: [],
    label: '',
  };

  private candidates = [];

  constructor() {}

  getElectionData(): Observable<any[]> {
    return of(ELECTIONS);
  }
  ngOnInit() {
    // this.getResults(1);
  }
}
