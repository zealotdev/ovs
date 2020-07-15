import { Component, OnInit, Input } from '@angular/core';

import { ChartsConfig } from './chart.config';
import { Result } from 'src/app/interfaces/result';
import { electionDataService } from 'src/app/services/election.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public electionTitle;

  @Input() _barChartType: string;
  @Input() _barChartLabels: string;
  public barChartOptions = ChartsConfig.barChartOptions;
  public colors = ChartsConfig.colors;
  public barChartLegend = ChartsConfig.barChartLegend;

  public barChartLabels = ['Candidates'];
  public barChartType = 'bar';
  public barChartData: Result[] = [];

  constructor(private _electionDataService: electionDataService) {}

  ngOnInit() {
    this._electionDataService.getElectionData().subscribe((data) => {
      this.barChartData = data[0].results;
      this.electionTitle = data[0].electionType;
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
}
