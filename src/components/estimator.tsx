import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
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

const Estimator = () => {
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [workstationCount, setWorkstationCount] = useState(100);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [powerComsumption, setPowerComsumption] = useState(150);
  const [pricePerKwh, setPricePerKwh] = useState(1.23);

  const [resultMonthPrice, setResultMonthPrice] = useState<number | null>(null);
  const [totalKwh, setTotalKwh] = useState(0);
  const [totalKw, setTotalKw] = useState(0);

  const calculateMonthlyCost = () => {
    const kW_total = (powerComsumption * workstationCount) / 1000;
    const totalKwh =
      (powerComsumption *
        workstationCount *
        hoursPerDay *
        daysPerMonth) /
      1000;
    const cost = totalKwh * pricePerKwh;
    setTotalKw(kW_total);
    setTotalKwh(totalKwh);
    setResultMonthPrice(Number(cost.toFixed(2)));
  };

  const getOneYearWithSolarReduction = () => {
    if (!resultMonthPrice) return [];

    const avgSolarProductionPerHour = 0.142; // kWh per kW per hour (Krakow 2019)
    const energySellPrice = 0.51062; // PLN/kWh
    const autoconsumptionRate = 0.22; // 22%

    const yearlyUsageKwh = resultMonthPrice * 12 / pricePerKwh;

    const solarKwhPerYear =
      avgSolarProductionPerHour * hoursPerDay * 365 * totalKw;

    const autoconsumedKwh = solarKwhPerYear * autoconsumptionRate;
    const soldKwh = solarKwhPerYear * (1 - autoconsumptionRate);

    const savingsFromAuto = autoconsumedKwh * pricePerKwh;
    const incomeFromSold = soldKwh * energySellPrice;

    const reducedYearlyCost =
      resultMonthPrice * 12 - (savingsFromAuto + incomeFromSold);

    return [
      { name: "Bez PV", cost: resultMonthPrice * 12 },
      { name: "Z PV", cost: Math.max(0, reducedYearlyCost) },
    ];
  };

  return (
    <Card sx={{ height: "auto", p: 2 }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Energy Cost Estimator
      </Typography>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Koszt instalacji PV za 1 kW [PLN/kW] <br />5 000
      </Typography>
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Price per kWh (zł)"
            type="number"
            value={pricePerKwh}
            onChange={(e) => setPricePerKwh(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Hours per day"
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Days per month"
            type="number"
            value={daysPerMonth}
            onChange={(e) => setDaysPerMonth(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Workstation count"
            type="number"
            value={workstationCount}
            onChange={(e) => setWorkstationCount(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Average power consumption per workstation (Watts)"
            type="number"
            value={powerComsumption}
            onChange={(e) => setPowerComsumption(Number(e.target.value))}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={calculateMonthlyCost}
          >
            Estimate
          </Button>

          {resultMonthPrice !== null && (
            <>
              <Alert severity="info">
                Estimated monthly energy cost:{" "}
                <strong>{resultMonthPrice} zł</strong>
              </Alert>
              <Alert severity="info">
                Total kWh per month: <strong>{totalKwh}</strong>
              </Alert>
              <Alert severity="info">
                Net kW usage: <strong>{totalKw}</strong>
              </Alert>
              <Alert severity="info">
                Solar panels estimated cost:{" "}
                <strong>{totalKw * 5000} zł</strong>
              </Alert>

              <Box mt={4}>
                <Typography variant="h6" textAlign="center" gutterBottom>
                  Roczny koszt energii – Bez PV vs Z PV (uwzględniając
                  produkcję i sprzedaż)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getOneYearWithSolarReduction()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      label={{
                        value: "Cost (zł)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cost" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Estimator;
