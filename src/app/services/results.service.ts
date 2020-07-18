import { Injectable, OnInit } from '@angular/core';
import { Result } from '../interfaces/result';
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

  getResults(id: number): Observable<chartData[]> {
    ELECTIONS.forEach((electionObj) => {
      this.candidates = electionObj.id == id ? electionObj.candidates : [];
      if (this.candidates.length > 0) {
        this.candidates.forEach((candidate) => {
          this._candidateObj = {
            data: [candidate.votes],
            label: candidate.name,
          };
          this._chartData.push(this._candidateObj);
        });
      }
    });

    return of(this._chartData);
  }
  getElectionData(): Observable<any[]> {
    return of(ELECTIONS);
  }
  ngOnInit() {
    // this.getResults(1);
  }
}
