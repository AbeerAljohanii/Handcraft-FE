import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated,
  isUserDataLoading,
  element,
  shouldCheckAdmin,
  userData,
  shouldCheckArtist,
}) {
  if (isUserDataLoading) {
    return <div>Loading...</div>;
  }
  console.log(isAuthenticated);
  console.log("Element:", element);

  // Check if the user is admin
  if (shouldCheckAdmin) {
    return isAuthenticated && userData.role === "Admin" ? (
      element
    ) : (
      <Navigate to="/signin" />
    );
  }

  // Check if the user is artist
  if (shouldCheckArtist) {
    return isAuthenticated && userData.role === "Artist" ? (
      element
    ) : (
      <Navigate to="/signin" />
    );
  }

  return isAuthenticated ? element : <Navigate to="/signin" replace />;
}
