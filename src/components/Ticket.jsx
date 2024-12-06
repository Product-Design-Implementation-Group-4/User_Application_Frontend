import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "./NavbarHome";
import "./Ticket.css";

const Ticket = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [faqs, setFaqs] = useState(() => {
    const savedFaqs = localStorage.getItem("faqs");
    return savedFaqs ? JSON.parse(savedFaqs) : [];
  });
  const [view, setView] = useState("open");
  
  // Temporary state for tracking edits
  const [editedFaqs, setEditedFaqs] = useState({});

  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  const handleTicketSubmit = (id, newAnswer) => {
    if (newAnswer.trim()) {
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, answer: newAnswer, status: "Closed" }
          : ticket
      );
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      const answeredTicket = updatedTickets.find((ticket) => ticket.id === id);
      if (answeredTicket && newAnswer.trim()) {
        const newFaq = { question: answeredTicket.question, answer: newAnswer };
        const updatedFaqs = [...faqs, newFaq];
        setFaqs(updatedFaqs);
        localStorage.setItem("faqs", JSON.stringify(updatedFaqs));
      }
    }
  };

  const handleCloseTicket = (id, answer) => {
    if (answer.trim()) {
      handleTicketSubmit(id, answer); // Save and close ticket with answer
    } else {
      const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    }
  };

  const handleDeleteFaq = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
    localStorage.setItem("faqs", JSON.stringify(updatedFaqs));
  };

  const handleSaveFaq = (index) => {
    const updatedFaqs = faqs.map((faq, i) =>
      i === index ? { ...faq, answer: editedFaqs[index] || faq.answer } : faq
    );
    setFaqs(updatedFaqs);
    localStorage.setItem("faqs", JSON.stringify(updatedFaqs));

    // Clear the temporary edited state after saving
    setEditedFaqs({ ...editedFaqs, [index]: undefined });
  };

  const handleEditFaq = (index, value) => {
    setEditedFaqs({ ...editedFaqs, [index]: value });
  };

  return (
    <div className="ticket">
      <NavbarHome />
      <header className="ticket-header">
        <h1>Manage Tickets</h1>
        <div className="ticket-controls">
          <button
            className={`ticket-toggle ${view === "open" ? "active" : ""}`}
            onClick={() => setView("open")}
          >
            Open Tickets
          </button>
          <button
            className={`ticket-toggle ${view === "saved" ? "active" : ""}`}
            onClick={() => setView("saved")}
          >
            Saved Tickets
          </button>
        </div>
      </header>

      <section className="ticket-list">
        {view === "open" ? (
          <>
            <h2>Open Tickets</h2>
            {tickets.filter((ticket) => ticket.status === "Open").length === 0 ? (
              <p>No open tickets at the moment.</p>
            ) : (
              tickets
                .filter((ticket) => ticket.status === "Open")
                .map((ticket) => (
                  <div key={ticket.id} className="ticket-item">
                    <p>
                      <strong>Q:</strong> {ticket.question}
                    </p>
                    <textarea
                      id={`answer-${ticket.id}`}
                      placeholder="Enter your answer..."
                    />
                    <div className="ticket-actions">
                      <button
                        className="close-btn"
                        onClick={() =>
                          handleCloseTicket(
                            ticket.id,
                            document.getElementById(`answer-${ticket.id}`).value
                          )
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ))
            )}
          </>
        ) : (
          <>
            <h2>Saved Tickets</h2>
            {faqs.length === 0 ? (
              <p>No saved tickets available.</p>
            ) : (
              faqs.map((faq, index) => (
                <div key={index} className="ticket-item">
                  <p>
                    <strong>Q:</strong> {faq.question}
                  </p>
                  <p>
                    <strong>A:</strong>{" "}
                    <textarea
                      value={editedFaqs[index] || faq.answer}
                      onChange={(e) => handleEditFaq(index, e.target.value)}
                    />
                  </p>
                  <div className="ticket-actions">
                    <button
                      className="save-btn"
                      onClick={() => handleSaveFaq(index)}
                    >
                      Save
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteFaq(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Ticket;