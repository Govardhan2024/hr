import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Fixed data
  const data = {
    // labels: ['Red', 'Blue', 'Yellow'], // Added labels for clarity
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the height is fixed
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="piechart" style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px', height: '200px' }}>
      <Pie height={200} data={data} options={options} />
    </div>
  );
};

export default PieChart;
