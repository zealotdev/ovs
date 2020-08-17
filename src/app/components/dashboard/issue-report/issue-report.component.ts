import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.compnent.scss'],
})
export class IssueReportComponent implements OnInit {
  public issueReportForm: FormGroup;

  constructor(private _matsnackBar: MatSnackBar) {}

  ngOnInit() {
    this.issueReportForm = new FormGroup({
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      report: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  onSubmit() {
    const addressInfo = this.issueReportForm.get('address').value;
    const issueInfo = this.issueReportForm.get('report').value;

    const dbRef = firebase.database().ref('issues').push();
    dbRef.set({
      address: addressInfo,
      issue: issueInfo,
    });

    this._matsnackBar.open('Issue reported successful 👍', 'close', {
      duration: 6000,
    });
    this.issueReportForm = new FormGroup({
      address: new FormControl(null),
      report: new FormControl(null),
    });
  }
}
