import { TextField, Button, Box, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosConfig from "../api/AxiosConfig";
import { useRef } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

// import { useParams, useSearchParams } from "react-router";

type tempRegTypes = {
  hostId: string;
  newPassword: string;
};

const RegisterUserConfirmationPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tempRegTypes>();

  const hostId = sessionStorage.getItem("hostid");

  const [searchParams] = useSearchParams();

  const feedback = useRef<HTMLParagraphElement>(null);

  const onSubmit = async (data: tempRegTypes) => {
    try {
      const submitData = {
        //@ts-ignore
        hostId,
        ...data,
      };
      const response = await AxiosConfig.post(
        `/api/v1/user/password/set`,
        submitData
      );

      console.log("succesful confirmation", response.data);
      navigate("/");
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
          Confirm account
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
