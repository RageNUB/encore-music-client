import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { DarkModeToggle } from "react-dark-mode-toggle-2";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('winter');

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
    if(isDarkMode){
      setTheme("night")
    } else {
      setTheme("winter")
    }
  }, [theme, isDarkMode]);

  const handleLogOut = () => {
    logOut()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow z-10 bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active font-bold text-white" : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active font-bold text-white" : ""
                }
                to="/instructors"
              >
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active font-bold text-white" : ""
                }
                to="/classes"
              >
                Classes
              </NavLink>
            </li>
            {user && <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active font-bold text-white" : ""
                }
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">
          <img className="h-8 lg:h-12" src={logo} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active font-bold text-white" : ""
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active font-bold text-white" : ""
              }
              to="/instructors"
            >
              Instructors
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active font-bold text-white" : ""
              }
              to="/classes"
            >
              Classes
            </NavLink>
          </li>
          {user && <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active font-bold text-white" : ""
              }
              to="/dashboard/home"
            >
              Dashboard
            </NavLink>
          </li>}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="mr-4">
        <DarkModeToggle
          onChange={setIsDarkMode}
          isDarkMode={isDarkMode}
        ></DarkModeToggle>
        </div>
        <div className="dropdown  dropdown-bottom dropdown-end">
          {user && (
            <div
              tabIndex={0}
              className=" mr-3 border-2 rounded-full border-teal-200"
            >
              {user.photoURL ? (
                <img
                  className="rounded-full w-10"
                  tabIndex={0}
                  src={user?.photoURL}
                />
              ) : (
                <div>
                  <FaUserCircle className="text-4xl"></FaUserCircle>
                </div>
              )}
              <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <p className="font-semibold text-lg text-primary">
                    {user.displayName ? user.displayName : "User"}
                  </p>
                </li>
                <li>
                  <p
                    onClick={handleLogOut}
                    className="btn btn-primary text-white"
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          {user ? (
            ""
          ) : (
            <Link to="/login" className="btn btn-primary text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
