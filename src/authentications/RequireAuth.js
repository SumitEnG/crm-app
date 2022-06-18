import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const dataOfUser = JSON.parse(localStorage.getItem("dataOfUser"));

  return dataOfUser.userType === allowedRoles[0] ? (
    <Outlet />
  ) : dataOfUser.userType ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/notFound" state={{ from: location }} replace />
  );
}

export default RequireAuth;
