import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard main page</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;