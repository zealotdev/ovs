import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { NoteModalComponent } from './components/shared/note-modal/note-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private matDialog: MatDialog) {
    firebase.initializeApp(environment.firebaseConfig);
  }
  ngOnInit() {
    this.matDialog.open(NoteModalComponent);
  }
}
