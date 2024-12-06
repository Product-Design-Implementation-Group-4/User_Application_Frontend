import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import "./support.css";

const Support = () => {
  const navigate = useNavigate();

  // States for storing FAQs, search term, chat messages, and contact form data
  const [faqs, setFaqs] = useState(() => {
    const savedFaqs = localStorage.getItem("faqs");
    return savedFaqs
      ? JSON.parse(savedFaqs)
      : [
          { question: "What is the process for booking a move?", answer: "You can book a move online or call our support team." },
          { question: "Do you provide packing materials?", answer: "Yes, we offer high-quality packing materials for an additional fee." },
          { question: "How do I receive my invoice?", answer: "Invoices are emailed after your move is completed." },
          { question: "What is included in your moving service?", answer: "We provide packing, loading, transportation, and more." },
        ];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [feedback, setFeedback] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const [reminderTimer, setReminderTimer] = useState(null);

  useEffect(() => {
    localStorage.setItem("faqs", JSON.stringify(faqs));
  }, [faqs]);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    // Create a new contact ticket and add it to the open tickets
    const newTicket = {
      id: Date.now(),
      question: `From: ${contactForm.name}, Email: ${contactForm.email}, Message: ${contactForm.message}`,
      answer: "",  // You can leave answer empty or include further details if needed
      status: "Open",
    };

    const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    existingTickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(existingTickets));

    alert("Your message has been submitted!");
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
  
    // Create a new feedback ticket with the feedback as the question
    const newTicket = {
      id: Date.now(),
      question: `From: Feedback, Message: ${feedback}`,  // Use the feedback as the question
      answer: "",  // You can leave answer empty or include further details if needed
      status: "Open",
    };
  
    // Fetch existing tickets from localStorage
    const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    existingTickets.push(newTicket); // Add the new ticket
    localStorage.setItem("tickets", JSON.stringify(existingTickets)); // Store the updated tickets
  
    // Show a confirmation message to the user
    alert("Thank you for your feedback!");
  
    // Clear the feedback input field
    setFeedback("");
  };
  

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const userMessage = e.target[0].value;
    const botReply = getBotReply(userMessage);

    setChatMessages([...chatMessages, { user: userMessage, bot: botReply }]);

    if (botReply.includes("I'm not sure")) {
      if (userMessage.trim()) {
        const newTicket = {
          id: Date.now(),
          question: userMessage,
          answer: "",
          status: "Open",
        };

        const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        existingTickets.push(newTicket);

        localStorage.setItem("tickets", JSON.stringify(existingTickets));
      }

      setChatMessages((prev) => [
        ...prev,
        {
          bot: (
            <span>
              For further assistance, please visit our{" "}
              <Link to="/contact" className="contact-link">
                Contact Us
              </Link>{" "}
              page.
            </span>
          ),
        },
      ]);
    }

    e.target[0].value = "";
    resetTimers();
  };

  const resetTimers = () => {
    clearTimeout(inactivityTimer);
    clearTimeout(reminderTimer);
    setInactivityTimer(null);
    setReminderTimer(null);
    startInactivityTimer();
    startReminderTimer();
  };

  const startInactivityTimer = () => {
    const timer = setTimeout(() => {
      setChatMessages([]);
    }, 180000); // 3 minutes of inactivity
    setInactivityTimer(timer);
  };

  const startReminderTimer = () => {
    const reminder = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { bot: "Is there anything else I can help you with?" },
      ]);
    }, 60000); // Remind after 1 minute of chat inactivity
    setReminderTimer(reminder);
  };

  const getBotReply = (userMessage) => {
    const lowercasedQuery = userMessage.toLowerCase();

    if (lowercasedQuery.includes("hi") || lowercasedQuery.includes("hello")) {
      return "Hello! How can I assist you today?";
    }

    if (lowercasedQuery.includes("services")) {
      return "We are currently providing only moving out services.";
    }

    if (lowercasedQuery.includes("invoice") || lowercasedQuery.includes("bill")) {
      return "Invoices are emailed after your move is completed.";
    }

    const matchingFaqs = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lowercasedQuery) ||
        faq.answer.toLowerCase().includes(lowercasedQuery)
    );

    if (matchingFaqs.length > 0) {
      return matchingFaqs
        .map(
          (faq) =>
            `<strong>Q:</strong> ${faq.question} <br/><strong>A:</strong> ${faq.answer}`
        )
        .join("<br/><br/>");
    }

    return "I'm not sure I understand your question. A ticket has been created.";
  };

  const handleCloseChat = () => {
    setChatMessages([]);
    resetTimers();
  };

  const displayedFaqs = filteredFaqs.slice(0, 5);

  return (
    <div className="support-page">
      <NavbarHome />
      <header className="support-header">
        <h1>Support</h1>
        <p>Find answers to your questions about our services or contact us for help.</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main className="faq-container">
        <h2>FAQs</h2>
        {displayedFaqs.length ? (
          displayedFaqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No FAQs match your search.</p>
        )}
      </main>

      <section className="chatbot-section">
        <h2>Chat with Us</h2>
        <div className="chat-box">
          {chatMessages.map((msg, idx) => (
            <div key={idx}>
              <div className="chat-message user-message">{msg.user}</div>
              <div className="chat-message bot-message">
                {typeof msg.bot === "string" ? (
                  <span dangerouslySetInnerHTML={{ __html: msg.bot }} />
                ) : (
                  msg.bot
                )}
              </div>
            </div>
          ))}
          <form onSubmit={handleChatSubmit}>
            <input type="text" className="chat-input" placeholder="Ask me anything..." required />
            <button type="submit" className="chat-submit">Send</button>
          </form>
        </div>
        <button className="close-chat" onClick={handleCloseChat}>
          Close Chat
        </button>
      </section>

      <section className="contact-form">
        <h2>Email Us</h2>
        <form onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="name"
            value={contactForm.name}
            onChange={handleContactChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={contactForm.email}
            onChange={handleContactChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={contactForm.message}
            onChange={handleContactChange}
            placeholder="Your Message"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </section>

      <section className="feedback-section">
        <h2>Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback"
          />
          <button type="submit">Submit Feedback</button>
        </form>
      </section>
    </div>
  );
};

export default Support;
