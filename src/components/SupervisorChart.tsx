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
  selectedUserId: string | null;
};

type UserNameMap = {
  [userId: string]: string;
};

export default function SupervisorChart() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userNames, setUserNames] = useState<UserNameMap>({});
  const [userData, setUserData] = useState<{ [userId: string]: string[] }>({});
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [rawData, setRawData] = useState<any>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    timeFrame: "month",
    startDate: null,
    endDate: null,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    selectedUserId: null,
  });

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If user selection changed, update chart data
    if (name === "selectedUserId" && value) {
      updateChartForUser(value);
    }
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFilters((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const updateChartForUser = (userId: string) => {
    if (!timestamps.length || !userData[userId]) {
      setError("No data available for selected user");
      setChartData(null);
      return;
    }

    // Convert timestamps to Date objects
    const xAxisData = timestamps.map((xStr) => {
      const [day, month, year] = xStr.split(":").map(Number);
      const fullYear = 2000 + year; // Assumes '25' -> 2025
      return new Date(fullYear, month - 1, day).getTime();
    });

    // Convert user values (handling comma decimal separator)
    const userValues = userData[userId].map((val) => {
      return parseFloat(val.replace(",", "."));
    });

    // Create valid data pairs
    const pairs = xAxisData
      .map((time, i) => {
        const val = userValues[i];
        if (!isNaN(time) && !isNaN(val)) {
          return { time, val };
        }
        return null;
      })
      .filter(Boolean) as { time: number; val: number }[];

    if (pairs.length === 0) {
      setError("No valid data points for the selected user.");
      setChartData(null);
      return;
    }

    setChartData({
      xAxis: pairs.map((p) => p.time),
      series: pairs.map((p) => p.val),
    });
    setError(null);
  };

  const applyFilters = () => {
    fetchChartData();
  };

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Reset user names to avoid accumulation
      setUserNames({});

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
        supervisor: sessionStorage.getItem("userId"),
      };

      const response = await AxiosConfig.get(
        "/api/v1/usage/supervisor/history",
        {
          params,
        }
      );

      const data = response.data;
      setRawData(data);

      // Store the timestamps
      if (Array.isArray(data.X)) {
        setTimestamps(data.X);
      } else {
        setError("Invalid timestamp data format");
        return;
      }

      // Extract user IDs and their data
      if (data.Y && typeof data.Y === "object") {
        const ids = Object.keys(data.Y);

        if (ids.length === 0) {
          setError("No user data found for the selected period");
          setChartData(null);
          return;
        }

        // Store the user data
        setUserData(data.Y);

        // Temporary object to store user names
        const namesMap: UserNameMap = {};

        // Fetch names for all users in parallel
        await Promise.all(
          ids.map(async (id) => {
            try {
              const itemResponse = await AxiosConfig.get("/api/v1/user/name", {
                params: { u: String(id) },
              });
              // Store the user name (assuming response contains name property)
              if (itemResponse.data && itemResponse.data.name) {
                namesMap[id] = itemResponse.data.name;
              } else if (itemResponse.data) {
                // If the response structure is different
                namesMap[id] = String(itemResponse.data);
              } else {
                // Fallback to ID if name not available
                namesMap[id] = `User ${id.substring(0, 8)}...`;
              }
            } catch (error) {
              console.error(`Error fetching name for user ${id}:`, error);
              namesMap[id] = `User ${id.substring(0, 8)}...`;
            }
          })
        );

        // Update state with user names
        setUserNames(namesMap);

        // Select first user by default if none selected
        const userToSelect = filters.selectedUserId || ids[0];
        if (userToSelect) {
          setFilters((prev) => ({ ...prev, selectedUserId: userToSelect }));
          // Update chart for selected user
          updateChartForUser(userToSelect);
        }
      } else {
        setError("Invalid user data format");
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
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

        {/* User selection dropdown */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Select User</InputLabel>
            <Select
              name="selectedUserId"
              value={filters.selectedUserId || ""}
              label="Select User"
              onChange={handleFilterChange}
              disabled={Object.keys(userNames).length === 0}
            >
              {Object.entries(userNames).map(([id, name]) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {filters.timeFrame === "month" && (
          <>
            <Grid size={{ xs: 6, md: 3 }}>
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
            <Grid size={{ xs: 6, md: 3 }}>
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
          <Grid size={{ xs: 12, md: 3 }}>
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
            <Grid size={{ xs: 6, md: 3 }}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
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
          size={{ xs: 12, md: 3 }}
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
            height: "20vh",
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
              valueFormatter: (timestamp) =>
                new Date(timestamp).toLocaleDateString(),
            },
          ]}
          series={[
            {
              data: chartData.series,
              label: `Power Usage (kWh) - ${
                userNames[filters.selectedUserId || ""]
              }`,
              color: "var(--color-tertiary)",
              // Set proper marker properties
              valueFormatter: (value) => `${value} kWh`,
              showMark: true,
            },
          ]}
          height={300}
          sx={{
            ".MuiLineElement-root": {
              strokeWidth: 2,
            },
            // Fix marker positioning - remove the scale property
            ".MuiMarkElement-root": {
              stroke: "var(--color-secondary)",
              fill: "var(--color-secondary)",
            },
          }}
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
          <Typography>
            {Object.keys(userNames).length > 0
              ? "Select a user to view their power usage data"
              : "No data available for the selected period"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
