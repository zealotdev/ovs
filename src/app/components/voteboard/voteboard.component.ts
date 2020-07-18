import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voteboard',
  templateUrl: './voteboard.componet.html',
  styleUrls: ['./voteboard.component.scss'],
})
export class VoteboardComponent implements OnInit {
  verified: boolean = false;
  error: boolean = false;

  constructor() {}

  ngOnInit() {}

  onVerified(verified: boolean) {
    this.verified = verified;
    // TODO handle error signal
  }
}
