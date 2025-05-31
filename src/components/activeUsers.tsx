import { Paper, List, ListItem, Box, Typography } from "@mui/material";

function ActiveUsers() {
  const users = [
    { id: "user1", time: "21 hours 25 minutes" },
    { id: "user2", time: "21 hours 43 minutes" },
    { id: "user3", time: "43 hours 12 minutes" },
  ];

  return (
    <Paper
      style={{
        maxHeight: "30vh", // 30% of viewport height
        width: "80vw", // 80% of viewport width
        overflow: "auto",
        padding: "2vw", // Responsive padding
        margin: "auto", // Center horizontally
      }}
    >
      <List>
        {/* labels */}
        <ListItem key={"label"} disableGutters>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            px="1vw"
          >
            <Typography fontWeight="bold">User ID</Typography>
            <Typography color="text.secondary">Uptime</Typography>
          </Box>
        </ListItem>

        {/* values */}
        {users.map((user, index) => (
          <ListItem key={index} disableGutters>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              px="1vw"
            >
              <Typography fontWeight="bold">ID: {user.id}</Typography>
              <Typography color="text.secondary">{user.time}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ActiveUsers;
