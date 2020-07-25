import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ElectionInfo } from '../interfaces/election-data';

@Injectable({
  providedIn: 'root',
})
export class firebaseDataService implements OnInit {
  electionInfo: ElectionInfo;
  dbRef = firebase.database();
  constructor() {}
  getElectionInfo(): Observable<ElectionInfo> {
    this.dbRef.ref('electionData/electionList').once('value', (snap) => {
      this.electionInfo.id = snap.val()[0].id;
      this.electionInfo.title = snap.val()[0].electionType;
      console.log(snap.val());
    });
    return of(this.electionInfo);
  }
  ngOnInit() {}
}
