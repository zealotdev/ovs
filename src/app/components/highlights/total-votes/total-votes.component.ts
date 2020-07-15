import { Component, OnInit } from '@angular/core';
import { electionDataService } from 'src/app/services/election.service';

@Component({
  selector: 'app-total-votes',
  templateUrl: './total-votes.component.html',
  styleUrls: ['./total-votes.component.scss'],
})
export class TotalVotesComponent implements OnInit {
  elections = [];
  selectedEl;
  sum: number = 0;

  constructor(private _electionDataService: electionDataService) {}
  ngOnInit() {
    this._electionDataService
      .getElectionData()
      .subscribe((data) => (this.elections = data));

    this.onSelect(0);
  }

  onSelect(id: number) {
    if (id != 0) {
      this._electionDataService
        .getElectionData()
        .subscribe(
          (data) => (this.selectedEl = data.find((el) => el.id == id))
        );
    } else {
      this._electionDataService
        .getElectionData()
        .subscribe((data) => (this.selectedEl = data[0]));
    }

    this.findSum();
  }

  findSum() {
    this.selectedEl.results.forEach((el) =>
      el.data.forEach((votes) => (this.sum += votes))
    );

    console.log(this.sum);
  }
}
