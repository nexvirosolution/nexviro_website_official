import "./navbar.css";
import { useState } from "react";
import Logo from "../../assets/logo.jpg";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <a
        href="#hero"
        style={{ textDecoration: "none" }}
        className="companyName"
      >
        <img src={Logo} alt="" />
        <div className="companyName_div">
          <h3 className="title">NEXVIRO</h3>
          <p>SOLUTIONS</p>
        </div>
      </a>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <a href="#service">SERVICES</a>
        </li>
        <li>
          <a href="#projects">PROJECTS</a>
        </li>
        <li>
          <a href="#team">TEAM</a>
        </li>
        <li>
          <a href="#contact">CONTACT</a>
        </li>
        <li>
          <button>GET STARTED</button>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
