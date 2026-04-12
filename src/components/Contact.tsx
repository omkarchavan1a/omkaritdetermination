"use client";

import { useState, useEffect } from "react";
import { sendEmail } from "@/app/actions";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add("visible");
        }
      });
    };
    handleReveal();
    window.addEventListener("scroll", handleReveal);
    return () => window.removeEventListener("scroll", handleReveal);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formData = new FormData(event.currentTarget);

    try {
      const data = await sendEmail(formData);

      if (data.success) {
        setResult("Inquiry sent successfully!");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message);
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-editorial">
          <div className="contact-text">
            <span className="section-label reveal">The Dialogue</span>
            <h2 className="section-title reveal delay-1">
              Start a <em className="serif">Extraordinary</em> Conversation.
            </h2>
            <p className="section-desc reveal delay-2">
              Ready to architect your digital future? Reach out via the form or through our direct channels.
            </p>
            
            <div className="direct-channels reveal delay-3">
              <div className="direct-item">
                <span className="direct-label">Digital Office</span>
                <a href="mailto:omkarchavan1500@gmail.com" className="direct-link">omkarchavan1500@gmail.com</a>
              </div>
              <div className="direct-item">
                <span className="direct-label">Direct Line</span>
                <a href="https://wa.me/919096518451" className="direct-link">+91 90965 18451</a>
              </div>
            </div>
          </div>

          <div className="contact-form-side reveal delay-4">
            <form id="contact-form" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <label>Your Name</label>
                  <input type="text" name="name" required />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" name="email" required />
                </div>
              </div>
              <div className="input-group">
                <label>Subject of Inquiry</label>
                <input type="text" name="subject" required />
              </div>
              <div className="input-group">
                <label>Project Details</label>
                <textarea name="message" rows={4} required></textarea>
              </div>
              
              <div className="form-submit">
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Dispatching..." : "Send Inquiry"}
                </button>
                {result && <span className="submit-status">{result}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        #contact {
          background: var(--surface-low);
          border-top: 1px solid var(--glass-border);
        }
        .contact-editorial {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 120px;
          align-items: flex-start;
        }
        .direct-channels {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .direct-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .direct-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--primary-container);
        }
        .direct-link {
          font-size: 1.1rem;
          color: var(--on-surface);
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .direct-link:hover { opacity: 0.6; }

        .contact-form-side {
          padding-top: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .input-group {
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .input-group label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--on-surface-variant);
        }
        .input-group input, 
        .input-group textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--glass-border);
          padding: 12px 0;
          color: var(--on-surface);
          font-family: inherit;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.4s;
        }
        .input-group input:focus, 
        .input-group textarea:focus {
          border-color: var(--primary-container);
        }
        
        .form-submit {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .submit-status {
          font-size: 0.85rem;
          color: var(--primary-container);
          font-style: italic;
        }

        @media (max-width: 1100px) {
          .contact-editorial { grid-template-columns: 1fr; gap: 80px; }
          .contact-text { max-width: 700px; }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; gap: 0; }
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
      `}</style>
    </section>
  );
}
