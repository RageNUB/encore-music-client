import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Spinner } from "react-spinners-css";
import useUsers from "../hooks/useUsers";

const AdminRoute = ({children}) => {
    const { loading } = useAuth()
    const [userRole] = useUsers();
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (userRole === "admin") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;