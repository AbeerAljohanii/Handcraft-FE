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
  Avatar,
} from "@mui/material";
import DrawerComp from "./CustomDrawer";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import LogoutIcon from "@mui/icons-material/Logout";

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

export default function NavBar({
  isAuthenticated,
  setIsAuthenticated,
  userData,
  setUserData,
}) {
  // Conditionally add Dashboard or My Artworks to the pages
  const pagesWithRole = [
    ...PAGES,
    ...(userData && userData.role === "Admin"
      ? [{ label: "Dashboard", path: "/dashboard" }]
      : []),
    ...(userData && userData.role === "Artist"
      ? [{ label: "My Artworks", path: "/my-artworks" }]
      : []),
  ];

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

  // Logout feature (apply later)
  function logOutHandler() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/home");
    setValue(0);
    // setUserData(null) => in profile or app
  }

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
                <DrawerComp
                  isAuthenticated={isAuthenticated}
                  logOutHandler={logOutHandler}
                  userData={userData}
                />
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
              {pagesWithRole.map((page) => (
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
              {isAuthenticated ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link to="profile">
                    <Avatar
                      alt="user icon"
                      src={avatar}
                      sx={{ marginRight: 2 }}
                    />
                  </Link>
                  <Button
                    sx={buttonStyles}
                    variant="contained"
                    onClick={logOutHandler}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <>
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
                </>
              )}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
