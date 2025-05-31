import { Paper, List, ListItem, Box, Typography } from "@mui/material";

function ActiveUsers() {
  const users = [
    { id: "user1", time: "10:00 AM" },
    { id: "user2", time: "11:30 AM" },
    { id: "user3", time: "1:15 PM" },
  ];

  return (
    <>
      <Paper
        style={{ maxHeight: 200, width: 500, overflow: "auto", padding: 8 }}
      >
        <List>
          <ListItem key={"label"} disableGutters>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              px={1}
            >
              <Typography fontWeight="bold">User ID</Typography>
              <Typography color="text.secondary">Time</Typography>
            </Box>
          </ListItem>

          {users.map((user, index) => (
            <ListItem key={index} disableGutters>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                px={1}
              >
                <Typography fontWeight="bold">ID: {user.id}</Typography>
                <Typography color="text.secondary">{user.time}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default ActiveUsers;
