import "./footer.css";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Logo from "../../assets/logo.jpg";

function Footer() {
  return (
    <footer>
      <div className="footer_main_div">
        <div className="footer_heading_div">
          <a
            href="#hero"
            style={{ textDecoration: "none" }}
            className="footer_companyName"
          >
            <img src={Logo} alt="" />
            <div className="footer_companyName_div">
              <h3 className="footer_title">NEXVIRO</h3>
              <p>SOLUTIONS</p>
            </div>
          </a>
          <p>Crafting Digital Success. Start to Scale. </p>
        </div>
        <div className="footer_subMain_div">
          <div className="footer_sub1_div">
            <div>
              <h1>QUICK LINKS</h1>
              <a
                href="#service"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <p>Services</p>
              </a>

              <a
                href="#projects"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <p>Featured Projects</p>
              </a>

              <a
                href="#team"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <p>Team</p>
              </a>

              <a
                href="#contact"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                <p>Contact</p>
              </a>
            </div>
            <div>
              <h1>CONTACT US</h1>
              <p>
                Office: <span>1203 Karachi, Pakistan</span>
              </p>
              <p>
                Phone: <span>+1 890 355 7880</span>
              </p>
              <p>
                Email: <span>info@Nexviro.studio</span>
              </p>
              <p>Book a Consultation</p>
            </div>
          </div>
          <div className="footer_sub2_div">
            <div>
              <h1>STAY CONNECTED</h1>
              <FacebookIcon className="footer_icons" />
              <LinkedInIcon className="footer_icons" />
              <InstagramIcon className="footer_icons" />
              <YouTubeIcon className="footer_icons" />
            </div>
            <div>
              <h1>NEWSLETTER</h1>
              <input type="text" placeholder="Enter your work email..." />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_copyright_div">
        <p>&copy; 2026 Nexviro. All Rights Reserved.</p>
        <span>Privacy Policy | Terms of Service | Sitemap | Security</span>
      </div>
    </footer>
  );
}

export default Footer;
