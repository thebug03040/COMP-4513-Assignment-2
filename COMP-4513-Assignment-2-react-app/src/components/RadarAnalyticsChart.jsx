import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarAnalyticsChart({ song }) {
  if (!song) return null;

  const labels = [
    'danceability',
    'energy',
    'valence',
    'liveness',
    'speechiness',
    'acousticness'
  ];

  const values = labels.map((key) => song[key] ?? 0);

  const data = {
    labels,
    datasets: [
      {
        label: song.title,
        data: values,
        backgroundColor: 'rgba(255, 111, 97, 0.3)',
        borderColor: 'rgba(255, 111, 97, 1)',
        borderWidth: 2
      }
    ]
  };

const options = {
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 1,
      ticks: {
        display: false
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      },
      angleLines: {
        color: 'rgba(255,255,255,0.2)'
      },
      pointLabels: {
        font: {
          size: 12
        },
        color: '#fff'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};


  return <Radar data={data} options={options} />;
}