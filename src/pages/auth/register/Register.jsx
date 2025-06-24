import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/socialLogin/SocialLogin";

const Register = () => {
  const { createUser } = useAuth();
  // console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/* Left side: Text + Form */}
      <div className="md:w-1/2 w-full p-8 md:p-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Create Account!
        </h2>
        <p className="mb-8 text-gray-600">
          Please register your account to continue using ProFast services.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="input w-full"
            />
            {/* {errors.mail && <p role="alert">{errors.mail.message}</p>}
             */}
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Enter your password"
              className="input input-bordered text-xl w-full"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">minLength is required</p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-4">Register</button>
        </form>

        <SocialLogin />

        <p className="mt-4 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to={"/login"} className="text-primary underline">
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
