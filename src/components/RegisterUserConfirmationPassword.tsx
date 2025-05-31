import { TextField, Button, Box, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosConfig from "../api/AxiosConfig";
import { useRef } from "react";
import { useSearchParams } from "react-router";

// import { useParams, useSearchParams } from "react-router";

type tempRegTypes = {
  newPassword: string;
  newPasswordRepeat: string;
};

const RegisterUserConfirmationPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tempRegTypes>();

  const [searchParams] = useSearchParams();
  const h = searchParams.get("h");

  const feedback = useRef<HTMLParagraphElement>(null);

  const onSubmit = async (data: tempRegTypes) => {
    try {
      // todo: set new password
      // POST /api/v1/user/password/set?h=...&n=...
      const response = await AxiosConfig.post(
        `/api/v1/user/password/set?h=${h}&n=${data.newPassword}`
      );

      console.log("succesful confirmation", response.data);
    } catch (error) {
      console.error("An error occurred during user confirmation:", error);
    }
  };

  return (
    <>
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

        <div ref={feedback}> </div>

        <TextField
          label="New password"
          type="password"
          variant="outlined"
          {...register("newPassword", { required: "Password is required" })}
          sx={{
            backgroundColor: "white",
            boxShadow: 1,
            borderRadius: 2,
          }}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />

        <TextField
          label="Repeat new password"
          type="password"
          variant="outlined"
          {...register("newPasswordRepeat", {
            required: "Repeat password is required",
          })}
          sx={{
            backgroundColor: "white",
            boxShadow: 1,
            borderRadius: 2,
          }}
          error={!!errors.newPasswordRepeat}
          helperText={errors.newPasswordRepeat?.message}
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
    </>
  );
};

export default RegisterUserConfirmationPassword;
