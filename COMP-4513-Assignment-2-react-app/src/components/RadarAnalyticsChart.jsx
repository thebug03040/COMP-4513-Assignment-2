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

  const values = labels.map((key) => (song[key] ?? 0) / 100);

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
        ticks: { stepSize: 0.2 }
      }
    }
  };

  return <Radar data={data} options={options} />;
}