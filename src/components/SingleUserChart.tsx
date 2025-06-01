import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import AxiosConfig from "../api/AxiosConfig";
import {
  Box,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

type ChartData = {
  xAxis: number[];
  series: number[];
};

type FilterOptions = {
  timeFrame: string;
  startDate: Date | null;
  endDate: Date | null;
  month: number | null;
  year: number | null;
};

export default function SingleUserChart() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    timeFrame: "month",
    startDate: null,
    endDate: null,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFilters((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const applyFilters = () => {
    fetchChartData();
  };

  const fetchChartData = async () => {
    try {
      setLoading(true);

      let startDate: Date;
      let endDate: Date = new Date();

      if (
        filters.timeFrame === "custom" &&
        filters.startDate &&
        filters.endDate
      ) {
        startDate = filters.startDate;
        endDate = filters.endDate;
      } else if (
        filters.timeFrame === "month" &&
        filters.month !== null &&
        filters.year !== null
      ) {
        startDate = new Date(filters.year, filters.month, 1);
        endDate = new Date(filters.year, filters.month + 1, 0);
      } else if (filters.timeFrame === "year" && filters.year !== null) {
        startDate = new Date(filters.year, 0, 1);
        endDate = new Date(filters.year, 11, 31);
      } else if (filters.timeFrame === "week") {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
      } else if (filters.timeFrame === "day") {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
      } else {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
      }

      const params = {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };

      const response = await AxiosConfig.get("/api/v1/chart/user/1", {
        params,
      });

      const data = response.data;
      setChartData({
        xAxis: data.timestamps || data.xAxis || [1, 2, 3, 5, 8, 10],
        series: data.values || data.series || [2, 5.5, 2, 8.5, 1.5, 5],
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching chart data:", err);
      setError("Failed to load chart data. Please try again later.");

      setChartData({
        xAxis: [1, 2, 3, 5, 8, 10],
        series: [2, 5.5, 2, 8.5, 1.5, 5],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Time Frame</InputLabel>
            <Select
              name="timeFrame"
              value={filters.timeFrame}
              label="Time Frame"
              onChange={handleFilterChange}
            >
              <MenuItem value="day">Daily</MenuItem>
              <MenuItem value="week">Weekly</MenuItem>
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {filters.timeFrame === "month" && (
          <>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  name="month"
                  value={filters.month}
                  label="Month"
                  onChange={handleFilterChange}
                >
                  <MenuItem value={0}>January</MenuItem>
                  <MenuItem value={1}>February</MenuItem>
                  <MenuItem value={2}>March</MenuItem>
                  <MenuItem value={3}>April</MenuItem>
                  <MenuItem value={4}>May</MenuItem>
                  <MenuItem value={5}>June</MenuItem>
                  <MenuItem value={6}>July</MenuItem>
                  <MenuItem value={7}>August</MenuItem>
                  <MenuItem value={8}>September</MenuItem>
                  <MenuItem value={9}>October</MenuItem>
                  <MenuItem value={10}>November</MenuItem>
                  <MenuItem value={11}>December</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={filters.year}
                onChange={handleFilterChange}
              />
            </Grid>
          </>
        )}

        {filters.timeFrame === "year" && (
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Year"
              name="year"
              type="number"
              value={filters.year}
              onChange={handleFilterChange}
            />
          </Grid>
        )}

        {filters.timeFrame === "custom" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={6} md={3}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={(date) => handleDateChange("endDate", date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </LocalizationProvider>
        )}

        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Button
            variant="contained"
            onClick={applyFilters}
            sx={{
              bgcolor: "var(--color-tertiary)",
              "&:hover": { bgcolor: "var(--color-accent)" },
            }}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <LineChart
          xAxis={[{ data: chartData?.xAxis || [] }]}
          series={[
            {
              data: chartData?.series || [],
              label: "Power Usage (kWh)",
            },
          ]}
          height={300}
          width={500}
        />
      )}
    </Box>
  );
}
