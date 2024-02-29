import React from "react";
import { Navigate } from "react-router-dom";

export default function Guard({ children }) {
  if (localStorage.getItem("userToken")) return children;

  return <Navigate to={"/e-commerce/login"}></Navigate>;
}
