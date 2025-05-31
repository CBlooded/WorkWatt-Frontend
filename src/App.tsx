import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
import TempRegister from "./components/RegisterUserConfirmation";

function App() {
  return (
    <>
      <div className="app">
        {/* <LoginForm></LoginForm> */}
        {/* <RegisterForm></RegisterForm> */}
        <TempRegister></TempRegister>
      </div>
    </>
  );
}

export default App;
