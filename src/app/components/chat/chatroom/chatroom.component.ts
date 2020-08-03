import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  AfterViewChecked,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

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
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContent') chatContent: ElementRef;
  nickname = '';
  @Input() roomname;
  @Input() createdBy;
  @Output() exitRoom = new EventEmitter<boolean>();
  message = '';
  users = [];
  chats = [];
  messageForm: FormGroup;
  disableScrollDown: boolean = false;
  numberOfMessagesChanged: boolean;
  isLoading = true;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.nickname = localStorage.getItem('nickname');

    this.messageForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });

    this.getChatData();

    firebase
      .database()
      .ref('chatData/roomusers/')
      .orderByChild('roomname')
      .equalTo(this.roomname)
      .on('value', (snapshot) => {
        const roomusers = snapshotToArr(snapshot);
        this.users = roomusers.filter((user) => user.status === 'online');
      });
    this.isLoading = false;
  }
  getChatData() {
    firebase
      .database()
      .ref('chatData/chats/' + this.roomname + '/')
      .on('value', (snapshot) => {
        this.chats = [];
        this.chats = snapshotToArr(snapshot);
      });
  }

  onSend() {
    this.message = this.messageForm.value.message;

    if (this.message === null) {
      return console.log('null');
    }
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

    const newMessage = firebase
      .database()
      .ref('chatData/chats/' + this.roomname + '/')
      .push();
    newMessage.set(chat);

    this.messageForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });

    this.disableScrollDown = false;
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
    chat.message = `${this.nickname} left`;
    chat.type = 'exit';
    const newMessage = firebase
      .database()
      .ref('chatData/chats/' + this.roomname + '/')
      .push();
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
    this.exitRoom.emit(true);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  onScroll() {
    let element = this.chatContent.nativeElement;
    let atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false;
    } else {
      this.disableScrollDown = true;
    }
  }
  scrollToBottom() {
    if (this.disableScrollDown) {
      return;
    }
    try {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
  // Emoji
  toggled: boolean = false;
  handleSelection(event) {
    var data = this.messageForm.get('message');
    data.value !== null
      ? data.patchValue(data.value + event.char)
      : data.patchValue('' + event.char);
    this.toggled = false;
  }
}
