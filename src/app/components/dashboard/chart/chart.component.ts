import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChartsConfig } from './chart.config';
import { ElectionData } from 'src/app/interfaces/election-data';
import { resultService } from 'src/app/services/results.service';
import * as firebase from 'firebase/app';
import { firebaseDataService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private electionID: number;
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

  constructor(
    private _resultsService: resultService,
    private _firebaseService: firebaseDataService
  ) {}

  ngOnInit() {
    this.dbRef.ref('electionList').once('value', (snapshot) => {
      this.electionID = snapshot.val()[0].id;
      this.electionTitle = snapshot.val()[0].electionType;
    });

    this.dbRef.ref('electionList/0').once('value', (snapshot) => {
      var candidates = snapshot.val().candidates;
      var dataArr = [];
      candidates.forEach((cand) => {
        dataArr.push({
          data: [cand.votes],
          label: cand.name,
        });
        this.barChartData = dataArr;
      });
    });
    this.dataIsAvailable = true;
  }

  onSelected(id: number) {
    this.barChartData = [];
    this.dataIsAvailable = false;

    this.dbRef.ref('electionList/').once('value', (snapshot) => {
      snapshot.forEach((snap) => {
        if (snap.val().id == id) {
          this.electionID = snap.val().id;
          this.electionTitle = snap.val().electionType;
          var candidates = snap.val().candidates;
          candidates.forEach((cand) => {
            this.barChartData.push({
              data: [cand.votes],
              label: cand.name,
            });

            this.dataIsAvailable = true;
          });
        }
      });
    });
  }

  ngOnDestroy() {}
}
