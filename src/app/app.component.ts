import { Component, OnInit } from '@angular/core';
import { Result } from './interfaces/result';
import { resultService } from './services/results.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ovs-front';
  public resultData: Result[] = [];
  public electionData;

  constructor(private _resultsService: resultService) {}
  ngOnInit() {
    this._resultsService
      .getResults()
      .subscribe((results) => (this.resultData = results));

    this._resultsService
      .getElectionData()
      .subscribe((elData) => (this.electionData = elData));
  }
}
