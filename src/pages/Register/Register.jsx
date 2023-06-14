import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import signupImg from "../../assets/undraw_sign_up_n6im.svg";

const Register = () => {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
        console.log(result);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-base-200 min-h-screen pt-12">
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
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
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one Lowercase and one
                    special character.
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  {...register("confirmPass", { 
                    required: true,
                    validate: (value) => value === watch('password')
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
