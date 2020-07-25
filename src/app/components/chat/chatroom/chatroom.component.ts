import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  @ViewChild('chatContent') chatContent: ElementRef;
  nickname = '';
  roomname = '';
  message = '';
  users = [];
  chats = [];
  messageForm: FormGroup;
  // scrollTop: number = null;

  constructor(
    private _router: Router,
    private datePipe: DatePipe,
    private _aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.nickname = localStorage.getItem('nickname');
    this.roomname = this._aRoute.snapshot.params.roomname;

    this.messageForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });

    firebase
      .database()
      .ref('chatData/chats/')
      .on('value', (snapshot) => {
        this.chats = [];
        this.chats = snapshotToArr(snapshot);
        console.log(this.chats);
      });

    firebase
      .database()
      .ref('chatData/roomusers/')
      .orderByChild('roomname')
      .equalTo(this.roomname)
      .on('value', (snapshot) => {
        const roomusers = snapshotToArr(snapshot);
        this.users = roomusers.filter((user) => user.status === 'online');
      });
  }

  onSend() {
    this.message = this.messageForm.value.message;

    const chat = {
      roomname: '',
      nickname: '',
      message: '',
      date: '',
      type: '',
    };

    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    chat.message = this.message;

    const newMessage = firebase.database().ref('chatData/chats/').push();
    newMessage.set(chat);

    this.messageForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });
  }

  exitChatRoom() {
    const chat = {
      roomname: '',
      nickname: '',
      message: '',
      date: '',
      type: '',
    };
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.nickname} leave the room`;
    chat.type = 'exit';
    const newMessage = firebase.database().ref('chatData/chats/').push();
    newMessage.set(chat);

    firebase
      .database()
      .ref('chatData/roomusers/')
      .orderByChild('roomname')
      .equalTo(this.roomname)
      .once('value', (snapshot) => {
        let roomuser = [];
        roomuser = snapshotToArr(snapshot);
        const user = roomuser.find((usr) => usr.nickname === this.nickname);

        if (user !== undefined) {
          const userRef = firebase
            .database()
            .ref('chatData/roomusers/' + user.key);
          userRef.update({ status: 'offline' });
        }
      });

    this._router.navigate(['/chat/roomlist']);
  }
}
