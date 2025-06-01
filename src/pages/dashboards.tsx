import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
// import ActiveUsers from "../components/activeUsers";
import SingleUserChart from "../components/SingleUserChart";
import SupervisorChart from "../components/SupervisorChart";
import SavingChart from "../components/savingChart";
import AxiosConfig from "../api/AxiosConfig";

const Dashboard = () => {
  const today = async () => {
    try {
      const response = await AxiosConfig.get("/api/v1/usage/today/total");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{
          padding: 2,
          maxWidth: "70vw",
          marginTop: "max(100vh, 550px)",
          //   margin: "auto",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <div
          style={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "4vh",
          }}
        >
          {/* Active Users */}
          {/* <ActiveUsers /> */}

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
          <Paper elevation={3} sx={{ p: 2, flex: 1, borderRadius: "20px" }}>
            <Typography variant="h6">Usage summary</Typography>
            <Typography color="text.secondary">
              Energy used today: {today()}
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
          <Typography variant="h6"></Typography>
          <div>
            {sessionStorage.getItem("role") === "2" ? (
              <SingleUserChart />
            ) : (
              <SupervisorChart />
            )}
          </div>
        </Paper>
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: "20px", height: "50vh" }}
        >
          {/* <Typography variant="h6">Cost comparde with solar panels</Typography> */}
          <div>
            {/* example data for chart */}
            <SavingChart />
          </div>
        </Paper>
      </Box>
    </Navbar>
  );
};

export default Dashboard;
