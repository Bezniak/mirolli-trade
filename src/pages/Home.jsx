import Slider from "../components/Slider/Slider.jsx";
import Quality from "../components/Quality/Quality.jsx";
import Safety from "../components/Safety/Safety.jsx";
import Portfolio from "../components/Portfolio/Portfolio.jsx";
import Numbers from "../components/Numbers/Numbers.jsx";
import Contacts from "../components/Contacts/Contacts.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import MetaTags from "../common/MetaTags.jsx";

const Home = () => {
    return (
        <>
            <MetaTags page="seo.home"/>
            <Slider/>
            <Safety/>
            <Portfolio/>
            <Numbers/>
            <Reviews/>
            <Contacts/>
        </>
    );
};

export default Home;