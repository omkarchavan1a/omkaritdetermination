"use client";

import useReveal from "@/hooks/useReveal";

const services = [
  {
    title: "Web Engineering",
    icon: "⚡",
    desc: "Building high-performance, scalable web applications with Next.js and React.",
    features: ["Custom Web Apps", "E-commerce Solutions", "Performance Optimization"]
  },
  {
    title: "AI Integration",
    icon: "🧠",
    desc: "Implementing smart features and automation through LLMs and custom AI agents.",
    features: ["AI Chatbots", "Predictive Analytics", "Process Automation"]
  },
  {
    title: "Growth Strategy",
    icon: "📈",
    desc: "Strategic SEO and digital marketing to ensure your product reaches the right audience.",
    features: ["Advanced SEO", "Conversion Optimization", "Data Strategy"]
  }
];

export default function Services() {
  const containerRef = useReveal();

  return (
    <section id="services" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal">Expertise</span>
          <h2 className="section-title reveal">
            Advanced <em>Digital</em><br />Solutions.
          </h2>
          <p className="section-desc reveal">
            We provide full-spectrum digital engineering with a focus on performance, scalability, and innovation.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className={`service-card reveal delay-${index + 1}`}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
              <ul className="service-list">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex}>{feature}</li>
                ))}
              </ul>
              <div className="service-glow"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-header {
          margin-bottom: 80px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .service-card {
          background: var(--dark-2);
          border: 1px solid var(--glass-border);
          padding: 48px 40px;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s var(--transition), border-color 0.4s;
        }
        .service-card:hover {
          transform: translateY(-12px);
          border-color: var(--gold);
        }
        .service-icon {
          font-size: 2.5rem;
          margin-bottom: 28px;
        }
        .service-card-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--text);
        }
        .service-card-desc {
          color: var(--text-dim);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 28px;
          font-weight: 300;
        }
        .service-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .service-list li {
          font-size: 0.85rem;
          color: var(--text-dim);
          padding-left: 20px;
          position: relative;
        }
        .service-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--gold);
          font-weight: 700;
        }
        .service-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle at top right, rgba(201,168,76,0.1), transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
          .service-card { padding: 40px 30px; }
        }
      `}</style>
    </section>
  );
}
