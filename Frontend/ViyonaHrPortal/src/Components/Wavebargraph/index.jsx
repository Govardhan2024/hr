import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const data = [
  { name: "Unit A", salary: 80000, color: "#4caf50" },
  { name: "Unit B", salary: 60000, color: "#2196f3" },
  { name: "Unit C", salary: 90000, color: "#ff9800" },
  { name: "Unit D", salary: 70000, color: "#9c27b0" },
  { name: "Unit E", salary: 50000, color: "#f44336" },
];

const TotalSalaryBarGraph = () => {
  return (
    <div className="graph-container">
      <h2 className="graph-title">Total Salary by Unit</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4caf50" stopOpacity={1} />
              <stop offset="100%" stopColor="#2196f3" stopOpacity={1} />
            </linearGradient>
          </defs>
          {data.map((entry, index) => (
            <Bar
              key={`bar-${index}`}
              dataKey="salary"
              fill={`url(#waveGradient)`}
              animationDuration={1000}
              radius={[10, 10, 0, 0]} // Round top corners
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalSalaryBarGraph;
