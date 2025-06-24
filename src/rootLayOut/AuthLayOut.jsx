import React from "react";
import authImg from "../assets/authImage.png";
import { Outlet } from "react-router";
import Logo from "../components/logo/Logo";

const AuthLayOut = () => {
  return (
    <>
      <Logo />
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-base-200">
        <Outlet />

        {/* Right side: Image */}
        <div className="md:w-1/2 w-full p-4">
          <img
            src={authImg}
            alt="Login Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default AuthLayOut;
