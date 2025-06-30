import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/socialLogin/SocialLogin";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState();
  const axiosInstant = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  // console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        // update user profile in database

        const userInfo = {
          email: data.email,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        const userRes = await axiosInstant.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile);
        navigate(from);
        // from reset
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleImageUpload = (e) => {
  //   const image = e.target.files[0];
  //   console.log(image);
  // };
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic("Image URL:", res.data.data.url);
      // You can now save res.data.data.url to your database
    } catch (error) {
      console.error("Image upload failed:", error);
    }
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
          {/* name field  */}
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your Name"
              className="input w-full"
            />
            {/* {errors.mail && <p role="alert">{errors.mail.message}</p>}
             */}
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required </p>
            )}
          </div>
          {/* image  field  */}
          <div>
            <label className="label">
              <span className="label-text">Profile</span>
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              placeholder="upload your profile image"
              className="input w-full"
            />
            {/* {errors.mail && <p role="alert">{errors.mail.message}</p>}
             */}
          </div>
          {/* email field  */}
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
          <Link
            state={{ from }}
            to={"/login"}
            className="text-primary underline"
          >
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
