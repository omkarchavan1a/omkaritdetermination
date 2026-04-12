"use client";

import { useEffect } from "react";

export default function About() {
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

  return (
    <section id="about">
      <div className="container">
        <div className="about-split">
          <div className="about-visual reveal">
            <div className="visual-container">
              <div className="glass-overlay"></div>
              <img
                src="/logo.jpg"
                alt="Omkar Chavan"
                className="about-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="experience-badge serif">
                <span className="year">Est. 2021</span>
                <span className="name">IT Determination</span>
              </div>
            </div>
          </div>
          
          <div className="about-content">
            <span className="section-label reveal">The Founder</span>
            <h2 className="section-title reveal delay-1">
              Driven by <em className="serif">Determination</em>,<br />
              Built for Digital Excellence.
            </h2>
            <p className="section-desc reveal delay-2">
              Based in Pune, India, I specialize in transforming complex business challenges into sleek, high-performance digital products. My approach combines precision engineering with a deep understanding of AI-driven automation.
            </p>
            
            <div className="tech-editorial reveal delay-3">
              <div className="tech-row">
                <span className="tech-label">The Visionary</span>
                <p>Next.js, AI multi-agent systems, and SEO strategies that dominate search rankings.</p>
              </div>
              <div className="tech-row">
                <span className="tech-label">The Architect</span>
                <p>Python engineering, distributed logic, and robust backend foundations.</p>
              </div>
            </div>

            <div className="about-actions reveal delay-4">
              <div className="signature-mark serif">Omkar Chavan</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #about {
          background: var(--surface-low);
          overflow: hidden;
        }
        .about-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 120px;
          align-items: center;
        }
        .about-visual {
          position: relative;
        }
        .visual-container {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--surface-highest);
          aspect-ratio: 4/5;
        }
        .glass-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom right, rgba(212, 175, 55, 0.1), transparent);
          z-index: 1;
        }
        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.1);
          transition: all 0.8s var(--transition);
        }
        .visual-container:hover { border: 1px solid var(--primary-container); }
        .visual-container:hover .about-image {
          filter: grayscale(0) contrast(1);
          transform: scale(1.05);
        }
        .experience-badge {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          padding: 24px;
          background: rgba(19, 19, 19, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }
        .experience-badge .year {
          color: var(--primary-container);
          font-weight: 600;
          font-size: 1.1rem;
        }
        .experience-badge .name {
          color: var(--on-surface-variant);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .tech-editorial {
          margin-top: 56px;
          border-top: 1px solid var(--glass-border);
          padding-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .tech-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 24px;
        }
        .tech-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--primary-container);
          font-weight: 600;
        }
        .tech-row p {
          font-size: 0.95rem;
          color: var(--on-surface-variant);
          font-weight: 300;
        }

        .about-actions {
          margin-top: 64px;
        }
        .signature-mark {
          font-size: 2rem;
          color: var(--on-surface);
          opacity: 0.8;
          font-style: italic;
        }

        @media (max-width: 1100px) {
          .about-split { grid-template-columns: 1fr; gap: 80px; }
          .about-visual { max-width: 500px; margin: 0 auto; }
        }
        @media (max-width: 768px) {
          .experience-badge { padding: 16px; bottom: 20px; left: 20px; right: 20px; }
          .experience-badge .year { font-size: 0.9rem; }
          .experience-badge .name { font-size: 0.65rem; }
        }
        @media (max-width: 640px) {
          .tech-row { grid-template-columns: 1fr; gap: 8px; }
          .signature-mark { font-size: 1.5rem; }
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
      `}</style>
    </section>
  );
}
