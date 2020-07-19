import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChartsConfig } from './chart.config';
import { ElectionData } from 'src/app/interfaces/election-data';
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
  public barChartData: ElectionData[] = [];

  constructor(private _resultsService: resultService) {}

  ngOnInit() {
    this._resultsService.getElectionData().subscribe((data) => {
      this.electionTitle = data[0].electionType;
      this.electionID = data[0].id;
      var candidates = data.find((el) => el.id == this.electionID).candidates;
      candidates.forEach((candidate) => {
        this.barChartData.push({
          data: [candidate.votes],
          label: candidate.name,
        });
      });
    });
  }

  onSelected(id: number) {
    this.barChartData = [];
    // Set data as of selected election
    this._resultsService.getElectionData().subscribe((data) => {
      this.electionTitle = data.find((ele) => ele.id == id).electionType;
      var candidates = data.find((el) => el.id == id).candidates;
      candidates.forEach((candidate) => {
        this.barChartData.push({
          data: [candidate.votes],
          label: candidate.name,
        });
      });
    });
  }

  ngOnDestroy() {}
}
