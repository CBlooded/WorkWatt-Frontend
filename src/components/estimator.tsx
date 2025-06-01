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
// import { set } from "react-hook-form";

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
      (powerComsumption * workstationCount * hoursPerDay * daysPerMonth) / 1000;
    const cost = totalKwh * pricePerKwh;
    setTotalKw(kW_total);
    setTotalKwh(totalKwh);
    setResultMonthPrice(Number(cost.toFixed(2)));
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
                Solar panels estimated cost: <strong>{totalKw * 5000}</strong>
              </Alert>
              <Typography variant="h6" textAlign="center" gutterBottom>
                Koszt instalacji PV za 1 kW [PLN/kW] <br />5 000
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Estimator;
