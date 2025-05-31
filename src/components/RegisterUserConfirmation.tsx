import { TextField, Button, Box, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosConfig from "../api/AxiosConfig";

type tempRegTypes = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tempRegTypes>();

  const onSubmit = async (data: tempRegTypes) => {
    try {
      const response = await AxiosConfig.post(
        "/api/v1/auth/authenticate",
        data
      );

      console.log("succesful confirmation", response.data);
    } catch (error) {
      console.error("An error occurred during user confirmation:", error);
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
          fontSize: "1.5rem",
          fontWeight: 500,
          mb: 1,
          color: "var(--color-accent)",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Confrim account
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
        Confirm
      </Button>
    </Box>
  );
};

export default LoginForm;
