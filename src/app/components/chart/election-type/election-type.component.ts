import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { electionDataService } from 'src/app/services/election.service';

@Component({
  selector: 'app-election-type',
  templateUrl: './election-type.component.html',
  styleUrls: ['./election-type.component.scss'],
})
export class ElectionTypeComponent implements OnInit {
  public elections;
  @Output() selectedElection = new EventEmitter<number>();
  constructor(private _electionDataService: electionDataService) {}

  ngOnInit(): void {
    this._electionDataService
      .getElectionData()
      .subscribe((data) => (this.elections = data));
  }

  selectedEl(id: number): void {
    this.selectedElection.emit(id);
  }
}
