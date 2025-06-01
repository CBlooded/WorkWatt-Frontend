import "./App.css";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import RegisterUser from "./components/RegisterUserConfirmation";
import SingleUserChart from "./components/SingleUserChart";
import RegisterUserConfirmation from "./components/RegisterUserConfirmation";
import Dashboard from "./pages/dashboards";
import SetupInterceptors from "./api/SetupInterceptors";

function App() {
  useEffect(() => {
    SetupInterceptors();
  }, []);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/account/confirm?/*"
              element={<RegisterUserConfirmation />}
            />
            <Route path="/account/register" element={<RegisterForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tempRegister" />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/* <SingleUserChart /> */}
    </>
  );
}

export default App;
