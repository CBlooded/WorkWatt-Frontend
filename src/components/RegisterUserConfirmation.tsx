import { TextField, Button, Box, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosConfig from "../api/AxiosConfig";
import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router";

type tempRegTypes = {
  tempPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tempRegTypes>();

  // check if hostId is correct
  const [hostUUID, setHostUUID] = useState<string>("");
  const params = useParams();
  const feedback = useRef<HTMLParagraphElement>(null);
  let userConfirmed = false;

  useEffect(() => {
    setHostUUID(params.hostUUID || "");
    try {
      const response = AxiosConfig.get(
        //TODO: change endpoint var
        `/api/v1/account/confirm?hostId=${params.hostUUID}`
      );
      // console.log(response);
      response
        .then(() => {
          console.log(hostUUID);
          feedback.current!.textContent = "";
          userConfirmed = true;
        })
        .catch((err) => {
          feedback.current!.textContent = "Error occured, no hostId";
          console.log(err);
          userConfirmed = false;
        });
    } catch (error) {
      console.log(`error:${error}`);
    }
  }, [params.hostUUID]);

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
          label="Enter temporary password"
          variant="outlined"
          // disabled={true}
          {...register("tempPassword", { required: "Email is required" })}
          sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: 2 }}
          error={!!errors.tempPassword}
          helperText={errors.tempPassword?.message}
        />

        {userConfirmed && (
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
        )}

        {userConfirmed && (
          <TextField
            label="Repeat new password"
            type="password"
            variant="outlined"
            {...register("newPasswordRepeat", {
              required: "Password is required",
            })}
            sx={{
              backgroundColor: "white",
              boxShadow: 1,
              borderRadius: 2,
            }}
            error={!!errors.newPasswordRepeat}
            helperText={errors.newPasswordRepeat?.message}
          />
        )}

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

export default LoginForm;
