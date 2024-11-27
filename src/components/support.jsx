import React, { useState } from "react";
import "./support.css";

const Support = () => {
  const faqs = [
    { question: "What is the process for booking a move?", answer: "You can book a move online or call our support team." },
    { question: "Do you provide packing materials?", answer: "Yes, we offer high-quality packing materials for an additional fee." },
    { question: "How do I receive my invoice?", answer: "Invoices are emailed after your move is completed." },
    { question: "What is included in your moving service?", answer: "We provide packing, loading, transportation, and more." },
  ];

  const categories = {
    Billing: [
      { question: "How do I receive my invoice?", answer: "Invoices are emailed after your move is completed." },
    ],
    Services: [
      { question: "What is included in your moving service?", answer: "We provide packing, loading, transportation, and more." },
    ],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedback, setFeedback] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted!");
    setContactForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback(""); // Reset the feedback text box
  };

  return (
    <div className="support-page">
      <header className="support-header">
        <h1>Support</h1>
        <p>Find answers to your questions about our moving-out services or contact us for help.</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main className="faq-container">
        <h2>Frequently Asked Questions</h2>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
              <div className="feedback-buttons">
                <button onClick={() => alert("Thank you for your feedback!")}>👍 Yes</button>
                <button onClick={() => alert("We'll improve this!")}>👎 No</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No FAQs match your search.</p>
        )}

        {/* Feedback Section directly after FAQs */}
        <section className="feedback-section">
          <h2>Suggestions & Feedback</h2>
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="We value your suggestions and feedback..."
              className="feedback-textarea"
              rows="5"
              required
            />
            <button type="submit" className="feedback-submit">Submit Feedback</button>
          </form>
        </section>
      </main>

      <section className="categories-container">
        <h2>Help Topics</h2>
        {Object.entries(categories).map(([category, faqs], index) => (
          <div key={index}>
            <h3 className="category-title">{category}</h3>
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <h4 className="faq-question">{faq.question}</h4>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="contact-section">
        <h2>E-mail Us</h2>
        <form onSubmit={handleContactSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            value={contactForm.name}
            onChange={handleContactChange}
            placeholder="Your Name"
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            value={contactForm.email}
            onChange={handleContactChange}
            placeholder="Your Email"
            className="form-input"
            required
          />
          <textarea
            name="message"
            value={contactForm.message}
            onChange={handleContactChange}
            placeholder="Your Message"
            className="form-textarea"
            rows="5"
            required
          />
          <button type="submit" className="form-submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Support;
