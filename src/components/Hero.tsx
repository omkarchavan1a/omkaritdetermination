"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero({ content }: { content?: any }) {
  const heroRef = useRef<HTMLElement>(null);

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

  // Fallback defaults for safety during tests
  const safeContent = content || {
    label: "Precision Engineering. Strategic Determination.",
    title: "Transforming complex problems into <br /><em class=\"serif\">seamless digital experiences</em>",
    description: "Founder & Lead Developer at Omkar IT Determination. Providing high-quality websites, landing pages, IT software, and AI-driven services with strategic determination."
  };

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-atmosphere"></div>
      <div className="hero-grain"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-label reveal">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="label-logo" 
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <span>{safeContent.label}</span>
          </div>
          <h1 
            className="hero-title display-lg reveal delay-1" 
            dangerouslySetInnerHTML={{ __html: safeContent.title }}
          />
          <p className="hero-desc reveal delay-2">
            {safeContent.description}
          </p>
          <div className="hero-ctas reveal delay-3">
            <Link href="#portfolio" className="btn-primary">
              The Artifacts
            </Link>
            <Link href="#contact" className="btn-ghost">
              Start a Dialogue
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-footer container">
        <div className="hero-scroll reveal delay-4">
          <span className="scroll-text">Scroll to Explore</span>
          <div className="scroll-line"></div>
        </div>
      </div>

      <style jsx>{`
        #hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--surface);
          padding-top: 140px;
          overflow: hidden;
        }
        .hero-atmosphere {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(191, 205, 255, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        .hero-grain {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1100px;
        }
        .hero-label {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.8rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--primary-container);
          margin-bottom: 40px;
          font-weight: 500;
        }
        .label-logo {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--primary-container);
          object-fit: cover;
        }
        .hero-title { margin-bottom: 40px; }
        .hero-title em {
          font-style: italic;
          color: var(--primary-container);
          opacity: 0.95;
        }
        .hero-desc {
          font-size: 1.25rem;
          color: var(--on-surface-variant);
          max-width: 680px;
          margin-bottom: 64px;
          line-height: 1.7;
          font-weight: 300;
        }
        .hero-ctas {
          display: flex;
          gap: 24px;
        }
        
        .hero-footer {
          position: absolute;
          bottom: 60px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: flex-start;
          z-index: 2;
        }
        .hero-scroll {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .scroll-text {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--on-surface-variant);
          opacity: 0.6;
        }
        .scroll-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(to right, var(--primary-container), transparent);
          transform-origin: left;
          animation: lineScale 2s infinite ease-in-out;
        }
        
        @keyframes lineScale {
          0%, 100% { transform: scaleX(0.5); opacity: 0.4; }
          50% { transform: scaleX(1.2); opacity: 1; }
        }

        @media (max-width: 1024px) {
          .display-lg { font-size: 4rem; }
        }
        @media (max-width: 768px) {
          #hero { padding-top: 100px; }
          .hero-title { font-size: 2.75rem; line-height: 1.2; }
          .hero-desc { font-size: 1rem; margin-bottom: 48px; }
          .hero-ctas { flex-direction: column; width: 100%; }
          .hero-ctas :global(.btn-primary), 
          .hero-ctas :global(.btn-ghost) { width: 100%; text-align: center; }
          .hero-footer { bottom: 40px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 2.2rem; }
          .hero-label { font-size: 0.65rem; gap: 10px; }
          .label-logo { width: 20px; height: 20px; }
        }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
      `}</style>
    </section>
  );
}
