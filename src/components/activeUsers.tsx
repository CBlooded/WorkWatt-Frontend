
import { Paper, List, ListItem, Box, Typography } from "@mui/material";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs"




function ActiveUsers() {
  const [users, setUsers] = useState<{ id: string; time: string }[]>([]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // backend WS endpoint
      reconnectDelay: 5000,
      onConnect: () => {
        console.log(" Connected to WebSocket");

        client.subscribe("/topic/active-users", (message) => {

          if (message.body) {
            try {
              const data = JSON.parse(message.body);
              if (Array.isArray(data)) {
                setUsers(data);
              } else {
                console.warn("Received non-array WebSocket data:", data);
              }
            } catch (err) {
              console.error(" Failed to parse WebSocket message:", err);
            }
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);


  

  const usersSample = [
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
