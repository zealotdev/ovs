import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArr } from 'src/app/components/chat/chatroom/chatroom.component';

@Component({
  selector: 'app-election-type',
  templateUrl: './election-type.component.html',
  styleUrls: ['./election-type.component.scss'],
})
export class ElectionTypeComponent implements OnInit {
  public elections = [];
  @Output() selectedElection = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {
    firebase
      .database()
      .ref('electionList')
      .on('value', (snapshot) => {
        this.elections = [];
        let electionData = snapshotToArr(snapshot);
        electionData.forEach((el) => {
          this.elections.push(el);
        });
      });
  }

  selectedEl(key: number): void {
    this.selectedElection.emit(key);
  }
}
