import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArr } from 'src/app/components/chat/chatroom/chatroom.component';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-total-votes',
  templateUrl: './total-votes.component.html',
  styleUrls: ['./total-votes.component.scss'],
})
export class TotalVotesComponent implements OnInit {
  elections = [];
  totalVotes: number;
  inferedElectionKey: number;
  finished = false;
  @ViewChild('cd', { static: false })
  private countdown: CountdownComponent;

  config = {
    demand: true,
    leftTime: 1,
    format: 'HH:mm:ss',
  };

  constructor() {}
  ngOnInit() {
    firebase
      .database()
      .ref('electionList')
      .once('value', (snapshot) => {
        this.elections = snapshotToArr(snapshot);

        // Set a default key
        this.inferedElectionKey = this.elections[0].key;

        // Get Stats for a default election

        // Get total votes for the default selection
        this.getElectionTotalVotes(this.inferedElectionKey);

        // Get Election end time
        firebase
          .database()
          .ref('electionList')
          .child(`${this.inferedElectionKey}`)
          .on('value', (election) => {
            let endTime =
              election.val().startTime * 1 + election.val().duration * 1;
            let now = new Date();
            if (endTime - now.getTime() < 1) {
              // Update database election status
              firebase
                .database()
                .ref('electionList')
                .child(`${this.inferedElectionKey}`)
                .update({
                  active: false,
                });

              return (this.countdown.left = 0);
            }
            this.countdown.left = endTime - now.getTime();
            this.countdown.begin();
          });
      });
  }

  onSelect(key: number) {
    // Reset style
    this.finished = false;

    // Update inferedkey
    this.inferedElectionKey = key;

    // Get Election Total Votes
    this.getElectionTotalVotes(key);

    // Get Election Time Left
    this.countdown.restart();
    this.countdown.i.text = '00:00:00';

    this.setTimeLeft(key);
  }

  getElectionTotalVotes(key: number) {
    firebase
      .database()
      .ref(`electionList/${key}`)
      .on('value', (election) => {
        this.totalVotes = election.val().totalVotes;
      });
  }

  setTimeLeft(key: number) {
    firebase
      .database()
      .ref('electionList')
      .child(`${key}`)
      .on('value', (election) => {
        let endTime =
          election.val().startTime * 1 + election.val().duration * 1;
        let now = new Date();
        if (endTime - now.getTime() < 1) {
          // Update database election status
          firebase.database().ref('electionList').child(`${key}`).update({
            active: false,
          });

          this.finished = true;
          return (this.countdown.left = 0);
        }
        this.countdown.left = endTime - now.getTime();
        this.countdown.begin();
      });
  }
  // Handle counter events
  handleEvent(e) {
    if (e.action == 'done') {
      this.countdown.i.text = '00:00:00';

      // Update election active status in database
      firebase
        .database()
        .ref('electionList')
        .child(`${this.inferedElectionKey}`)
        .update({
          active: false,
        });

      this.finished = true;
    }
  }
}
