import React, { useEffect, useState } from "react";
import {
  Paper,
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type User = {
  userId: string;
  userFullName: string;
  computerName: string;
  start: Date;
  delete: boolean;
};

function ActiveUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Setup STOMP client inside the effect
    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/api/v1/usage/active"),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      setConnecting(false);

      // Subscribe to user updates
      stompClient.subscribe(
        `/topic/updates/${sessionStorage.getItem("userId")}`,
        (message) => {
          try {
            console.log("Received message:", message.body);
            const parsedData = JSON.parse(message.body);

            // Determine if the data is an array or a single object
            let usersToAdd: User[] = [];

            if (Array.isArray(parsedData)) {
              // It's an array of users
              usersToAdd = parsedData;
            } else if (parsedData && typeof parsedData === "object") {
              // It's a single user object
              usersToAdd = [parsedData];
            } else {
              console.error("Unexpected data format:", parsedData);
              return;
            }

            // Convert string dates to Date objects
            const usersWithDates = usersToAdd.map((user) => ({
              ...user,
              start: new Date(user.start),
            }));

            // Update users with new data (avoiding duplicates)
            setUsers((prevUsers) => {
              // Create a map of existing users by ID
              const userMap = new Map(
                prevUsers.map((user) => [user.userId, user])
              );

              // Add or update users
              usersWithDates.forEach((user) => {
                userMap.set(user.userId, user);
              });

              // Convert map back to array
              return Array.from(userMap.values());
            });
          } catch (err) {
            console.error("Error parsing message:", err);
            setError("Failed to process server data");
          }
        }
      );
    };

    stompClient.onStompError = (frame) => {
      console.error("STOMP error:", frame);
      setError("Connection error occurred");
      setConnecting(false);
    };

    // Activate connection
    stompClient.activate();

    // Clean up function
    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, []);

  // Format date to readable string
  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxHeight: "30vh",
        width: "100%",
        borderRadius: "20px",
        minWidth: "300px",
        overflowY: "auto",
        p: 2,
      }}
    >
      <List disablePadding>
        <ListItem disableGutters>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography fontWeight="bold">User</Typography>
            <Typography color="text.secondary">Active Since</Typography>
          </Box>
        </ListItem>

        {connecting ? (
          <ListItem>
            <Box display="flex" justifyContent="center" width="100%">
              <CircularProgress size={24} />
            </Box>
          </ListItem>
        ) : error ? (
          <ListItem>
            <Typography
              color="error"
              sx={{ width: "100%", textAlign: "center" }}
            >
              {error}
            </Typography>
          </ListItem>
        ) : users.length > 0 ? (
          users
            .filter((user) => !user.delete) // Filter out users where enable is true
            .map((user) => (
              <ListItem key={user.userId} disableGutters>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography>{user.userFullName}</Typography>
                  <Typography color="text.secondary">
                    {formatDate(user.start)}
                  </Typography>
                </Box>
              </ListItem>
            ))
        ) : (
          <ListItem>
            <Typography
              color="text.secondary"
              sx={{ width: "100%", textAlign: "center" }}
            >
              No active users
            </Typography>
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

export default ActiveUsers;
