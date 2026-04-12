"use client";

import useReveal from "@/hooks/useReveal";

const steps = [
  {
    title: "Discovery & Strategy",
    desc: "We begin by deeply understanding your business goals, target audience, and technical requirements to build a solid roadmap."
  },
  {
    title: "Engineering & Dev",
    desc: "This is where precision meets code. We build your solution using modern frameworks, ensuring stability and performance at every layer."
  },
  {
    title: "AI & Innovation Labs",
    desc: "We integrate custom AI models/agents and smart automations to give your product a competitive technological edge."
  },
  {
    title: "Scale & Optimize",
    desc: "Continuous monitoring, SEO fine-tuning, and infrastructure scaling to ensure your platform grows with your business."
  }
];

export default function Process() {
  const containerRef = useReveal();

  return (
    <section id="process" ref={containerRef}>
      <div className="container">
        <div className="process-header">
          <span className="section-label reveal">The Method</span>
          <h2 className="section-title reveal">
            A Blueprint for <em>Success</em>.
          </h2>
          <p className="section-desc reveal">
            Our systematic approach ensures every project is delivered with engineering precision and strategic foresight.
          </p>
        </div>

        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className={`step-item reveal delay-${index + 1}`}>
              <div className="step-num">0{index + 1}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
              <div className="step-connector"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .process-header {
          text-align: center;
          margin-bottom: 100px;
        }
        .process-header .section-desc {
          margin: 0 auto;
        }
        
        .process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          position: relative;
        }
        
        .step-item {
          position: relative;
          background: var(--dark-2);
          border: 1px solid var(--glass-border);
          padding: 40px;
          border-radius: 24px;
          height: 100%;
          transition: transform 0.4s var(--transition);
        }
        .step-item:hover {
          transform: translateY(-10px);
          border-color: var(--gold);
        }
        
        .step-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 700;
          color: rgba(201,168,76,0.1);
          position: absolute;
          top: 20px;
          right: 30px;
          transition: color 0.4s;
        }
        .step-item:hover .step-num {
          color: rgba(201,168,76,0.3);
        }
        
        .step-content {
          position: relative;
          z-index: 1;
        }
        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gold-light);
          margin-bottom: 16px;
        }
        .step-desc {
          font-size: 0.9rem;
          color: var(--text-dim);
          line-height: 1.7;
          font-weight: 300;
        }
        
        @media (max-width: 1200px) {
          .process-steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .process-steps { grid-template-columns: 1fr; }
          .step-item { padding: 30px; }
        }
      `}</style>
    </section>
  );
}
