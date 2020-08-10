import { Component, OnInit } from '@angular/core';
import 'firebase/database';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  nickname: string = '';
  loginForm: FormGroup;
  forbiddenNicknames = ['anon', 'damn'];
  ref = firebase.database().ref('chatData/users/');
  disabled: boolean = true;
  constructor(private router: Router, private _matDialog: MatDialog) {}

  ngOnInit(): void {
    if (localStorage.getItem('nickname')) {
      this.router.navigate(['chat/roomlist']);
    }
    this.loginForm = new FormGroup({
      nickname: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  openUserAgreement() {
    const dialogRef = this._matDialog.open(UserAgreementComponent);
    dialogRef.afterClosed().subscribe((result) => (this.disabled = !result));
  }

  onSubmit() {
    if (
      this.loginForm.get('nickname').value == undefined ||
      this.loginForm.get('nickname').value == null
    ) {
      return console.log('nickname can not be empty!');
    }
    this.ref
      .orderByChild('nickname')
      .equalTo(this.loginForm.value.nickname)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem(
            'nickname',
            this.loginForm.get('nickname').value
          );
          this.router.navigate(['chat/roomlist']);
        } else {
          const newUser = firebase.database().ref('chatData/users/').push();
          newUser.set({
            nickname: this.loginForm.value.nickname,
          });
          localStorage.setItem(
            'nickname',
            this.loginForm.get('nickname').value
          );

          this.router.navigate(['chat/roomlist']);
        }
      });
  }

  emptyField(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const input = control.value;
      if (input.trim() !== '') {
        resolve({ emptyField: true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }
}
