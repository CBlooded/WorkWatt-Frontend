import { Card, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "January", usage: 55, savings: 38.5 },
  { month: "February", usage: 50, savings: 40 },
  { month: "March", usage: 48, savings: 43.2 },
  { month: "April", usage: 52, savings: 41.6 },
];

function SavingChart() {
  return (
    <Card sx={{ height: "50vh" }}>
      <Typography
        variant="h6"
        sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}
      >
        Total savings
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            label={{
              value: "savings (zł)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Bar dataKey="savings" fill="#4caf50" name="savings (zł)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default SavingChart;
