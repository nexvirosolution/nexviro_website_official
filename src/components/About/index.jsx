import { abouts } from "../../data/content";
import "./about.css";

function About() {
  return (
    <div className="about_container">
      {/* Kept your original About heading, though not visible in the screenshot */}
      <h1>ABOUT</h1>
      <div className="about_persons_container">
        {abouts.map((about) => {
          const Icon = about.social.icon;
          return (
            <div key={about.id} className="about_singlePerson_container">
              <img src={about.img} alt={about.name} />
              <h1>{about.name}</h1>
              <p className="about_designation">{about.designation}</p>
              <p className="about_social_heading">Professional socials</p>
              <div className="about_social_div">
                <Icon />
                <p>{about.social.link}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;
