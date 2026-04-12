"use client";

import { useState } from "react";
import useReveal from "@/hooks/useReveal";

export default function Contact() {
  const containerRef = useReveal();
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "e0a60e70-b401-4f02-bab1-7a4e76aa5f54");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        (event.target as HTMLFormElement).reset();
      } else {
        console.log("Error", data);
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
    <section id="contact" ref={containerRef}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-label reveal">Get in Touch</span>
            <h2 className="section-title reveal">
              Let's Build Something <em>Extraordinary</em>.
            </h2>
            <p className="section-desc reveal">
              Ready to take your digital presence to the next level? Share your project vision and let's engineer a solution that drives growth.
            </p>

            <div className="contact-channels">
              <div className="channel-card reveal delay-1">
                <div className="channel-icon">📧</div>
                <div className="channel-details">
                  <span className="channel-label">Email Us</span>
                  <a href="mailto:omkarchavan1500@gmail.com" className="channel-link">omkarchavan1500@gmail.com</a>
                </div>
              </div>
              <div className="channel-card reveal delay-2">
                <div className="channel-icon">📱</div>
                <div className="channel-details">
                  <span className="channel-label">Call / WhatsApp</span>
                  <a href="https://wa.me/919096518451" className="channel-link">+91 90965 18451</a>
                </div>
              </div>
            </div>

            <div className="social-links reveal delay-3">
              <a href="https://www.instagram.com/omkarchavann_" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
              <a href="https://wa.me/919096518451" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
            </div>
          </div>

          <div className="contact-form-wrap reveal-right">
            <form id="contact-form" onSubmit={onSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <input type="text" name="name" placeholder="Full Name" required />
                  <div className="input-focus"></div>
                </div>
                <div className="input-group">
                  <input type="email" name="email" placeholder="Email Address" required />
                  <div className="input-focus"></div>
                </div>
              </div>
              <div className="input-group">
                <input type="text" name="subject" placeholder="Subject" required />
                <div className="input-focus"></div>
              </div>
              <div className="input-group">
                <textarea name="message" placeholder="Project Details" rows={5} required></textarea>
                <div className="input-focus"></div>
              </div>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
              </button>
              {result && <p className="form-result">{result}</p>}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 100px;
          align-items: flex-start;
        }
        
        .contact-channels {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin: 48px 0;
        }
        .channel-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: var(--dark-2);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          transition: border-color 0.3s;
        }
        .channel-card:hover { border-color: var(--gold); }
        .channel-icon { font-size: 1.8rem; }
        .channel-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .channel-link {
          font-size: 1.1rem;
          color: var(--gold-light);
          text-decoration: none;
          font-weight: 500;
        }
        
        .social-links {
          display: flex;
          gap: 24px;
        }
        .social-link {
          color: var(--text-dim);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.3s;
        }
        .social-link:hover { color: var(--gold); }
        
        .contact-form-wrap {
          background: var(--dark-2);
          padding: 60px;
          border-radius: 32px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        
        .input-group {
          position: relative;
          margin-bottom: 24px;
        }
        input, textarea {
          width: 100%;
          background: var(--dark-3);
          border: 1px solid var(--glass-border);
          padding: 18px 24px;
          border-radius: 12px;
          color: var(--text);
          font-family: inherit;
          font-size: 0.95rem;
          transition: border-color 0.3s;
          outline: none;
        }
        textarea { resize: vertical; }
        .input-focus {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--gold);
          transition: width 0.3s, left 0.3s;
        }
        input:focus + .input-focus, textarea:focus + .input-focus {
          width: 100%;
          left: 0;
        }
        input:focus, textarea:focus { border-color: transparent; }
        
        .form-result {
          margin-top: 20px;
          font-size: 0.9rem;
          color: var(--gold);
        }
        
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr; gap: 80px; }
          .contact-form-wrap { padding: 40px; }
        }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .contact-form-wrap { padding: 30px 20px; }
        }
      `}</style>
    </section>
  );
}
