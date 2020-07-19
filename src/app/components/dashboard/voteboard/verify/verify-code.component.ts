import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent {
  verCode: string = 'mama';
  error: boolean = false;
  input: string;

  @Output() codeVerified = new EventEmitter<boolean>();

  constructor() {}

  verify(code: string): void {
    console.log(code);
    if (this.verCode === code) {
      this.codeVerified.emit(true);
    } else {
      this.codeVerified.emit(false);
      this.error = true;
      // TODO handle error signal
    }
  }
}
