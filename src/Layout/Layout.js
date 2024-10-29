import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
