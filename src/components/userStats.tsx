import { Paper, List, ListItem, Box, Typography } from "@mui/material";

function UserStats() {
    // TODO: replace with real data -> data mocking
  const users = [
    { id: "user1", time: "21 hours 25 minutes" },
    { id: "user2", time: "21 hours 43 minutes" },
    { id: "user3", time: "43 hours 12 minutes" },
  ];

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "600px",
        height: "auto",
        maxHeight: "40vh",
        overflowY: "auto",
        p: 2,
        m: 1,
        display: "block",
        boxSizing: "border-box",
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" mb={2} sx={{textAlign: "center"}}>
        Users statistics
      </Typography>

      <List disablePadding>
        {/* labels */}
        <ListItem disableGutters sx={{ px: 1, fontWeight: "bold" }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">User ID</Typography>
            <Typography fontWeight="bold">Average daily use</Typography>
            <Typography fontWeight="bold">Uptime</Typography>
          </Box>
        </ListItem>

        {/* values */}
        {users.map((user, index) => (
          <ListItem key={index} disableGutters sx={{ px: 1 }}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography>ID: {user.id}</Typography>
              <Typography color="text.secondary">{user.time}</Typography>
              <Typography color="text.secondary">{user.time}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default UserStats;
