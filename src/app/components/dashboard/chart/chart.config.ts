export class ChartsConfig {
  static barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'rgb(7, 146, 239)',
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Votes',
          },
          ticks: {
            min: 0,
            stepSize: 1,
          },
        },
      ],
    },
  };

  static colors = [
    { backgroundColor: '#D5BCB9' },
    { backgroundColor: '#AFA2EA' },
    { backgroundColor: '#9ECFE6' },
    { backgroundColor: '#EF9EA9' },
    { backgroundColor: '#FEB48A' },
    { backgroundColor: '#D995DF' },
    { backgroundColor: '#58508d' },
    { backgroundColor: '#3cba9f' },
  ];

  static barChartLegend = true;
}
