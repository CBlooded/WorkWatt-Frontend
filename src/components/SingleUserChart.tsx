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
      setError(null);

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
        // default last 30 days
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
      }

      const params = {
        s: String(startDate.getTime()),
        e: String(endDate.getTime()),
        u: "c760850a-634b-4cb6-9a88-52f629c567a2",
      };

      const response = await AxiosConfig.get("/api/v1/usage/history", {
        params,
      });

      const data = response.data;
      console.log(data);

      // Build pairs of timestamp and value, filtering invalid entries
      const pairs =
        Array.isArray(data.X) && Array.isArray(data.Y)
          ? (data.X.map((xStr: string, i: number) => {
              // Convert 'dd:MM:yy' into timestamp
              const [day, month, year] = xStr.split(":").map(Number);
              const fullYear = 2000 + year; // Assumes '25' -> 2025
              const date = new Date(fullYear, month - 1, day); // JS months are 0-based
              const time = date.getTime();
              const val = parseFloat(data.Y[i]);

              if (!isNaN(time) && !isNaN(val)) {
                return { time, val };
              }
              return null;
            }).filter(Boolean) as { time: number; val: number }[])
          : [];

      if (pairs.length === 0) {
        setError("No valid data to display for the selected period.");
        setChartData(null);
        return;
      }

      const safeTimestamps = pairs.map((p) => p.time);
      const safeValues = pairs.map((p) => p.val);

      setChartData({
        xAxis: safeTimestamps,
        series: safeValues,
      });
    } catch (err: any) {
      console.error("Error fetching chart data:", err);

      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError("Invalid request parameters. Please check your filters.");
            break;
          case 401:
            setError(
              "You are not authorized to view this data. Please login again."
            );
            sessionStorage.removeItem("token");
            break;
          case 403:
            setError("You don't have permission to access this data.");
            break;
          case 404:
            setError("No usage data found for the selected period.");
            break;
          case 204:
            setError("No content.");
            break;
          case 500:
            setError(
              "Server error. Please try again later or contact support."
            );
            break;
          default:
            setError(`Request failed with status code ${err.response.status}`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Failed to load chart data. Please try again later.");
      }

      setChartData(null);
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
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i} value={i}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </MenuItem>
                  ))}
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
      ) : chartData &&
        chartData.xAxis.length > 0 &&
        chartData.series.length > 0 ? (
        <LineChart
          xAxis={[
            {
              data: chartData.xAxis,
              scaleType: "time",
              formatter: (timestamp) =>
                new Date(timestamp).toLocaleDateString(),
            },
          ]}
          series={[{ data: chartData.series, label: "Power Usage (kWh)" }]}
          height={300}
          width={500}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <Typography>No data to display.</Typography>
        </Box>
      )}
    </Box>
  );
}
