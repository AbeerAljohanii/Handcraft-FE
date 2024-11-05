import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";

function Layout({ isAuthenticated, setIsAuthenticated }) {
  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Outlet />
    </>
  );
}

export default Layout;
