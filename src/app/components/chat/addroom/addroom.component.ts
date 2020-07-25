import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.scss'],
})
export class AddroomComponent implements OnInit {
  nickname: string = '';
  roomname: string = '';
  roomForm: FormGroup;
  dbRef = firebase.database().ref('charData/rooms');

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.roomForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const room = this.roomForm.value.name;
    this.roomname = room;
    this.dbRef
      .orderByChild('roomname')
      .equalTo(room)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          console.log('this room already exists');
        } else {
          const newRoom = firebase.database().ref('chatData/rooms/').push();
          newRoom.set({ name: this.roomname });
          this._router.navigate(['/chat/roomlist']);
        }
      });
  }
}
