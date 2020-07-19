import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChartsConfig } from './chart.config';
import { Result } from 'src/app/interfaces/result';
import { electionDataService } from 'src/app/services/election.service';
import { resultService } from 'src/app/services/results.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private electionID: number;
  public electionTitle: string;

  @Input() _barChartType: string;
  @Input() _barChartLabels: string;
  public barChartOptions = ChartsConfig.barChartOptions;
  public colors = ChartsConfig.colors;
  public barChartLegend = ChartsConfig.barChartLegend;

  public barChartLabels = ['Candidates'];
  public barChartType = 'bar';
  public barChartData: Result[] = [];

  constructor(
    private _electionDataService: electionDataService,
    private _resultsService: resultService
  ) {}

  ngOnInit() {
    this._electionDataService.getElectionData().subscribe((data) => {
      this.electionID = data[0].id;
      this.electionTitle = data[0].electionType;
    });

    this._resultsService.getResults(this.electionID).subscribe((data) => {
      this.barChartData = data;
    });
  }

  onSelected(id: number) {
    this.barChartData = [];
    // Set data as of selected election
    this._electionDataService.getElectionData().subscribe((data) => {
      this.barChartData = data.find((ele) => ele.id == id).results;
      this.electionTitle = data.find((ele) => ele.id == id).electionType;
    });
  }

  ngOnDestroy() {}
}
