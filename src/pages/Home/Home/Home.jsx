import Banner from "../../../components/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../popularClasses/popularClasses";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;