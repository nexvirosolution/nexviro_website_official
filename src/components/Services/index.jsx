import "./services.css";
import { services } from "../../data/content";

function Services() {
  return (
    <div className="service_container">
      <h1>SERVICES</h1>
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <div key={service.id} className="service_card">
            <div className="service_icon">
              <Icon />
            </div>
            <div className="service_detail">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Services;
