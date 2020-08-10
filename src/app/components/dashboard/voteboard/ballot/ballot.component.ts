import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BallotModalComponent } from './ballot-shared/ballot-modal.component';

import * as firebase from 'firebase';
import { snapshotToArr } from 'src/app/components/chat/chatroom/chatroom.component';

export const electionSnapshotToArr = (snapshot: any) => {
  var arr = [];
  snapshot.forEach((snap) => {
    var item = snap.val();
    arr.push(item);
  });
  return arr;
};

export const snapToCandArrOne = (snapshot: any) => {
  var arr = [];
  snapshot.forEach((snap) => {
    let candObj = snap.val();
    candObj.key = snap.key;

    arr.push(candObj);
  });
  return arr;
};
export const snapToCandArrTwo = (element: any) => {
  var arr = [];
  for (let i = 0; i < element.length; i++) {
    let candObj = element;
    candObj.key = i;

    arr.push(candObj);
  }
  return arr;
};
@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss'],
})
export class BallotComponent implements OnInit {
  elections = [{}];
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
      this.elections = snapshot.val();
      this.elections = snapToCandArrOne(snapshot);
    });

    this.electionKey = undefined;
    this.onSelection(0);
  }
  onSelection(id: string | number) {
    this.selected = false;
    this.disabled = true;
    this.electionKey = id;

    this.candidateName = '';
    if (id != 0) {
      this.dbRef.ref(`electionList/${id}`).once('value', (snapshot) => {
        this.candidatesObj = snapToCandArrOne(snapshot.child('candidates'));
        this.electionID = snapshot.val().id;
        this.electionType = snapshot.val().electionType;
      });
    } else {
      this.dbRef.ref('electionList/0').once('value', (snapshot) => {
        this.candidatesObj = snapToCandArrOne(snapshot.child('candidates'));
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
