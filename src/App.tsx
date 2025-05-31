import "./App.css";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Route, Routes, BrowserRouter } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./pages/LoginPage";
import RegisterUser from "./components/RegisterUserConfirmation";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/account/confirm" element={<RegisterUser />} />
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
