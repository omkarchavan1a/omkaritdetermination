"use client";

import useReveal from "@/hooks/useReveal";

const projects = [
  {
    title: "The Cafe Elite",
    category: "Business Promotion",
    tags: ["Web Design", "Instagram Marketing", "SEO"],
    desc: "Full website design crafted to mirror the brand's premium café experience, integrated with a cohesive Instagram marketing strategy for maximum reach and engagement.",
    favicon: "https://www.google.com/s2/favicons?sz=128&domain=the-cafe-elite.vercel.app",
    link: "https://the-cafe-elite.vercel.app/"
  },
  {
    title: "Shreetej Properties",
    category: "Real Estate Portal",
    tags: ["Next.js", "Quotation System", "SEO"],
    desc: "A comprehensive real estate portal featuring technical implementation of custom quotation systems, detailed address configurations, and Google Search Console ranking.",
    favicon: "https://www.google.com/s2/favicons?sz=128&domain=shreetejproperties.com",
    link: "https://www.shreetejproperties.com/"
  }
];

export default function Portfolio() {
  const containerRef = useReveal();

  return (
    <section id="portfolio" ref={containerRef}>
      <div className="container">
        <div className="portfolio-header">
          <div className="header-text">
            <span className="section-label reveal">Recent Work</span>
            <h2 className="section-title reveal">
              Selected <em>Artifacts</em><br />of Engineering.
            </h2>
          </div>
          <p className="section-desc reveal">
            Real-world projects that prove reliability, technical skill, and measurable results for every client.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card reveal delay-${index + 1}`}>
              <div className="project-logo-strip">
                <img
                  src={project.favicon}
                  alt={`${project.title} logo`}
                  className="project-site-logo"
                />
                <span className="project-site-name">{project.title}</span>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-visit-badge">
                  Live ↗
                </a>
              </div>
              <div className="project-details">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <div className="project-tags">
                    {project.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="tag-chip">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-live-link">
                  Visit Live Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .portfolio-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 80px;
          gap: 60px;
        }
        .header-text { max-width: 600px; }
        
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px;
        }
        
        .project-card {
          position: relative;
          background: var(--dark-2);
          border-radius: 32px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          transition: transform 0.5s var(--transition);
        }
        .project-card:hover {
          transform: translateY(-8px);
        }
        
        .project-logo-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 28px 36px;
          background: rgba(201,168,76,0.04);
          border-bottom: 1px solid var(--glass-border);
        }
        .project-site-logo {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: var(--dark-3);
          object-fit: contain;
          padding: 4px;
          flex-shrink: 0;
        }
        .project-site-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text);
          flex: 1;
        }
        .project-visit-badge {
          padding: 6px 16px;
          border: 1px solid var(--gold);
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--gold);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background 0.3s, color 0.3s;
          white-space: nowrap;
        }
        .project-visit-badge:hover {
          background: var(--gold);
          color: var(--dark);
        }
        
        .project-details {
          padding: 36px;
        }
        .project-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .project-category {
          font-size: 0.75rem;
          color: var(--gold);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.15em;
        }
        .project-tags {
          display: flex;
          gap: 8px;
        }
        .tag-chip {
          padding: 4px 12px;
          border-radius: 50px;
          border: 1px solid var(--glass-border);
          font-size: 0.65rem;
          color: var(--text-dim);
          background: var(--glass);
        }
        .project-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 16px;
        }
        .project-desc {
          font-size: 0.9rem;
          color: var(--text-dim);
          line-height: 1.65;
          font-weight: 300;
          margin-bottom: 24px;
        }
        .project-live-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--gold);
          text-decoration: none;
          transition: gap 0.3s, opacity 0.3s;
        }
        .project-live-link:hover { gap: 14px; opacity: 0.8; }

        @media (max-width: 1024px) {
          .portfolio-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .portfolio-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .project-details { padding: 24px; }
          .project-title { font-size: 1.8rem; }
          .project-meta { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>
    </section>
  );
}
