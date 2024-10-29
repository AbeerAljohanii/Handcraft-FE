import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../navbar/NavBar.css";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
} from "@mui/material";
import DrawerComp from "./CustomDrawer";

const tabStyles = {
  color: "black",
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

const PAGES = ["Shop Artwork", "Workshop", "About Us", "Contact Us"];

export default function NavBar() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <AppBar sx={{ background: "#F2E9E4" }}>
      <Toolbar>
        {isMatch ? (
          <>
            <Box display="flex" alignItems="center" width="100%">
              <img className="navbar-logo" src={logo} alt="Logo" />
              <Box marginLeft="auto">
                <DrawerComp />
              </Box>
            </Box>
          </>
        ) : (
          <Box display="flex" alignItems="center" width="100%">
            <img className="navbar-logo" src={logo} alt="Logo" />
            <Tabs
              value={value}
              onChange={(e, value) => setValue(value)}
              sx={indicatorStyles}
            >
              {PAGES.map((page, index) => (
                <Tab key={index} label={page} sx={tabStyles} />
              ))}
              
            </Tabs>
            <Box marginLeft="auto">
              <Button sx={buttonStyles} variant="contained">
                Login
              </Button>
              <Button
                sx={{ marginLeft: "10px", ...buttonStyles }}
                variant="contained"
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
