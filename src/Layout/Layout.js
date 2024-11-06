import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";

function Layout({
  isAuthenticated,
  setIsAuthenticated,
  userData,
  setUserData,
}) {
  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userData={userData}
        setUserData={setUserData}
      />
      <Outlet />
    </>
  );
}

export default Layout;
