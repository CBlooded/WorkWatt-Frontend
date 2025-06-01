# WorkWatt Frontend  
A React TypeScript web application for monitoring power usage and managing users.

# Description  
WorkWatt Frontend is a web interface for WorkWatt - a system designed to track computer power usage across an organization. It provides real-time monitoring, usage analytics, and user management.

# Features  
- User authentication and role-based access control  
- Real-time active user monitoring via WebSockets  
- Power usage visualization with charts  
- User registration via confirmation on email and management  
- Responsive Material UI interface  

# Prerequisites  
- Node.js (v16+)  
- npm or yarn  

# Installation  
1. Clone the repository  
2. Navigate to the project directory  
3. Install dependencies
4. `npm install`
5. `npm run dev`

# Project Structure  
/src - Source code  
/api - API configuration and interceptors  
/components - Reusable UI components  
/pages - Page components  
/App.tsx - Main application component  
/main.tsx - Entry point  

# Key Components  
LoginForm - User authentication  
RegisterForm - New user registration  
SingleUserChart - Power usage visualization  
ActiveUsers - Real-time user activity monitoring  
Navbar - Navigation component  

# Technologies  
React 19  
TypeScript  
Material UI 7  
Vite  
Axios  
STOMP WebSockets  
React Router  
React Hook Form  

# Backend Integration  
The application connects to a backend server at http://localhost:8080 with the following endpoints:  
Authentication: /api/v1/auth/authenticate  
User registration: /api/v1/user/password/set  
Usage history: /api/v1/usage/history  
Active users WebSocket: /api/v1/usage/active  

# Related Projects  
wortwatt-desktop: Desktop client for tracking computer power usage  

![image](https://github.com/user-attachments/assets/cd5ecd08-7853-4f89-aed0-a8fae3f15aa5)

![image](https://github.com/user-attachments/assets/3f40854e-00c4-4400-92e9-90fd1dcc830b)
![image](https://github.com/user-attachments/assets/852d3145-1598-41b4-b75f-6296067963c0)
![image](https://github.com/user-attachments/assets/ef1bf656-e7d6-44b9-8fc2-204f8a43c142)


![image](https://github.com/user-attachments/assets/14bd429f-a7cb-4a06-808b-f8b7990349d6)

![image](https://github.com/user-attachments/assets/10966291-2b17-4692-af12-339b085d5290)


