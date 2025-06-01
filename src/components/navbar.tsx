import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Changed from react-router
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Divider from "@mui/material/Divider";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const role = Number(sessionStorage.getItem("role"));

const pages = [
  { name: "Home", path: "/", icon: <HomeIcon />, roles: [0, 1, 2] },
  {
    name: "Register new user",
    path: "/register",
    icon: <PersonAddIcon />,
    roles: [0, 1],
  },
  {
    name: "Dashboard",
    path: "/Dashboard",
    icon: <ContactPageIcon />,
    roles: [0, 1, 2],
  },
  { name: "About", path: "/About", icon: <InfoIcon />, roles: [0, 1, 2] },
];

const drawerWidth = 240;

function Navbar({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ height: "100%", backgroundColor: "var(--color-secondary)" }}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <ElectricalServicesIcon sx={{ color: "#000000" }} />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Roboto",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "#000000",
          }}
        >
          WorkWatt
        </Typography>
      </Box>
      <Divider />
      <List>
        {pages
          .filter((page) => page.roles.includes(role))
          .map((page) => (
            <ListItem key={page.name} disablePadding sx={{ p: 2 }}>
              <ListItemButton
                onClick={() => handleNavigation(page.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {page.icon && (
                  <ListItemIcon sx={{ color: "#000000" }}>
                    {page.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={page.name}
                  primaryTypographyProps={{
                    sx: {
                      color: "#000000",
                      fontWeight: "bold",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 10,
            left: 25,
            zIndex: 1200,
            bgcolor: "#9abd97",
            "&:hover": {
              bgcolor: "#8aac87",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Navbar;
