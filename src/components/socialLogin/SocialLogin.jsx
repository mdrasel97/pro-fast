import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleLogIn } = useAuth();

  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        console.log(result.user);
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
