// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   TimeScale,
// } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   TimeScale
// );

// export default function WeatherChart({ data }) {
//   // data: array of hourly weather objects from OpenWeatherMap

//   const chartData = {
//     labels: data.map(d => new Date(d.dt * 1000)),
//     datasets: [
//       {
//         label: 'Temperature (°C)',
//         data: data.map(d => d.temp),
//         fill: false,
//         backgroundColor: 'rgba(37, 99, 235, 0.7)', // blue
//         borderColor: 'rgba(37, 99, 235, 1)',
//         tension: 0.2,
//         pointRadius: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: true },
//       tooltip: {
//         callbacks: {
//           label: ctx => `${ctx.parsed.y} °C`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: 'hour',
//           tooltipFormat: 'PPpp',
//           displayFormats: {
//             hour: 'MMM d, h a',
//           },
//         },
//         title: { display: true, text: 'Date & Time' },
//       },
//       y: {
//         title: { display: true, text: 'Temperature (°C)' },
//         beginAtZero: false,
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// }



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
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

export default function WeatherChart({ data }) {
  // data is an array of forecast objects with dt_txt and main.temp

  const chartData = {
    labels: data.map(item => item.dt_txt), // date/time string
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(item => item.main.temp),
        fill: false,
        borderColor: 'rgb(37, 99, 235)', // Tailwind blue-600
        backgroundColor: 'rgb(37, 99, 235)',
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'yyyy-MM-dd HH:mm:ss',
          tooltipFormat: 'eee, MMM d, HH:mm',
          unit: 'day',
          displayFormats: {
            day: 'MMM d',
            hour: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Date & Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        min: Math.min(...data.map(item => item.main.temp)) - 5,
        max: Math.max(...data.map(item => item.main.temp)) + 5,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

