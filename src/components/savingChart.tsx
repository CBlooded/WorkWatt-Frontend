import { Card, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// exapmle data
const data = [
  { month: "January", withSolar: 2450, withoutSolar: 4900 },
  { month: "February", withSolar: 2300, withoutSolar: 4600 },
  { month: "March", withSolar: 2100, withoutSolar: 4200 },
  { month: "April", withSolar: 1950, withoutSolar: 3900 },
  { month: "May", withSolar: 1850, withoutSolar: 3700 },
  { month: "June", withSolar: 1800, withoutSolar: 3600 },
  { month: "July", withSolar: 1750, withoutSolar: 3500 },
  { month: "August", withSolar: 1800, withoutSolar: 3600 },
  { month: "September", withSolar: 1900, withoutSolar: 3800 },
];

function SavingChart() {
  return (
    <Card sx={{ height: "60vh" }}>
      <Typography
        variant="h6"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          mt: 2,
        }}
      >
        Energy Cost Comparison
      </Typography>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          {/* <YAxis label={{ value: "Cost (zł)", angle: -90, position: "insideLeft"}} /> */}
          <Tooltip
            formatter={(value: number) => [`${value} zł`, ""]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Bar dataKey="withoutSolar" fill="#f44336" name="Without installation" />
          <Bar dataKey="withSolar" fill="#4caf50" name="With solar panels" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default SavingChart;
