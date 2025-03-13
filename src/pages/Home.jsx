import Slider from "../components/Slider/Slider.jsx";
import Quality from "../components/Quality/Quality.jsx";
import Safety from "../components/Safety/Safety.jsx";

const Home = () => {
    return (
        <div>
            {/*<MetaTags page="meta.home"/>*/}
            <Slider/>
            <Quality/>
            <Safety/>
        </div>
    );
};

export default Home;