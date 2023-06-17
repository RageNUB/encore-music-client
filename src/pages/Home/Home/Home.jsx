import { Helmet } from "react-helmet-async";
import Banner from "../../../components/Banner";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../popularClasses/popularClasses";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Encore Music Academy | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
    </div>
  );
};

export default Home;
