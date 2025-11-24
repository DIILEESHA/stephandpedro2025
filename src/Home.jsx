import Detail from "./components/details/Detail";
import Gallery from "./components/gallery/Gallery";
import Header from "./components/header/Header";
import Intro from "./components/intro/Intros";
import Parallaxs from "./components/paralax/Parallaxs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Location from "./components/location/Location";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        const yOffset = -150; // offset for navbar
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <Header id="header" />
      <Intro id="intro" />
        {/* <Detail /> */}

      <div id="details">
      <Location />
      </div>
      <Parallaxs id="parallax" />
      <div id="gallery">
        {/* <Gallery /> */}
      </div>
    </div>
  );
};

export default Home;
