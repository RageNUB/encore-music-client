import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import signupImg from "../../assets/undraw_sign_up_n6im.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Register = () => {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
  const [isShow, setIsShow] = useState(false)
  const [isShow2, setIsShow2] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      console.log(result);

      updateUserProfile(data.name, data.photoURL).then(() => {
        // const saveUser = {name: data.name, email: data.email, role: "student"}

        axios
          .post("http://localhost:5000/users", {
            name: data.name,
            image: data.photoURL,
            email: data.email,
            role: "student",
          })
          .then((data) => {
            console.log(data.data.insertedId);
            if (data.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Account created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
      });
    });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        axios
          .post("http://localhost:5000/users", {
            name: loggedUser.displayName,
            image: loggedUser.photoURL,
            email: loggedUser.email,
            role: "student",
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggle = () => {
    setIsShow(!isShow)
  }
  const toggle2 = () => {
    setIsShow2(!isShow2)
  }

  return (
    <div className="bg-base-200 min-h-screen pt-12">
      <Helmet>
        <title>Encore Music Academy | Sign Up</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-3xl font-bold ">Welcome To Encore Music Academy</h1>
        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
      </div>
      <div className="hero bg-base-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="hero-content flex-col gap-8 lg:flex-row-reverse mt-8"
        >
          <div className="text-center lg:text-left md:w-1/2">
            <img src={signupImg} alt="" />
          </div>
          <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 md:w-1/2">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  name="photo"
                  className="input input-bordered"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
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
              <div className="flex justify-between items-center gap-4">
                <div className="w-full">
                  <input
                    type={isShow ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">Password is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one Lowercase and one
                      special character.
                    </p>
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
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
              <div className="flex justify-between items-center gap-4">
                <div className="w-full">
                <input
                  type={isShow2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  {...register("confirmPass", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                />
                {errors.confirmPass?.type === "required" && (
                  <span className="text-red-600">
                    Confirm Password is required
                  </span>
                )}
                {errors.confirmPass?.type === "validate" && (
                  <span className="text-red-600">Password not matched</span>
                )}
                </div>
                <div onClick={toggle2}>
                  {!isShow2 && (
                    <span className="text-xl">
                      <FaEyeSlash></FaEyeSlash>
                    </span>
                  )}
                  {isShow2 && (
                    <span className="text-xl">
                      <FaEye></FaEye>
                    </span>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
              <p>
                <small>
                  Already Have an Account?{" "}
                  <Link to="/login" className="underline">
                    Login Here
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

export default Register;
