// import React, { useEffect, useState, useRef } from "react";
// import { Paper, List, ListItem, Box, Typography } from "@mui/material";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";

// type User = {
//   userId: string;
//   userFullName: string;
//   computerName: string;
//   start: Date;
// };

// function ActiveUsers({ supervisorId = "supervisor1" }) {
//   const [users, setUsers] = useState<User[]>([]);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     const stompClient = new Client({
//       webSocketFactory: () =>
//         new SockJS("http://localhost:8080/api/v1/usage/active"),
//       reconnectDelay: 5000,
//       onConnect: () => {
//         stompClient.subscribe(`/topic/updates/${supervisorId}`, (message) => {
//           const data = JSON.parse(message.body);

//           setUsers((prevUsers) => {
//             const existing = prevUsers.find((u) => u.userId === data.userId);
//             const newUser = {
//               userId: data.userId,
//               userFullName: data.userFullName,
//               computerName: data.computerName,
//               start: new Date(data.start),
//             };

//             if (existing) {
//               return prevUsers.map((u) =>
//                 u.userId === data.userId ? newUser : u
//               );
//             } else {
//               return [...prevUsers, newUser];
//             }
//           });
//         });
//       },
//     });

//     stompClient.activate();

//     return () => {
//       stompClient.deactivate();
//     };
//   }, [supervisorId]);

//   useEffect(() => {
//     // Update uptime every second
//     intervalRef.current = setInterval(() => {
//       setUsers((prevUsers) => [...prevUsers]); // Triggers a re-render
//     }, 1000);

//     return () => {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   const formatDuration = (startTime: Date) => {
//     const now = new Date();
//     const diffMs = now.getTime() - startTime.getTime();

//     const totalSeconds = Math.floor(diffMs / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         maxHeight: "30vh",
//         width: "100%",
//         borderRadius: "20px",
//         minWidth: "300px",
//         overflowY: "auto",
//         p: 2,
//       }}
//     >
//       <List disablePadding>
//         <ListItem disableGutters>
//           <Box display="flex" justifyContent="space-between" width="100%">
//             <Typography fontWeight="bold">User</Typography>
//             <Typography color="text.secondary">Uptime</Typography>
//           </Box>
//         </ListItem>

//         {users.map((user) => (
//           <ListItem key={user.userId} disableGutters>
//             <Box display="flex" justifyContent="space-between" width="100%">
//               <Typography>{user.userFullName}</Typography>
//               <Typography color="text.secondary">
//                 {formatDuration(user.start)}
//               </Typography>
//             </Box>
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// }

// export default ActiveUsers;
