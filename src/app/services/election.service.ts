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

  vote(electionID: number, candidateID: number) {
    var candidates = ELECTIONS.find((election) => election.id == electionID)
      .candidates;

    var candToBeVoted = candidates.find((cand) => cand.id == candidateID);
    candToBeVoted.votes += 100;
  }
  ngOnInit() {}

  // TODO update chart data on vote
}
