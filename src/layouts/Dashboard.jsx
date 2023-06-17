import { useEffect, useState } from "react";
import { DarkModeToggle } from "react-dark-mode-toggle-2";
import { FaBook, FaBookmark, FaClipboardList, FaHome, FaMoneyCheckAlt, FaPlusSquare, FaRegEdit, FaUserCircle, FaUsersCog } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.svg";
import logo2 from "../assets/logo-footer.svg";
import useUsers from "../hooks/useUsers";

const Dashboard = () => {
  const { user } = useAuth();
  const [userRole] = useUsers()
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState("winter");
  const [isAdmin, setIsAdmin] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false)
  const [isStudent, setIsStudent] = useState(false)

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    if (isDarkMode) {
      setTheme("night");
    } else {
      setTheme("winter");
    }
  }, [theme, isDarkMode]);

  useEffect(() => {
    if(userRole === "admin"){
        setIsAdmin(true)
        setIsInstructor(false)
        setIsStudent(false)
      } else if(userRole === "instructor"){
        setIsAdmin(false)
        setIsInstructor(true)
        setIsStudent(false)
      } else if(userRole === "student"){
        setIsAdmin(false)
        setIsInstructor(false)
        setIsStudent(true)
      }
  }, [userRole])

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col items-center justify-start">
        {/* Page content here */}
        <div className="w-full navbar bg-base-100 justify-between">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <img
              className="h-8"
              src={theme === "winter" ? logo : logo2}
              alt=""
            />
          </div>
          <div className="navbar-end lg:hidden">
            <div className="mr-4">
              <DarkModeToggle
                onChange={setIsDarkMode}
                isDarkMode={isDarkMode}
              ></DarkModeToggle>
            </div>
            <div className="border-2 rounded-full border-teal-200">
              {user.photoURL ? (
                <img className="rounded-full w-10" src={user?.photoURL} />
              ) : (
                <div>
                  <FaUserCircle className="text-4xl"></FaUserCircle>
                </div>
              )}
            </div>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div className="hidden lg:block">
            <div className="flex flex-col items-center space-y-3 ">
              <img src={theme === "winter" ? logo : logo2} alt="" />
              <div className="">
                {user.photoURL ? (
                  <img
                    className="rounded-full border-teal-200 border-4 w-32"
                    tabIndex={0}
                    src={user?.photoURL}
                  />
                ) : (
                  <div>
                    <FaUserCircle className="text-4xl"></FaUserCircle>
                  </div>
                )}
              </div>
              <div className="hidden lg:block">
                <DarkModeToggle
                  onChange={setIsDarkMode}
                  isDarkMode={isDarkMode}
                ></DarkModeToggle>
              </div>
            </div>
          </div>
          {isStudent && (
            <div className="text-base font-medium mt-4">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="home"
                >
                 <FaHome></FaHome> Dashboard Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="selectedClasses"
                >
                 <FaBookmark></FaBookmark> My Selected Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="enrolledClasses"
                >
                 <FaClipboardList></FaClipboardList> My Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="paymentHistory"
                >
                 <FaMoneyCheckAlt></FaMoneyCheckAlt> Payment History
                </NavLink>
              </li>
            </div>
          )}
          {isInstructor && (
            <div className="text-base font-medium mt-4">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="home"
                >
                 <FaHome></FaHome> Dashboard Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="addClass"
                >
                  <FaPlusSquare></FaPlusSquare> Add A Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="myClasses"
                >
                  <FaBook></FaBook> <span>My Classes</span>
                </NavLink>
              </li>
            </div>
          )}
          {isAdmin && (
            <div className="text-base font-medium mt-4">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="home"
                >
                 <FaHome></FaHome> Dashboard Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="manageClasses"
                >
                 <FaRegEdit></FaRegEdit> Manage Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active font-bold text-white" : ""
                  }
                  to="manageUsers"
                >
                 <FaUsersCog></FaUsersCog> Manage Users
                </NavLink>
              </li>
            </div>
          )}
          <div className="divider"></div>
          <div className="text-base font-medium">
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
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
