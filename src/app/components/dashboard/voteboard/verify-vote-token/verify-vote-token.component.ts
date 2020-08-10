import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArr } from 'src/app/components/chat/chatroom/chatroom.component';

export const snapTokenToArray = (snapshot) => {
  let tokenArray = [];
  snapshot.forEach((snap) => {
    let tokenObj = {
      key: '',
      token: '',
    };
    tokenObj.key = snap.key;
    tokenObj.token = snap.val();

    tokenArray.push(tokenObj);
  });

  return tokenArray;
};
@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-vote-token.component.html',
  styleUrls: ['./verify-vote-token.component.scss'],
})
export class VerifyTokenComponent implements OnInit {
  verCode: string = 'mama';
  error: boolean = false;
  input: string;
  @Output() codeVerified = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  verify(token: string): void {
    token = token.toUpperCase();
    (async () => {
      try {
        const snapShot = await firebase
          .database()
          .ref(`tokens/${token}`)
          .once('value');

        if (snapShot.exists()) {
          this.codeVerified.emit(true);
        } else {
          this.codeVerified.emit(false);
          this.error = true;
        }
      } catch (err) {
        console.log('Error');
      }
    })();
  }
}
