import React from "react";
import "./contact.css";
import junayedImage from "../assets/company.png";
import shammiImage from "../assets/facebook.png";
import pankajImage from "../assets/pankaj.jpeg";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";

const contacts = [
  {
    name: "Md. Junayedur Rahman Bhuiyan",
    role: "Vehicle Management Services",
    phone: "+358406389300",
    email: "junayed680890@gmail.com",
    image: junayedImage,
  },
  {
    name: "Shamima Shammi",
    role: "General Queries and Issues",
    phone: "+358442414014",
    email: "shammighmc@gmail.com",
    image: shammiImage,
  },
  {
    name: "Pankaj Chakrabarty",
    role: "Manpower Management",
    phone: "+358401973799",
    email: "pankajchakrabarty22@gmail.com",
    image: pankajImage,
  },
];

const Contacts = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-page">
      <NavbarHome />

      {/* Header Section */}
      <header className="contact-header">
        <h1>Contact Our Team</h1>
        <p>We're here to help. Reach out to any of our team members for assistance.</p>
      </header>

      {/* Contact Cards */}
      <div className="contact-container">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-card">
            <div className="contact-image-container">
              <img
                src={contact.image}
                alt={contact.name}
                className="contact-image"
              />
            </div>
            <div className="contact-info">
              <h2 className="contact-name">{contact.name}</h2>
              <p className="contact-role">{contact.role}</p>
              <div className="contact-details">
                <p className="contact-phone">📞 {contact.phone}</p>
                <p className="contact-email">
                  📧{" "}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
