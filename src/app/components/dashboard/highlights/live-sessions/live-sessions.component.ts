import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.scss'],
})
export class LiveSessionComponent implements OnInit {
  electionCount: number = 0;
  constructor() {}
  ngOnInit() {
    firebase
      .database()
      .ref('electionList')
      .on('value', (snapshot) => {
        this.electionCount = 0;
        snapshot.forEach((snap) => {
          if (snap.val().active) {
            this.electionCount += 1;
          }
        });
      });
  }
}
