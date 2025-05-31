import { Paper, List, ListItem, Box, Typography } from "@mui/material";

function ActiveUsers() {
  const users = [
    { id: "user1", time: "21 hours 25 minutes" },
    { id: "user2", time: "21 hours 43 minutes" },
    { id: "user3", time: "43 hours 12 minutes" },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        maxHeight: "30vh",
        width: "100%",
        // flex: 1,
        borderRadius: "20px",
        minWidth: "300px",
        overflowY: "auto",
        p: 2,
      }}
    >
      <List disablePadding>
        {/* Header */}
        <ListItem disableGutters>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"

          >
            <Typography fontWeight="bold">User ID</Typography>
            <Typography color="text.secondary">Uptime</Typography>
          </Box>
        </ListItem>

        {/* Users */}
        {users.map((user, index) => (
          <ListItem key={index} disableGutters>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography>ID: {user.id}</Typography>
              <Typography color="text.secondary">{user.time}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ActiveUsers;
