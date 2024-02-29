import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div className="app">
      <Navbar />
      <Toaster
        toastOptions={{
          className: "text-main",
          style: {
            border: "1px solid #0aad0a",
            padding: "16px",
          },
        }}
      />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
