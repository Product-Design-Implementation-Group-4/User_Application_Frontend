import React from "react";
import { useNavigate } from "react-router-dom"; // Corrected import for useNavigate
import "./About.css";
import NavbarHome from "../components/NavbarHome";

const About = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // You can add a function to navigate to a different page, for example:
  const handleNavigate = () => {
    navigate("/contact"); // Redirect to the contact page
  };

  return (
    <div className="about-page">
      <NavbarHome />
      <header className="about-header">
        <h1>About Us</h1>
        <p>Your trusted partner for stress-free moving and relocation services.</p>
      </header>

      <section className="about-section">
        <h2 id="mission">Our Mission</h2>
        <p>
          At <strong>Shift Squad</strong>, our mission is to make your moving experience smooth, efficient, 
          and worry-free. We aim to provide reliable services tailored to your specific needs, 
          whether you're moving across town or across the country.
        </p>
      </section>

      <section className="about-section">
        <h2 id="vision">Our Vision</h2>
        <p>
          To be the most trusted name in moving services by delivering exceptional customer experiences 
          and maintaining the highest standards of professionalism.
        </p>
      </section>

      <section className="about-section">
        <h2 id="values">Our Values</h2>
        <ul>
          <li><strong>Reliability:</strong> You can count on us to be there on time and ready to help.</li>
          <li><strong>Customer Focus:</strong> Your satisfaction is our top priority.</li>
          <li><strong>Professionalism:</strong> We maintain the highest standards in everything we do.</li>
          <li><strong>Flexibility:</strong> We tailor our services to meet your unique moving needs.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 id="why-choose">Why Choose Us?</h2>
        <p>
          With years of experience in the moving industry, we understand that every move is different. 
          Whether you need help with heavy lifting, transportation, or full-service relocation, 
          we have the tools, expertise, and dedicated team to get the job done.
        </p>
        <ul className="why-choose-list">
          <li>Trained and experienced movers</li>
          <li>Wide range of vehicles to suit all move sizes</li>
          <li>Competitive pricing with no hidden fees</li>
          <li>Friendly and approachable customer support</li>
          <li>Commitment to care for your belongings</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 id="story">Our Story</h2>
        <p>
          <strong>Shift Squad</strong> started with a simple goal: to simplify the moving process. 
          From our humble beginnings as a small, family-run business, we’ve grown into a trusted name 
          in the moving industry. Our journey has been fueled by a passion for helping people and 
          a commitment to excellence in everything we do.
        </p>
      </section>

      <footer className="about-footer">
        <p>Have questions or need assistance? <button onClick={handleNavigate}>Contact us</button> today!</p>
      </footer>
    </div>
  );
};

export default About;
