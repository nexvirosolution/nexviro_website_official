import { motion } from "framer-motion";
import { services } from "../../data/content";
import ScrambleText from "../ScrambleText";
import "./services.css";

function Services() {
  return (
    <div className="service section">
      <div className="service_head">
        <ScrambleText as="h2" className="section-title" text="What we build" />
        <p>Product, design, and growth under one roof, from first sketch to scale.</p>
      </div>

      <ul className="service_list">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <li key={service.id} className="service_row">
              <motion.span
                className="service_line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 1, ease: [0.2, 0.7, 0.1, 1] }}
              />
              <div className="service_icon">
                <Icon />
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Services;