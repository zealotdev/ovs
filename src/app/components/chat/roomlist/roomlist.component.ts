import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';

export const snapshotToArr = (snapshot: any) => {
  const returnArr = [];
  snapshot.forEach((snap) => {
    var item = snap.val();
    item.key = snap.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss'],
})
export class RoomlistComponent implements OnInit {
  nickname = '';
  displayedColumns: string[] = ['roomname'];
  isLoading: boolean = true;
  rooms;
  constructor(private _router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.nickname = localStorage.getItem('nickname');
    firebase
      .database()
      .ref('chatData/rooms')
      .on('value', (snapshot) => {
        this.rooms = snapshotToArr(snapshot);
      });
  }

  enterChatRoom(roomname: string) {
    // const chat = {
    //   roomname: '',
    //   nickname: '',
    //   message: '',
    //   date: '',
    //   type: '',
    // };
    // chat.roomname = roomname;
    // chat.nickname = this.nickname;
    // chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    // chat.message = `${this.nickname} joined`;
    // chat.type = 'join';
    // const newMessage = firebase.database().ref('chatData/chats/').push();
    // newMessage.set(chat);

    // firebase
    //   .database()
    //   .ref('chatData/roomusers/')
    //   .orderByChild('roomname')
    //   .equalTo(roomname)
    //   .once('value', (snapshot) => {
    //     let roomuser = [];
    //     roomuser = snapshotToArr(snapshot);
    //     const user = roomuser.find((user) => user.nickname === this.nickname);
    //     if (user !== undefined) {
    //       const userRef = firebase
    //         .database()
    //         .ref('chatData/roomusers/' + user.key);
    //       userRef.update({ status: 'online' });
    //     } else {
    //       const newRoomUser = firebase
    //         .database()
    //         .ref('chatData/roomusers/')
    //         .push();
    //       newRoomUser.set({
    //         roomname: roomname,
    //         nickname: this.nickname,
    //         status: 'online',
    //       });
    //     }
    //   });
    this._router.navigate(['chat/chatroom', roomname]);
  }

  logOut(): void {
    localStorage.removeItem('nickname');
    this._router.navigate(['/chat/login']);
  }
}
