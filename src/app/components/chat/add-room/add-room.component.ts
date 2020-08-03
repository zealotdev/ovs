import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {
  addRoomForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddRoomComponent>) {}

  ngOnInit(): void {
    this.addRoomForm = new FormGroup({
      roomname: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    this.dialogRef.close({
      event: 'close',
      data: this.addRoomForm.value.roomname,
    });
  }
}
