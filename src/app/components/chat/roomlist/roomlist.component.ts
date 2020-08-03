import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRoomComponent } from '../add-room/add-room.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatroomComponent } from '../chatroom/chatroom.component';

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
  nickname;
  displayedColumns: string[] = ['roomname'];
  isLoading: boolean = true;
  rooms = [];
  choosedRoom: string;
  dbRef = firebase.database().ref('chatData/rooms');
  roomLimitReached: boolean = false;
  Msg: string;
  onlineUsers = [];
  @ViewChild(ChatroomComponent) chatRoomComp: ChatroomComponent;

  constructor(
    private _router: Router,
    private datePipe: DatePipe,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

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
    this.roomLimitReached = false;
    this.choosedRoom = roomname;
    const chat = {
      roomname: '',
      nickname: '',
      message: '',
      date: '',
      type: '',
    };
    chat.roomname = roomname;
    chat.nickname = this.nickname;
    chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.nickname} joined`;
    chat.type = 'join';
    const newMessage = firebase
      .database()
      .ref('chatData/chats/' + this.choosedRoom + '/')
      .push();
    newMessage.set(chat);

    firebase
      .database()
      .ref('chatData/roomusers/')
      .orderByChild('roomname')
      .equalTo(roomname)
      .once('value', (snapshot) => {
        let roomuser = [];
        roomuser = snapshotToArr(snapshot);
        const user = roomuser.find((user) => user.nickname === this.nickname);
        if (user !== undefined) {
          const userRef = firebase
            .database()
            .ref('chatData/roomusers/' + user.key);
          userRef.update({ status: 'online' });
        } else {
          const newRoomUser = firebase
            .database()
            .ref('chatData/roomusers/')
            .push();
          newRoomUser.set({
            roomname: roomname,
            nickname: this.nickname,
            status: 'online',
          });
        }
      });
  }

  logOut(): void {
    localStorage.removeItem('nickname');
    this._router.navigate(['/chat/login']);
  }

  onExit(exit: boolean) {
    if (exit) {
      this.choosedRoom = '';
    }
  }
  addRoom() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';

    const modalDial = this.matDialog.open(AddRoomComponent, dialogConfig);
    modalDial.afterClosed().subscribe((result) => {
      if (this.rooms.length >= 5) {
        return this.openSnackBar('Sorry! Room limit has reached. 😞');
      } else {
        var room = result.data;
        firebase
          .database()
          .ref('chatData/rooms')
          .once('value', (snapshot) => {
            let snapShot = snapshotToArr(snapshot);

            if (snapShot.find((el) => el.name === room)) {
              return this.openSnackBar('Sorry! room exist. 😞');
            } else {
              const newRoom = firebase.database().ref('chatData/rooms/').push();
              newRoom.set({ name: room, createdBy: this.nickname });
              return this.openSnackBar('Room added successful. 😉');
            }
          });
      }
    });
  }
  onDelete(roomname: string) {
    let roomKey = this.rooms.find((room) => (room.name = roomname));
    roomKey = roomKey.key;
    firebase
      .database()
      .ref('chatData/rooms/' + roomKey)
      .remove();
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 5000 });
  }
}
