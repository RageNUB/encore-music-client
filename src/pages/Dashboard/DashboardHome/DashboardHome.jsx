import dashboardPic from "../../../assets/undraw_data_trends_re_2cdy.svg"

const DashboardHome = () => {
    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center lg:mb-10">Welcome to <span className="text-primary">Encore Music Academy</span> Dashboard</h1>
            <img className="h-[34rem] -mt-28 lg:mt-10 text-center px-4" src={dashboardPic} alt="" />
        </div>
    );
};

export default DashboardHome;