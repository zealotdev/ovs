import { Component, OnInit } from '@angular/core';
import 'firebase/database';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

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
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('nickname')) {
      this.router.navigate(['chat/roomlist']);
    }
    this.loginForm = new FormGroup({
      nickname: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    // this.ref
    //   .orderByChild('nickname')
    //   .equalTo(this.loginForm.value.nickname)
    //   .once('value', (snapshot) => {
    //     if (snapshot.exists()) {
    //       localStorage.setItem('nickname', this.loginForm.value.nickname);
    //       this.router.navigate(['chat/roomlist']);
    //     } else {
    //       const newUser = firebase.database().ref('chatData/users/').push();
    //       newUser.set({
    //         nickname: this.loginForm.value.nickname,
    //       });
    //       localStorage.setItem('nickname', this.loginForm.value.nickname);
    //       this.router.navigate(['chat/roomlist']);
    //     }
    //   });
    this.router.navigate(['chat/roomlist']);
  }

  emptyField(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const input = control.value();
      if (input.trim() !== '') {
        resolve({ emptyField: true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }
}
