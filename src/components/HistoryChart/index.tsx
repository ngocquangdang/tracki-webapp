import React from 'react';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useStyles } from './styles';

interface Prop {
  histories: object;
  historyIds: number[];
}

const options = {
  chart: {
    type: 'column',
    height: '60px',
  },
  credits: { enabled: false },
  title: { text: '' },
  subtitle: { text: '' },
  colors: ['#168449'],
  xAxis: {
    title: { enabled: false },
    labels: { enabled: false },
    tickWidth: 0,
  },
  yAxis: {
    min: 0,
    title: { enabled: false },
    labels: { enabled: false },
    gridLineWidth: 0,
  },
  plotOptions: {
    series: {
      pointPadding: 0,
      groupPadding: 0,
      borderWidth: 0,
      dataLabels: {
        enabled: false,
        format: '{point.y}',
      },
    },
    column: {
      pointPadding: 0,
      groupPadding: 0,
      pointWidth: 8,
    },
  },
  legend: {
    enabled: false,
    accessibility: {
      enabled: false,
    },
  },
  tooltip: {
    pointFormat: 'Location records: <b>{point.y}</b>',
  },
  series: [
    {
      data: [],
      dataLabels: {
        enabled: false,
      },
    },
  ],
};

function HistoryChart(props: Prop) {
  const classes = useStyles();
  const { historyIds, histories } = props;
  const data = historyIds.reduce((obj, i) => {
    const his = histories[i];
    const date = moment(his.time * 1000);
    const newDate = moment();
    newDate.days(date.days());
    newDate.months(date.months());
    newDate.years(date.years());
    const date2 = moment(newDate).unix();
    obj[date2] = (obj[date2] || 0) + 1;
    return obj;
  }, {});
  const dataArr = Object.keys(data).map(k => [
    moment(Number(k) * 1000).format('lll'),
    data[k],
  ]);

  const newOptions = {
    ...options,
    series: [
      {
        data: dataArr,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <div className={classes.container}>
      <HighchartsReact highcharts={Highcharts} options={newOptions} />
    </div>
  );
}

export default HistoryChart;
