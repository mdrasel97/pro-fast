import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loading/Loading";
import { Navigate, useLocation, useNavigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to={"/login"}></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
