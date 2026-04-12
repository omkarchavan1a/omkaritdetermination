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
              Driven by <em>Precision</em>,<br />
              Defined by Results.
            </h2>
            <p className="section-desc reveal">
              I'm Omkar Chavan, the founder of <strong>Omkar IT Determination</strong>. With a deep passion for clean architectural code and cutting-edge technology, I lead a team dedicated to pushing the boundaries of what's possible in the digital realm.
            </p>
            <p className="about-detailed reveal">
              By merging creative vision with technical rigor, we build systems that don't just work—they excel. From complex AI integrations to high-performance web applications, my focus is always on engineering excellence and strategic growth for every partner we work with.
            </p>

            <div className="stat-row">
              <div className="stat-card reveal delay-1">
                <span className="stat-num">4+</span>
                <span className="stat-label">Years of<br />Experience</span>
              </div>
              <div className="stat-card reveal delay-2">
                <span className="stat-num">50+</span>
                <span className="stat-label">Projects<br />Completed</span>
              </div>
              <div className="stat-card reveal delay-3">
                <span className="stat-num">100%</span>
                <span className="stat-label">Client<br />Satisfaction</span>
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
                  <span className="badge-title">Engineering Excellence</span>
                </div>
              </div>
            </div>
            <div className="experience-pill">
              Expertise in Next.js & AI
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
          margin: 24px 0 48px;
          font-weight: 300;
        }
        .stat-row {
          display: flex;
          gap: 40px;
          padding-top: 40px;
          border-top: 1px solid var(--glass-border);
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
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
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
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
