import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/undraw_login_re_4vu2.svg";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signIn, googleSignIn } = useAuth();
  const [error, setError] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome to Encore Music Academy",
          showConfirmButton: false,
          timer: 1500,
        });
        setError(false);
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        axios
          .post("http://localhost:5000/users", {
            name: loggedUser.displayName,
            email: loggedUser.email,
            role: "student",
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Welcome to Encore Music Academy",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggle = () => {
    setIsShow(!isShow)
  };

  return (
    <div className="bg-base-200 min-h-screen pt-12">
      <Helmet>
        <title>Encore Music Academy | Login</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-3xl font-bold ">Welcome To Encore Music Academy</h1>
        <h1 className="text-5xl font-bold">Login now!</h1>
      </div>
      <div className="hero bg-base-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="hero-content flex-col lg:flex-row-reverse mt-8"
        >
          <div className="text-center lg:text-left md:w-1/2">
            <img src={loginImg} alt="" />
          </div>
          <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 md:w-1/2">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className=" flex justify-between items-center gap-4">
                <div className="w-full">
                  <input
                    type={isShow ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-red-600">Password is required</span>
                  )}
                  {error && (
                    <span className="text-red-600">Wrong Password</span>
                  )}
                </div>
                <div onClick={toggle}>
                  {!isShow && (
                    <span className="text-xl">
                      <FaEyeSlash></FaEyeSlash>
                    </span>
                  )}
                  {isShow && (
                    <span className="text-xl">
                      <FaEye></FaEye>
                    </span>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p>
                <small>
                  New to Encore Music Academy{" "}
                  <Link to="/register" className="underline">
                    Please Register
                  </Link>
                </small>
              </p>
              <div className="divider">OR</div>
              <div className="rounded-full flex justify-center">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-wide btn-outline text-primary hover:bg-primary hover:border-none mb-2"
                >
                  <FaGoogle className="mr-2"></FaGoogle>login with Google
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
