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
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MakePayment from "../pages/Dashboard/MakePayment/MakePayment";
import Feedback from "../pages/Dashboard/ManageClasses/Feedback";
import UpdateClass from "../pages/Dashboard/MyClasses/UpdateClass";
import AdminRoute from "./AdminRoute";

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
                path: "selectedClasses/payment/:id",
                element: <PrivateRoutes><MakePayment></MakePayment></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/payment/${params.id}`)
            },
            {
                path: "paymentHistory",
                element: <PrivateRoutes><PaymentHistory></PaymentHistory></PrivateRoutes>
            },
            {
                path: "addClass",
                element: <AddClass></AddClass>
            },
            {
                path: "myClasses",
                element: <MyClasses></MyClasses>
            },
            {
                path: "update-class/:id",
                element: <UpdateClass></UpdateClass>,
                loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`)
            },
            {
                path: "manageClasses",
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: "manageUsers",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "feedback/:id",
                element: <AdminRoute><Feedback></Feedback></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`)
            }
        ]
    },
    {
        
    }
]);

export default router;