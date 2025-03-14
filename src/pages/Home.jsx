import Slider from "../components/Slider/Slider.jsx";
import Quality from "../components/Quality/Quality.jsx";
import Safety from "../components/Safety/Safety.jsx";
import Portfolio from "../components/Portfolio/Portfolio.jsx";
import Numbers from "../components/Numbers/Numbers.jsx";
import Video from "../components/Video/Video.jsx";

const Home = () => {
    return (
        <div>
            {/*<MetaTags page="meta.home"/>*/}
            <Slider/>
            <Quality/>
            <Safety/>
            <Portfolio/>
            <Numbers/>
            <Video/>
        </div>
    );
};

export default Home;