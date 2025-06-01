import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ActiveUsers from "../components/ActiveUsers";

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
          <Typography variant="h6">Insert Chart here</Typography>
          <div>{/* TODO: ADD CHART */}</div>
        </Paper>
        <Paper
          elevation={3}
          sx={{ p: 2, borderRadius: "20px", height: "50vh" }}
        >
          <Typography variant="h6">Cost comparde with solar panels</Typography>
          <div>{/* TODO: ADD savings chart */}</div>
        </Paper>
      </Box>
    </Navbar>
  );
};

export default Dashboard;
