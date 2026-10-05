import { useState } from "react";
import { socials } from "../../data/socials";
import ScrambleText from "../ScrambleText";
import "./contact.css";

// Paste a form-service URL here (Formspree, Web3Forms, your own API...).
// While it is empty, "Send message" opens the visitor's email app instead.
const ENDPOINT = "";
const EMAIL = "info@nexviro.studio";

function Contact() {
  const [values, setValues] = useState({ name: "", email: "", details: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!ENDPOINT) {
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\n${values.details}`,
      );
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New project enquiry")}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setValues({ name: "", email: "", details: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact section">
      <div className="contact_info">
        <ScrambleText as="h2" className="section-title" text="Start a project" />
        <p className="contact_lead">
          Tell us what you are building. We reply within one business day.
        </p>

        <dl className="contact_details">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href="tel:+18903557880">+1 890 355 7880</a>
            </dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>Karachi, Pakistan</dd>
          </div>
        </dl>

        <div className="contact_socials">
          {socials.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} aria-label={label} className="contact_social">
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <form className="contact_form" onSubmit={onSubmit}>
        <label>
          Name
          <input type="text" name="name" value={values.name} onChange={onChange} required autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" value={values.email} onChange={onChange} required autoComplete="email" />
        </label>
        <label>
          Project details
          <textarea name="details" rows="5" value={values.details} onChange={onChange} required />
        </label>

        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : status === "sent" ? "Message sent" : "Send message"}
        </button>

        <p className="contact_status" aria-live="polite">
          {status === "sent" && "Thanks. We will be in touch soon."}
          {status === "error" && `Something went wrong. Email us at ${EMAIL} instead.`}
        </p>
      </form>
    </div>
  );
}

export default Contact;