import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Sales & Order Data',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: [12,45,68,45,23,44],
      borderColor: '#198753',
      backgroundColor: 'rgba(42, 117, 83, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Orders',
      data: [12,5,9,45,78,4],
      borderColor: 'rgb(220, 52, 69)',
      backgroundColor: 'rgba(210, 68, 82, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

export default function SalesChart() {
  return <Line options={options} data={data} />;
}
