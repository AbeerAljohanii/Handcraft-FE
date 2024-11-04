import React, { useState } from "react";
import logo from "../../assets/logo.png";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import DrawerComp from "./CustomDrawer";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation

const tabStyles = {
  textTransform: "none",
  fontWeight: "bold",
  fontSize: 19,
  color: "#603813",
  "&.Mui-selected": {
    color: "#054C42", // Color when tab is selected
  },
  "&:hover": {
    color: "#054C42", // Color when hovering over a tab
  },
};

const buttonStyles = {
  fontSize: 16,
  background: "#603813",
  textTransform: "none",
};

const indicatorStyles = {
  "& .MuiTabs-indicator": {
    backgroundColor: "#054C42",
    color: "#603813",
  },
  marginLeft: "3%",
};

const PAGES = [
  { label: "Home", path: "/" },
  { label: "Shop Artwork", path: "/artworks" },
  { label: "Workshop", path: "/workshops" },
  { label: "About Us", path: "/aboutUs" },
  { label: "Contact Us", path: "/contactUs" },
];

export default function NavBar() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <AppBar sx={{ background: "#F2E9E4" }}>
      <Toolbar>
        {isMatch ? (
          <>
            <Box display="flex" alignItems="center" width="100%">
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "60px",
                }}
              />
              <Box marginLeft="auto">
                <DrawerComp />
              </Box>
            </Box>
          </>
        ) : (
          <Box display="flex" alignItems="center" width="100%">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "80px",
              }}
            />
            <Tabs
              value={value}
              onChange={(e, value) => setValue(value)}
              sx={indicatorStyles}
            >
              {PAGES.map((page) => (
                <Tab
                  key={page.path}
                  label={page.label}
                  sx={tabStyles}
                  component={Link}
                  to={page.path}
                />
              ))}
            </Tabs>
            <Box marginLeft="auto">
              <Button
                sx={buttonStyles}
                variant="contained"
                onClick={handleSignIn}
              >
                Login
              </Button>
              <Button
                sx={{ marginLeft: "10px", ...buttonStyles }}
                variant="contained"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
