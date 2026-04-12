"use client";

import { useEffect } from "react";

const services = [
  {
    title: "Digital Architecture",
    num: "01",
    desc: "Precision-engineered websites and enterprise-grade software built with Next.js and React. Focusing on cinematic performance and technical structural integrity.",
    tags: ["Next.js", "Vercel", "Performance Audit"]
  },
  {
    title: "AI Synthesis",
    num: "02",
    desc: "Architecting custom AI ecosystems and multi-agent systems using CrewAI. Automating the complex to allow for strategic growth and innovation.",
    tags: ["CrewAI", "LLM Logic", "Automation"]
  },
  {
    title: "Visibility Strategy",
    num: "03",
    desc: "Sophisticated SEO positioning and design-centric social media marketing that mirrors your site's premium aesthetic for cohesive brand dominance.",
    tags: ["SEO Architecture", "Vercel", "Brand Synergy"]
  }
];

export default function Services() {
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
    <section id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-label reveal">The Expertise</span>
          <h2 className="section-title reveal delay-1">
            Curated <em>Digital</em><br />High-End Logic.
          </h2>
          <p className="section-desc reveal delay-2">
            Treating every project as a bespoke digital architecture, focusing on the intersection of aesthetic authority and technical precision.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className={`service-card reveal delay-${index + 1}`}>
              <div className="card-top">
                <span className="service-num serif">{service.num}</span>
                <div className="service-dot"></div>
              </div>
              <h3 className="service-card-title serif">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
              <div className="service-tags">
                {service.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        #services {
          background: var(--surface);
          border-top: 1px solid var(--glass-border);
        }
        .services-header {
          margin-bottom: 100px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .service-card {
          background: var(--surface-low);
          padding: 60px 50px;
          border: 1px solid var(--glass-border);
          position: relative;
          transition: all 0.6s var(--transition);
        }
        .service-card:hover {
          background: var(--surface-container);
          border-color: var(--primary-container);
          transform: translateY(-8px);
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .service-num {
          font-size: 1.5rem;
          color: var(--primary-container);
          opacity: 0.8;
          font-weight: 400;
        }
        .service-dot {
          width: 8px;
          height: 8px;
          background: var(--primary-container);
          border-radius: 50%;
          opacity: 0.3;
        }
        .service-card-title {
          font-size: 1.6rem;
          font-weight: 500;
          margin-bottom: 24px;
          color: var(--on-surface);
        }
        .service-card-desc {
          color: var(--on-surface-variant);
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 40px;
          font-weight: 300;
        }
        .service-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .tag {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary-container);
          padding: 6px 12px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .service-card { padding: 40px 30px; }
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
      `}</style>
    </section>
  );
}
