import src from "../../assets/nexviro_logo.png";
import "./logo.css";

// nexviro_logo.png is already trimmed to the mark + wordmark, so nothing can get cut off.
function Logo({ width = 160 }) {
  return <img className="logo" src={src} alt="Nexviro Solutions" style={{ width }} />;
}

export default Logo;