import "./contact.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Contact() {
  return (
    <div className="contact_container">
      <h1>CONTACT</h1>
      <div className="contact_subDiv">
        <div className="contact_office_div">
          <p className="contact_office_heading">Office</p>
          <p className="contact_office_location">
            1203 Contact info +(890) 355-7880
          </p>
          <FacebookIcon className="contact_office_icon" />
          <LinkedInIcon className="contact_office_icon" />
          <InstagramIcon className="contact_office_icon" />
          <YouTubeIcon className="contact_office_icon" />
        </div>
        <div className="contact_message_div">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <textarea placeholder="Project Details"></textarea>
          <button>SEND MESSAGE</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
