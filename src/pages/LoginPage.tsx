import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
const LoginPage = () => {
  return (
    <Navbar>
      <Box>
        <LoginForm />
      </Box>
    </Navbar>
  );
};

export default LoginPage;
