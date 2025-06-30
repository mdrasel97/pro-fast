import React from "react";
import { Link, Outlet } from "react-router";
import Logo from "../components/logo/Logo";
import { FaMotorcycle, FaClock, FaUserShield } from "react-icons/fa";

import {
  FaHome,
  FaBoxOpen,
  FaPlusSquare,
  FaHistory,
  FaSearchLocation,
  FaUserEdit,
} from "react-icons/fa";

const DashboardLayOut = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <Link to={"/dashboard/myParcels"}>My Parcels</Link>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Main Content */}
        <div>
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-200 text-base-content min-h-full">
          <Logo />
          <li className="flex gap-2">
            <Link to={"/"}>
              <FaHome />
              Home
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/myParcels"}>
              <FaBoxOpen />
              My Parcels
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/addParcel"}>
              <FaPlusSquare />
              Add Parcels
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/paymentHistory"}>
              <FaHistory />
              Payment History
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/track"}>
              <FaSearchLocation />
              Track a Package
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/profile"}>
              <FaUserEdit />
              Update Profile
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/activeRiders"}>
              <FaMotorcycle />
              Active Riders
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/pendingRiders"}>
              <FaClock />
              Pending Riders
            </Link>
          </li>
          <li className="flex gap-2">
            <Link to={"/dashboard/manageAdmins"}>
              <FaUserShield />
              Manage Admins
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayOut;
