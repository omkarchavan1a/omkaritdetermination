"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-content">
        <div className="hero-logo-badge">
          <img
            src="/logo.jpg"
            alt="Omkar IT Determination"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot"></span>
          Available for new projects
        </div>
        <h1 className="hero-title">
          Founder & Lead<br />
          <em>Developer</em>
        </h1>
        <p className="hero-sub">
          <strong>Omkar IT Determination</strong> — transforming complex problems into seamless digital experiences through precision engineering, AI innovation, and strategic growth.
        </p>
        <div className="hero-ctas">
          <Link href="#portfolio" className="btn-primary">
            <span>View My Work</span>
          </Link>
          <Link href="#contact" className="btn-ghost">
            Start a Project →
          </Link>
        </div>
      </div>
      <div className="scroll-ind">
        <span className="scroll-ind-text">Scroll</span>
        <div className="scroll-ind-line"></div>
      </div>

      <style jsx>{`
        #hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 120px 60px 80px;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 70% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 80% 60%, rgba(255,111,0,0.05) 0%, transparent 60%);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-content {
          position: relative;
          max-width: 900px;
          text-align: center;
          z-index: 1;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          border-radius: 50px;
          border: 1px solid var(--glass-border);
          background: var(--glass);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 36px;
          animation: fadeInUp 0.7s ease 0.3s both;
        }
        .hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: pulse 2s ease infinite;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          font-weight: 600;
          line-height: 1.05;
          margin-bottom: 28px;
          animation: fadeInUp 0.8s ease 0.45s both;
        }
        .hero-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold), var(--gold-light), var(--saffron));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.1rem;
          color: var(--text-dim);
          max-width: 560px;
          margin: 0 auto 48px;
          line-height: 1.7;
          font-weight: 300;
          animation: fadeInUp 0.8s ease 0.6s both;
        }
        .hero-sub strong {
          color: var(--gold-light);
          font-weight: 500;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease 0.75s both;
        }
        .hero-logo-badge {
          display: inline-block;
          margin-bottom: 28px;
          animation: fadeInDown 0.8s ease 0.1s both;
        }
        .hero-logo-badge img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          box-shadow: 0 0 40px rgba(201,168,76,0.25);
          animation: floatAndRotate 6s ease-in-out infinite;
        }
        @keyframes floatAndRotate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
        .scroll-ind {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: fadeIn 1s ease 1.5s both;
        }
        .scroll-ind-text {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-dim);
        }
        .scroll-ind-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: scrollLine 1.5s ease infinite;
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @media (max-width: 640px) {
          #hero { padding: 100px 20px 60px; }
          .hero-ctas { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}
