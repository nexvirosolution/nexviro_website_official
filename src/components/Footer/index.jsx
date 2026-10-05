import { useState } from "react";
import Logo from "../Logo";
import { socials } from "../../data/socials";
import "./footer.css";

const EMAIL = "info@nexviro.studio";

const quickLinks = [
  { href: "#service", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

function Footer() {
  const [email, setEmail] = useState("");

  // No newsletter service is connected yet, so this opens an email to you.
  // Swap in your provider (Mailchimp, Brevo...) when ready.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Newsletter signup");
    const body = encodeURIComponent(`Please add me to the list: ${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="footer_brand">
          <a href="#hero" aria-label="Back to top">
            <Logo width={190} />
          </a>
          <p>Crafting digital success. Start to scale.</p>
        </div>

        <nav className="footer_col" aria-label="Footer">
          <h4>Explore</h4>
          {quickLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer_col">
          <h4>Contact</h4>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href="tel:+18903557880">+1 890 355 7880</a>
          <span>Karachi, Pakistan</span>
        </div>

        <form className="footer_news" onSubmit={onSubmit}>
          <h4>Newsletter</h4>
          <div className="footer_news_row">
            <input
              type="email"
              placeholder="Work email"
              aria-label="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn" type="submit">
              Subscribe
            </button>
          </div>
          <div className="footer_socials">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </form>
      </div>

      <div className="footer_bottom">
        <p>&copy; 2026 Nexviro. All rights reserved.</p>
        <p className="footer_legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;