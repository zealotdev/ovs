import { Component, OnInit } from '@angular/core';
import { electionDataService } from 'src/app/services/election.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import * as firebase from 'firebase';

export const electionSnapshotToArr = (snapshot: any) => {
  var arr = [];
  snapshot.forEach((snap) => {
    var item = snap.val();
    arr.push(item);
  });
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
  candidates;
  candidateName: string;
  candObj;
  electionID: number;
  dbRef = firebase.database();

  constructor(
    private _electionDataService: electionDataService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.dbRef.ref('electionList/').once('value', (snapshot) => {
      this.elections = snapshot.val();
    });

    this.onSelection(0);
  }
  onSelection(id: number) {
    this.candidateName = '';
    if (id != 0) {
      this.electionID = id;
      this.dbRef.ref('electionList').once('value', (snapshot) => {
        var electionsArray = electionSnapshotToArr(snapshot);
        var selectedEl = electionsArray.find((el) => el.id == id);

        this.candidates = selectedEl.candidates;
        this.electionID = selectedEl.id;
        this.electionType = selectedEl.electionType;
      });
    } else {
      this.dbRef.ref('electionList/0').once('value', (snapshot) => {
        this.candidates = snapshot.val().candidates;
        this.electionID = snapshot.val().id;
        this.electionType = snapshot.val().electionType;
      });
    }
  }
  onSelect(cand) {
    this.candObj = cand;
    this.candidateName = cand.name;
  }
  onVote() {
    console.log(this.electionID, this.electionType, this.candObj);
  }
  showProfile(id) {
    var candProfile = this.candidates.find((el) => el.id === id);
    this.matDialog.open(ProfileComponent, {
      disableClose: true,
      panelClass: 'no-padding-dialog',
      data: candProfile,
    });
  }
}
