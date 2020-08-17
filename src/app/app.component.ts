import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  deferredPrompt;
  installPromo = false;
  constructor(private matDialog: MatDialog) {
    firebase.initializeApp(environment.firebaseConfig);

    window.addEventListener('beforeInstallPrompt', (event) => {
      // Prevent the mini-infobar from appearing in mobile
      event.preventDefault();

      // Stash the event so it can be triggered later
      this.deferredPrompt = event;

      // Notify use can install PWA
      this.installPromo = true;
    });
  }

  installPwa() {
    this.deferredPrompt.prompt();
  }
  ngOnInit() {}
}
