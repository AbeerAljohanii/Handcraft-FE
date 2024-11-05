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
  Avatar,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import LogoutIcon from "@mui/icons-material/Logout";

function DrawerComp({ isAuthenticated, logOutHandler }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

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
  const handleSignIn = () => {
    setOpenDrawer(false);
    navigate("/signin");
  };

  const handleSignUp = () => {
    setOpenDrawer(false);
    navigate("/signup");
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
          {isAuthenticated ? (
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginY={2}
              >
                <Link to="profile" style={{ textDecoration: "none" }}>
                  <Avatar alt="user icon" src={avatar} />
                </Link>
                <IconButton
                  onClick={logOutHandler}
                  sx={{
                    cursor: "pointer",
                    marginLeft: 2,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <ListItemButton onClick={handleSignIn} sx={SignInUpStyles}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
              <ListItemButton onClick={handleSignUp} sx={SignInUpStyles}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
}

export default DrawerComp;
