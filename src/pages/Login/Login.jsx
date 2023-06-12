import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/undraw_login_re_4vu2.svg";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const onSubmit = (data) => {
        signIn(data.email, data.password).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
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
