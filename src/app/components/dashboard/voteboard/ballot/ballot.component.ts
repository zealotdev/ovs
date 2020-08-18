import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BallotModalComponent } from './ballot-shared/ballot-modal.component';

import * as firebase from 'firebase';

export const snapToCandArr = (snapshot: any) => {
  var arr = [];
  snapshot.forEach((snap) => {
    let candObj = snap.val();
    candObj.key = snap.key;

    arr.push(candObj);
  });
  return arr;
};

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss'],
})
export class BallotComponent implements OnInit {
  elections = [];
  electionType: string;
  candidatesObj;
  candidateName: string;
  candidateObj;
  electionID: number;
  dbRef = firebase.database();
  disabled: boolean = true;
  selected: boolean = false;
  electionKey: string | number;

  constructor(private matDialog: MatDialog) {}

  ngOnInit() {
    this.dbRef.ref('electionList/').once('value', (snapshot) => {
      let electionSnapArr = snapToCandArr(snapshot);
      this.elections = [];
      electionSnapArr.forEach((election) => {
        if (election.active) {
          this.elections.push(election);
        }
      });
      this.onSelection(this.elections[0].key);
    });

    this.electionKey = undefined;
  }
  onSelection(key: string | number) {
    this.selected = false;
    this.disabled = true;
    this.electionKey = key;

    this.candidateName = '';
    if (key != 0) {
      this.dbRef.ref(`electionList/${key}`).once('value', (snapshot) => {
        this.candidatesObj = snapToCandArr(snapshot.child('candidates'));
        this.electionID = snapshot.val().id;
        this.electionType = snapshot.val().electionType;
      });
    } else {
      // Fallback
      this.dbRef.ref('electionList/0').once('value', (snapshot) => {
        this.candidatesObj = snapToCandArr(snapshot.child('candidates'));
        this.electionID = snapshot.val().id;
        this.electionType = snapshot.val().electionType;
      });
    }
  }

  onSelect(candidate) {
    this.candidateObj = candidate;
    this.candidateName = candidate.name;
    this.disabled = false;
    this.selected = true;
  }

  onVote() {
    if (this.selected) {
      const candidateObject = {
        for: 'vote',
        candidateObject: {
          electionKey: this.electionKey,
          electionID: this.electionID,
          electionType: this.electionType,
          candidateID: this.candidateObj.key,
          candidateName: this.candidateObj.name,
        },
      };

      this.openDialog(candidateObject);
    } else {
      console.log('select a candidate to vote');
    }
  }

  showProfile(id) {
    const profile = this.candidatesObj.find((el) => el.id === id);
    var candidateProfile = {
      for: 'profile',
      profile: profile,
    };
    this.openDialog(candidateProfile, 'no-padding-dialog');
  }

  openDialog(data, config?) {
    if (config) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = config;
      dialogConfig.data = data;

      this.matDialog.open(BallotModalComponent, dialogConfig);
    } else {
      this.matDialog.open(BallotModalComponent, {
        data: data,
      });
    }
  }
}
