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

import RegisterUser from "./components/RegisterUserConfirmation";
import SingleUserChart from "./components/SingleUserChart";
import RegisterUserConfirmation from "./components/RegisterUserConfirmation";
// import SingleUserChart from './components/SingleUserChart'

function App() {
  const role = 0;
  const token = "abc";
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("role", String(role));
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
              <Route path="/dashboard" />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
