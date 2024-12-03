import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import "./services.css";

const services = [
  {
    type: "Helping by Person",
    description: "Get assistance with moving by hiring reliable individuals.",
    icon: "🧑‍🤝‍🧑",
    details: "This service includes professional movers to assist with packing, loading, and unloading.",
    learnMoreText:
      "Our Helping by Person service provides you with skilled and reliable movers to ensure a smooth and stress-free moving experience. Whether it's packing, loading, or unloading, our team is here to help.",
  },
  {
    type: "Helping by Person and Car with Tow Hook",
    flexibility: "This service can be with or without trailer, based on necessity.",
    description: "Get help from a person with a car for smaller loads and quick transport.",
    icon: "🚗",
    flexibilityIcon: "🔄",
    details: "Ideal for small apartments or quick moves within the city.",
    learnMoreText:
      "Our Helping by Person and Car service is perfect for small moves. A skilled mover will assist you with packing and transportation using a compact and efficient car.",
  },
  {
    type: "Helping by Person and Van",
    description: "Hire a person with a van for larger moves or family-sized loads.",
    icon: "🚐",
    details: "Best for larger items or moves requiring extra space.",
    learnMoreText:
      "Our Helping by Person and Van service is designed for larger moves, providing ample space for your belongings and expert assistance for safe transportation.",
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="services-page">
        <NavbarHome />
      <h1 className="services-title">Our Moving Services</h1>
      <p className="services-description">
        Explore our moving services tailored to fit your needs!
      </p>

      <ul className="services-list">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            <div className="service-header" onClick={() => toggleDetails(index)}>
              <span className="service-icon">{service.icon}</span>
              <span className="service-type">{service.type}</span>
            </div>
            {service.flexibility && (
              <div className="service-flexibility">
                <span className="flexibility-icon">🔄</span>
                <span>{service.flexibility}</span>
              </div>
            )}
            <p className="service-short-description">{service.description}</p>

            {expandedIndex === index && (
              <div className="service-details-expanded">
                <p>{service.details}</p>
                <p className="learn-more-text">{service.learnMoreText}</p>
              </div>
            )}
            <button
              className="action-button"
              onClick={() => toggleDetails(index)}
            >
              {expandedIndex === index ? "Show Less" : "Learn More"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
