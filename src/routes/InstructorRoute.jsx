import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";
import { Spinner } from "react-spinners-css";

const InstructorRoute = ({children}) => {
    const { loading } = useAuth()
    const [userRole] = useUsers();
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (userRole === "instructor") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;