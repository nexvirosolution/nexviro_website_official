import "./hero.css";
import image from "../../assets/hero_sec_background.jpg";
function Hero() {
  return (
    <div className="hero_container">
      <div className="hero_tagline_div">
        <h1>WE BUILD, MARKET, AND SCALE DIGITAL PRODUCTS</h1>
        <span>
          From idea to market ready solution, we help startups launch and
          thrive.
        </span>
        <button>START YOUR PROJECT</button>
      </div>
      <div className="hero_image_div">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Hero;
