import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  NgZone,
  AfterViewInit,
} from '@angular/core';

import * as firebase from 'firebase/app';

// am4chart
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit {
  public electionTitle: string;
  dbRef = firebase.database();
  dataIsAvailable: boolean = false;

  @Input() _barChartType: string;
  @Input() _barChartLabels: string;

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.dbRef.ref('electionList/0').on('value', (snapshot) => {
      var candidates = snapshot.val().candidates;
      this.electionTitle = snapshot.val().electionType;
      let totalVotes = snapshot.val().totalVotes;
      var dataArr = [];
      candidates.forEach((candidate) => {
        let _percentage: any = (candidate.votes / totalVotes) * 100;
        _percentage = _percentage.toFixed(2);

        dataArr.push({
          candidate: candidate.name,
          votes: candidate.votes || 0,
          totalVotes: totalVotes,
          percentage: _percentage,
        });
        this.populateChart(dataArr);
      });
    });
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  onSelected(key: number) {
    this.dataIsAvailable = false;

    this.dbRef.ref(`electionList/${key}`).on('value', (snapshot) => {
      this.electionTitle = snapshot.val().electionType;
      var candidates = snapshot.val().candidates;
      let totalVotes = snapshot.val().totalVotes;

      let dataArr = [];
      candidates.forEach((candidate) => {
        let _percentage: any = (candidate.votes / totalVotes) * 100;
        _percentage = _percentage.toFixed(2);
        dataArr.push({
          candidate: candidate.name,
          votes: candidate.votes || 0,
          totalVotes: totalVotes || 0,
          percentage: _percentage || 0,
        });

        this.populateChart(dataArr);
      });
    });
  }
  populateChart(data) {
    this.chatDisposal();

    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = data;

      // Chart title
      let title = chart.titles.create();
      title.text = this.electionTitle.toUpperCase() + ' ELECTION';
      title.fontSize = 16;
      title.marginBottom = 10;

      // Hide logo
      chart.logo.disabled = true;

      let CandidatesAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      CandidatesAxis.renderer.grid.template.location = 0;
      CandidatesAxis.dataFields.category = 'candidate';
      CandidatesAxis.renderer.minGridDistance = 1;
      CandidatesAxis.renderer.labels.template.width = 120;
      CandidatesAxis.renderer.labels.template.wrap = true;
      CandidatesAxis.fontSize = 12;

      let votesAxis = chart.yAxes.push(new am4charts.ValueAxis());
      votesAxis.min = 0;
      votesAxis.renderer.minGridDistance = 50;
      votesAxis.title.text = 'Votes';

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = 'candidate';
      series.dataFields.valueY = 'votes';
      series.columns.template.tooltipText = `
      [bold] My Stats
      ---
      Percentage: {percentage}%
      Votes: {valueY.value} out of {totalVotes} 
      `;
      series.columns.template.tooltipY = 0;
      series.columns.template.strokeOpacity = 0;
      series.tooltip.pointerOrientation = 'vertical';

      series.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      this.chart = chart;
    });
  }
  chatDisposal() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
