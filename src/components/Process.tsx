"use client";

import { useEffect } from "react";

const steps = [
  {
    title: "Intelligence Gathering",
    num: "α",
    desc: "A deep dive into the business's DNA, identifying hidden bottlenecks and mapping a technical route for strategic advantage."
  },
  {
    title: "Structural Synthesis",
    num: "β",
    desc: "Architecting the infrastructure. We build with a focus on code integrity, ensuring a foundation that supports scale and cinematic performance."
  },
  {
    title: "AI Integration",
    num: "γ",
    desc: "Injecting bespoke AI multi-agent logic. We transform static platforms into living, evolving artifacts of automated intelligence."
  },
  {
    title: "Constant Evolution",
    num: "δ",
    desc: "The launch is simply the inception. Continuous SEO optimization and recursive logic refinement to ensure long-term brand dominance."
  }
];

export default function Process({ content }: { content?: any }) {
  const displayTitle = content?.title || "A Blueprint for <em class=\"serif\">Absolute Success</em>.";
  const displaySteps = content?.steps && content.steps.length > 0 ? content.steps : steps;

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
    <section id="process">
      <div className="container">
        <div className="process-header">
          <span className="section-label reveal">The Method</span>
          <h2 className="section-title reveal delay-1" dangerouslySetInnerHTML={{ __html: displayTitle }}></h2>
        </div>

        <div className="process-list">
          {displaySteps.map((step: any, index: number) => (
            <div key={index} className="process-item reveal">
              <div className="item-meta">
                <span className="item-num serif">{step.num}</span>
                <div className="item-connector"></div>
              </div>
              <div className="item-content">
                <h3 className="item-title serif">{step.title}</h3>
                <p className="item-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        #process {
          background: var(--surface);
          border-top: 1px solid var(--glass-border);
        }
        .process-header {
          margin-bottom: 120px;
          text-align: center;
        }
        .process-list {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 64px;
        }
        .process-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 60px;
          align-items: flex-start;
        }
        .item-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .item-num {
          font-size: 1.8rem;
          color: var(--primary-container);
          font-weight: 400;
          margin-bottom: 24px;
        }
        .item-connector {
          width: 1px;
          height: 100px;
          background: linear-gradient(to bottom, var(--primary-container), transparent);
          opacity: 0.3;
        }
        .process-item:last-child .item-connector {
          display: none;
        }
        
        .item-title {
          font-size: 1.75rem;
          font-weight: 500;
          margin-bottom: 20px;
          color: var(--on-surface);
        }
        .item-desc {
          font-size: 1.05rem;
          color: var(--on-surface-variant);
          line-height: 1.8;
          font-weight: 300;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .process-item { grid-template-columns: 60px 1fr; gap: 32px; }
          .item-title { font-size: 1.4rem; }
          .item-desc { font-size: 0.95rem; }
        }

        .delay-1 { transition-delay: 0.1s; }
      `}</style>
    </section>
  );
}
