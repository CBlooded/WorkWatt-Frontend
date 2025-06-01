import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ActiveUsers from "../components/ActiveUsers";
import SingleUserChart from "../components/SingleUserChart";
import SavingChart from "../components/savingChart";
import Estimator from "../components/estimator";

/**
 * A component that displays the dashboard page. It shows the active users
 * as well as some system summary statistics. It also shows a chart of the
 * current energy usage of a single user and a chart comparing the costs of
 * energy with and without solar panels. Finally it shows an energy consumption
 * estimator. The component is wrapped in the Navbar component to provide
 * navigation.
 * @returns {JSX.Element} The JSX element representing the dashboard page.
 */
const Dashboard = () => {
  return (
    <Navbar>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{
          padding: 2,
          maxWidth: "70vw",
          marginTop: "max(270vh, 1700px)",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "4vh",
          }}
        >
          {/* Active Users */}
          <ActiveUsers />

          {/* System Summary */}
          <Paper elevation={3} sx={{ p: 2, flex: 3, borderRadius: "20px" }}>
            <Typography variant="h6">Usage ranking</Typography>
            <Typography color="text.secondary">
              Energy used today: 123.5 kWh
            </Typography>
            <Typography color="text.secondary">
              Total users online: 3
            </Typography>
          </Paper>
          {/* System Summary period */}
          <Paper elevation={3} sx={{ p: 2, flex: 1, borderRadius: "20px" }}>
            <Typography variant="h6">Usage summary</Typography>
            <Typography color="text.secondary">
              Energy used today: 123.5 kWh
            </Typography>
            <Typography color="text.secondary">
              Average month usage: 123.5 kWh
            </Typography>
          </Paper>
        </div>
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: "20px", height: "50vh" }}
        >
          {/* chart for power consumption tracking */}
          <div>
            <SingleUserChart />
          </div>
        </Paper>
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: "20px", height: "60vh" }}
        >
          <div>
            {/* chart for cost comparison - example data */}
            <SavingChart />
          </div>
        </Paper>
        <Estimator />
      </Box>
    </Navbar>
  );
};

export default Dashboard;
