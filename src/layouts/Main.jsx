import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;