import { TextField, Button, Box, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import AxiosConfig from "../api/AxiosConfig";
import { useRef } from "react";

import { useSearchParams } from "react-router";
import RegisterNewPassword from "./RegisterUserConfirmationPassword";

type tempRegTypes = {
  tempPassword: string;
};

const RegisterUserConfirmation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tempRegTypes>();

  const feedback = useRef<HTMLParagraphElement>(null);
  const userConfirmed = useRef<boolean>(false);
  // let userConfirmed = false;

  const [searchParams] = useSearchParams();
  const h = searchParams.get("h");
  const hostid = sessionStorage.setItem("hostid", h ?? "");

  /*useEffect(() => {
    try {
      console.log("current host id: ", h);
      const response = AxiosConfig.get(
        //TODO: change endpoint var
        `/api/v1/user/password/host/validate?h=${h}&t=${t}`
      );
      response
        .then(() => {
          // user confirmation
          feedback.current!.textContent = "user confirmed";
          userConfirmed.current = true;
        })
        .catch((err) => {
          // error & user not confirmed
          feedback.current!.textContent = "Error occured, no hostId";
          console.log("error: ", err);
          userConfirmed.current = false;
        });
    } catch (error) {
      console.log(`error:${error}`);
    }
  }, [h]);*/

  const onSubmit = async (data: tempRegTypes) => {
    try {
      // TODO: check temp password
      console.log(
        `/api/v1/user/password/host/validate?h=${h}&t=${data.tempPassword}`
      );
      const response = await AxiosConfig.get(
        `/api/v1/user/password/host/validate?h=${h}&t=${data.tempPassword}`
      );

      console.log("succesful confirmation", response.data);
      userConfirmed.current = true;
    } catch (error) {
      console.error("An error occurred during user confirmation:", error);
      userConfirmed.current = false;
    }
  };

  return (
    <>
      {!userConfirmed.current && (
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

          <div ref={feedback}></div>
          <TextField
            label="Enter temporary password"
            variant="outlined"
            // disabled={true}
            {...register("tempPassword", {
              required: "Temporary password is required",
            })}
            sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: 2 }}
            error={!!errors.tempPassword}
            helperText={errors.tempPassword?.message}
          />

          {/* when host and temp password is confirmed -> change to new password */}

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
      )}
      {userConfirmed.current && <RegisterNewPassword />}
    </>
  );
};

export default RegisterUserConfirmation;
