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
          margin: "auto",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap",gap: "4vh"}}>
          {/* Active Users */}
          <ActiveUsers />

          {/* System Summary */}
          <Paper elevation={3} sx={{ p: 2 , flex: 3}}>
            <Typography variant="h6">System Summary</Typography>
            <Typography color="text.secondary">
              Energy used today: 123.5 kWh
            </Typography>
            <Typography color="text.secondary">
              Total users online: 3
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6">System Summary</Typography>
            <Typography color="text.secondary">
              Energy used today: 123.5 kWh
            </Typography>
            <Typography color="text.secondary">
              Total users online: 3
            </Typography>
          </Paper>
        </div>
      </Box>
    </Navbar>
  );
};

export default Dashboard;
