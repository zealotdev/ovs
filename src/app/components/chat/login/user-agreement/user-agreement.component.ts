import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss'],
})
export class UserAgreementComponent {
  constructor(private dialogRef: MatDialogRef<UserAgreementComponent>) {}

  onAgree() {
    this.dialogRef.close(true);
  }
  onDecline() {
    this.dialogRef.close(false);
  }
}
