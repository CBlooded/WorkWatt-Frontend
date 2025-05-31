import "./navbar.css";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function navbar() {
  return (
    <>
      <div className="slider">
        <div className="sidebar">
          <div className="title">WorkWatt</div>
          <div className="logo">
            {/* <img src="/src/resources/logo.png" alt="Workwatt" /> */}
          </div>
          <div className="link">
            <HomeIcon />
            <a href="/">Home</a>
          </div>
          <div className="link">
            <InfoOutlineIcon />
            <a href="/About">About</a>
          </div>
          <div className="link">
            <CallIcon />
            <a href="/Contact">Contact</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default navbar;
