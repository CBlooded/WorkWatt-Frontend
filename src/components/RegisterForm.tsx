import { TextField, Box, InputLabel, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosConfig from "../api/AxiosConfig";

type RegisterTypes = {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTypes>();

  const onSubmit = async (data: RegisterTypes) => {
    try {
      await AxiosConfig.post("/api/v1/auth/register", data);
    } catch (error) {
      console.error("An error occurred during registration:", error);
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
        Register
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
        label="First Name"
        type="text"
        variant="outlined"
        {...register("firstName", { required: "First Name is required" })}
        sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: 2 }}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Last Name"
        type="text"
        variant="outlined"
        {...register("lastName", { required: "Last Name is required" })}
        sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: 2 }}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="Role"
        type="number"
        variant="outlined"
        {...register("role", {
          required: "Role is required",
          validate: (value) => [2, 3].includes(Number(value)),
        })}
        sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: 2 }}
        error={!!errors.role}
        helperText={errors.role?.message}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-text-dark)",
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
