import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <h2 className="text-3xl -ml-2 font-bold">ProFast</h2>
      </div>
    </Link>
  );
};

export default Logo;
