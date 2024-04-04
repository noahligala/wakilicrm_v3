import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';



const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    Billables: 0.65,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    Billables: 0.5,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    Billables: 0.7,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    Billables: 0.3,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    Billables: 0.9,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    Billables: 0.2,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    Billables: 0.86,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    Billables: 0.3,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    Billables: 0.4,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    Billables: 0.3,
    month: 'Oct',
    year: '2024'
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    Billables: 0.3,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    Billables: 0.3,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
  yAxis: [
    {
      label: 'time (hrs)',
    },
  ],
  series: [{ dataKey: 'Billables', label: 'billables hours', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-5px)',
    },
  },
};

export default function TickPlacementBars() {

  return (
    <React.Fragment style={{ textAlign: 'center' }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'month', },
        ]}
        {...chartSetting}
      />
    </React.Fragment>
  );
}
