import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link for navigation

function DrawerComp() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const PAGES = [
    { label: "Home", path: "/" },
    { label: "Shop Artwork", path: "/artworks" },
    { label: "Workshop", path: "/workshops" },
    { label: "About Us", path: "/aboutUs" },
    { label: "Contact Us", path: "/contactUs" },
  ];
  const SignInUpStyles = {
    backgroundColor: "#603813",
    color: "white",
    border: "2px solid #A5978B",
    "&:hover": {
      backgroundColor: "#5a331d",
    },
  };
  return (
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#f2e9e4",
            color: "#603813",
          },
        }}
      >
        <List>
          {PAGES.map((page) => (
            <ListItemButton
              component={Link}
              to={page.path}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => setOpenDrawer(false)}
              key={page.path}
            >
              <ListItemText primary={page.label} />
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={() => setOpenDrawer(false)}
            sx={SignInUpStyles}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton
            onClick={() => setOpenDrawer(false)}
            sx={SignInUpStyles}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
}

export default DrawerComp;
