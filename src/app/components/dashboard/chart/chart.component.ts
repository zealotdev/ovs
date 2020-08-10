import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChartsConfig } from './chart.config';
import { ElectionData } from 'src/app/interfaces/election-data';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  public electionTitle: string;
  dbRef = firebase.database();
  dataIsAvailable: boolean = false;

  @Input() _barChartType: string;
  @Input() _barChartLabels: string;
  public barChartOptions = ChartsConfig.barChartOptions;
  public colors = ChartsConfig.colors;
  public barChartLegend = ChartsConfig.barChartLegend;

  public barChartLabels = ['Candidates'];
  public barChartType = 'bar';
  public barChartData: ElectionData[] = [];

  constructor() {}

  ngOnInit() {
    this.dbRef.ref('electionList').once('value', (snapshot) => {
      this.electionTitle = snapshot.val()[0].electionType;
    });

    this.dbRef.ref('electionList/0').on('value', (snapshot) => {
      var candidates = snapshot.val().candidates;
      var dataArr = [];
      this.barChartData = [];
      candidates.forEach((candidate) => {
        dataArr.push({
          data: [candidate.votes || 0],
          label: candidate.name,
        });
        this.barChartData = dataArr;
      });
    });
    this.dataIsAvailable = true;
  }
  ngOnDestroy() {}

  onSelected(key: number) {
    this.dataIsAvailable = false;

    this.dbRef.ref(`electionList/${key}`).on('value', (snapshot) => {
      this.electionTitle = snapshot.val().electionType;
      var candidates = snapshot.val().candidates;

      this.barChartData = [];
      candidates.forEach((candidate) => {
        this.barChartData.push({
          data: [candidate.votes || 0],
          label: candidate.name,
        });
      });

      this.dataIsAvailable = true;
    });
  }
}
