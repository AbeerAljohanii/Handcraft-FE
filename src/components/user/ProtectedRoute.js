import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated,
  isUserDataLoading,
  element,
}) {
  if (isUserDataLoading) {
    return <div>Loading...</div>;
  }
  console.log(isAuthenticated);
  console.log("Element:", element);

  return isAuthenticated ? element : <Navigate to="/signin" replace />;
}
