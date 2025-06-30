import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const SocialLogin = () => {
  const { googleLogIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstant = useAxios();

  const handleGoogleLogin = () => {
    googleLogIn()
      .then(async (result) => {
        const user = result.user;

        console.log(user);
        // update user profile in database
        const userInfo = {
          email: user.email,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        const userRes = await axiosInstant.post("/users", userInfo);
        console.log("update user", userRes.data);
        navigate(from);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
      {/* 🔐 Social Login */}
      <div className="my-6">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaGoogle className="text-lg" />
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
