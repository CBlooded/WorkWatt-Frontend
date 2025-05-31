import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import LoginForm from "./components/LoginForm";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";


function App() {
  return (
    <>
      <div className="app">

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <ProtectedRoute>
            <Route path="/tempRegister" />
            <Route path="/register" / element={<RegisterForm />}>
            <Route path="/dashboard" />
          </ProtectedRoute>
        </Routes>
      </div>
    </>
  );
}

export default App;
