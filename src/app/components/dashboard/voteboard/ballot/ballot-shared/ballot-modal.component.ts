import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ballot-modal',
  templateUrl: './ballot-modal.component.html',
  styleUrls: ['./ballot-modal.component.scss'],
})
export class BallotModalComponent implements OnInit {
  tokenVerifyForm: FormGroup;
  error: string = '';
  constructor(
    private matDialogRef: MatDialogRef<BallotModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tokenVerifyForm = new FormGroup({
      token: new FormControl(null, Validators.required),
    });
  }
  closeDialog() {
    this.matDialogRef.close();
  }
  onVoteCast() {
    let token = this.tokenVerifyForm.get('token').value;
    token = token.toUpperCase();

    // Check if the token is valid
    (async () => {
      try {
        let tokenValue;
        const dbRef = firebase
          .database()
          .ref(`electionList/${this.data.candidateObject.electionKey}`);

        await dbRef.once('value', (snapshot) => {
          if (snapshot.child(`tokens/${token}`).exists()) {
            dbRef
              .child('candidates')
              .child(this.data.candidateObject.candidateID)
              .child('votes')
              .set(firebase.database.ServerValue.increment(1));

            // Remove token from pool
            dbRef
              .child('tokens')
              .child(token)
              .once('value', (snapshot) => {
                tokenValue = snapshot.val();
              });
            dbRef.child('tokens').child(token).remove();

            // ADD TO USED TOKENS LIST
            const newUsedToken = firebase
              .database()
              .ref(
                `electionList/${this.data.candidateObject.electionKey}/usedTokens/`
              );

            newUsedToken.child(token).set(tokenValue);
            this.matDialogRef.close();

            this._snackBar.open('Voted Succesful', 'close', { duration: 1000 });
          } else if (snapshot.child(`usedTokens/${token}`).exists()) {
            console.log(this.tokenVerifyForm);
            this.error =
              'Sorry, The token has to be used only once per election type.😝';
          } else {
            this.error = 'Token is invalid';
          }
        });
      } catch (error) {
        this.error = "We're experiencing a server side error";
        throw new Error(error);
      }
    })();
  }
}
