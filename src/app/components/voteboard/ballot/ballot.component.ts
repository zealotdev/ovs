import { Component, OnInit } from '@angular/core';
import { electionDataService } from 'src/app/services/election.service';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss'],
})
export class BallotComponent implements OnInit {
  elections = [];
  electionType: string;
  selectedEl;
  candidateName: string;
  candObj;
  electionID: number;

  constructor(private _electionDataService: electionDataService) {}

  ngOnInit() {
    this._electionDataService.getElectionData().subscribe((data) => {
      this.elections = data;
    });

    this.onSelection(0);
  }
  onSelection(id: number) {
    this.candidateName = '';
    if (id != 0) {
      this.electionID = id;
      this._electionDataService.getElectionData().subscribe((data) => {
        this.selectedEl = data.find((el) => el.id == id).candidates;
        this.electionType = data.find((el) => el.id == id).electionType;
      });
    } else {
      this._electionDataService.getElectionData().subscribe((data) => {
        this.selectedEl = data[0].candidates;
        this.electionID = data[0].id;
        this.electionType = data[0].electionType;
      });
    }
  }
  onSelect(cand) {
    this.candObj = cand;
    this.candidateName = cand.name;
  }
  onVote() {
    this._electionDataService.vote(this.electionID, this.candObj.id);
  }
}
