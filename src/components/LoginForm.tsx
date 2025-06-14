import { TextField, Button, Box, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosConfig from "../api/AxiosConfig";
import { useNavigate } from "react-router";
import { jwtDecode, type JwtPayload } from "jwt-decode";

type LoginTypes = {
  email: string;
  password: string;
};

interface CustomJwtPayload extends JwtPayload {
  id: string;
  Role: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTypes>();

  const onSubmit = async (data: LoginTypes) => {
    try {
      console.log(data);
      const response = await AxiosConfig.post(
        "/api/v1/auth/authenticate",
        data
      );
      const token = response.data.token;
      console.log(token);

      if (token) {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        console.log(decodedToken);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", decodedToken.id);
        switch (decodedToken.Role) {
          case "EMPLOYEE":
            sessionStorage.setItem("role", "2");
            break;
          case "MANAGER":
            sessionStorage.setItem("role", "1");
            break;
          case "DIRECTOR":
            sessionStorage.setItem("role", "0");
            break;
          default:
            console.warn("Unknown role:", decodedToken.Role);
            break;
        }
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
        width: 300,
        boxShadow: 10,
        padding: 3,
      }}
    >
      <InputLabel
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          mb: 1,
          color: "var(--color-accent)",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Log in
      </InputLabel>
      <TextField
        label="Email"
        variant="outlined"
        {...register("email", { required: "Email is required" })}
        sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: 2 }}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        {...register("password", { required: "Password is required" })}
        sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: 2 }}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-text-dark)",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
