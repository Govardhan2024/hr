
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './index.css'

const data = [
  { name: 'Developer', salary: 80000, color: '#4caf50' },
  { name: 'Designer', salary: 60000, color: '#2196f3' },
  { name: 'Manager', salary: 90000, color: '#ff9800' },
  { name: 'Analyst', salary: 70000, color: '#9c27b0' },
  { name: 'Tester', salary: 50000, color: '#f44336' },
];

const SalaryBarGraph = () => {
  return (
    <div className="graph-container">
      <h2 className="graph-title">Salary Statistics</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.map((entry, index) => (
            <Bar key={`bar-${index}`} dataKey="salary" fill={entry.color} animationDuration={1000} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryBarGraph;
