"use client";

import useReveal from "@/hooks/useReveal";

export default function About() {
  const containerRef = useReveal();

  return (
    <section id="about" ref={containerRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-info">
            <span className="section-label reveal">The Founder</span>
            <h2 className="section-title reveal">
              Driven by <em>Determination</em>,<br />
              Built for Results.
            </h2>
            <p className="section-desc reveal">
              I'm Omkar Chavan, Founder & Lead Developer at <strong>Omkar IT Determination</strong>. I provide high-quality websites, landing pages, IT software, and AI-driven services — transforming complex problems into seamless digital experiences.
            </p>
            <p className="about-detailed reveal">
              From ranking Vercel sites on Google Search Console to building CrewAI multi-agent systems and creating Instagram marketing strategies that mirror your brand — I deliver end-to-end digital excellence for every client.
            </p>

            <div className="tech-arsenal reveal">
              <span className="arsenal-label">Technical Arsenal</span>
              <div className="arsenal-grid">
                <div className="arsenal-item">
                  <span className="arsenal-cat">Frontend</span>
                  <span className="arsenal-techs">Next.js · HTML5 · CSS3 · Tailwind · JavaScript</span>
                </div>
                <div className="arsenal-item">
                  <span className="arsenal-cat">Backend</span>
                  <span className="arsenal-techs">Python · Flask · BeautifulSoup · Tkinter</span>
                </div>
                <div className="arsenal-item">
                  <span className="arsenal-cat">Database</span>
                  <span className="arsenal-techs">SQLite</span>
                </div>
                <div className="arsenal-item">
                  <span className="arsenal-cat">Mobile / Env</span>
                  <span className="arsenal-techs">Termux Development & Troubleshooting</span>
                </div>
                <div className="arsenal-item">
                  <span className="arsenal-cat">Marketing & SEO</span>
                  <span className="arsenal-techs">Google Search Console · Vercel · Hostinger · Instagram</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-media reveal-right">
            <div className="about-img-frame">
              <img
                src="/logo.jpg"
                alt="Omkar Chavan"
                className="about-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="floating-badge">
                <div className="badge-inner">
                  <span className="badge-year">Est. 2021</span>
                  <span className="badge-title">Omkar IT Determination</span>
                </div>
              </div>
            </div>
            <div className="experience-pill">
              Next.js · AI · SEO
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 100px;
          align-items: center;
        }
        .about-detailed {
          color: var(--text-dim);
          font-size: 1rem;
          line-height: 1.8;
          margin: 24px 0 40px;
          font-weight: 300;
        }
        .tech-arsenal {
          padding-top: 36px;
          border-top: 1px solid var(--glass-border);
        }
        .arsenal-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--gold);
          font-weight: 700;
          margin-bottom: 20px;
        }
        .arsenal-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .arsenal-item {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 12px;
          align-items: baseline;
        }
        .arsenal-cat {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          font-weight: 600;
        }
        .arsenal-techs {
          font-size: 0.88rem;
          color: var(--text);
          font-weight: 300;
          line-height: 1.4;
        }
        .about-media {
          position: relative;
        }
        .about-img-frame {
          position: relative;
          border-radius: 24px;
          padding: 16px;
          border: 1px solid var(--glass-border);
          background: var(--glass);
          overflow: visible;
        }
        .about-img {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 16px;
          filter: grayscale(0.2) contrast(1.1);
          transition: transform 0.6s var(--transition);
        }
        .about-img-frame:hover .about-img {
          transform: scale(1.03);
          filter: grayscale(0) contrast(1);
        }
        .floating-badge {
          position: absolute;
          bottom: -30px;
          right: -30px;
          background: linear-gradient(135deg, var(--gold), var(--saffron));
          padding: 24px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .badge-inner {
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: var(--dark);
        }
        .badge-year {
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
        }
        .badge-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }
        .experience-pill {
          position: absolute;
          top: 40px;
          left: -40px;
          background: var(--dark-2);
          border: 1px solid var(--gold);
          color: var(--gold);
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeIn 1s ease 0.5s both;
        }

        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 80px; }
          .about-media { max-width: 500px; margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .stat-row { flex-wrap: wrap; gap: 30px; }
          .floating-badge { bottom: -20px; right: -10px; padding: 16px; }
          .experience-pill { left: -10px; top: 20px; font-size: 0.7rem; }
        }
      `}</style>
    </section>
  );
}
