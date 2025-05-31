// import React from "react";
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

import image from '../resources/bulbIMG.png';
import image2 from '../resources/hardwareIMG.png';
import image3 from '../resources/green.png';

const LoginPage = () => {
  return (
    <div className="rowContainer">
      <div className="upperSection">
        <div className="loginContainer">
          <Box>
            <LoginForm />
          </Box>
        </div>
        <div className="cite">This app is made with love</div>
      </div>
      <div className="displayGallery">
        <img src={image} alt="Example" />
        <img src={image2} alt="Example" />
        <img src={image3} alt="Example" />
      </div>
    </div>
  );
};

export default LoginPage;
