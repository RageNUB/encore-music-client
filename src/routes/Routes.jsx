import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllInstructors from "../pages/AllInstructors/AllInstructors";
import AllClasses from "../pages/AllClasses/AllClasses";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import PrivateRoutes from "./PrivateRoutes";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses/EnrolledClasses";
import SelectedClasses from "../pages/Dashboard/SelectedClasses/SelectedClasses";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Dashboard from "../layouts/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "instructors",
                element: <AllInstructors></AllInstructors>
            },
            {
                path: "classes",
                element: <AllClasses></AllClasses>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: "home",
                element: <PrivateRoutes><DashboardHome></DashboardHome></PrivateRoutes>
            },
            {
                path: "enrolledClasses",
                element: <PrivateRoutes><EnrolledClasses></EnrolledClasses></PrivateRoutes>
            },
            {
                path: "selectedClasses",
                element: <PrivateRoutes><SelectedClasses></SelectedClasses></PrivateRoutes>
            },
            {
                path: "paymentHistory",
                element: <PrivateRoutes><PaymentHistory></PaymentHistory></PrivateRoutes>
            }
        ]
    }
]);

export default router;