import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import SocialLogin from "../../../components/socialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate(from);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
      {/* Left side: Text + Form */}
      <div className="md:w-1/2 w-full p-8 md:p-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Welcome Back!
        </h2>
        <p className="mb-8 text-gray-600">
          Please log in to your account to continue using ProFast services.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="input w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="input input-bordered text-xl w-full"
              required
            />
          </div>

          <button className="btn btn-primary w-full mt-4">Login</button>
        </form>

        <SocialLogin />

        <p className="mt-4 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-primary underline">
            Register here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
