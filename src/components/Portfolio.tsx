"use client";

import useReveal from "@/hooks/useReveal";

const projects = [
  {
    title: "The Cafe Elite",
    category: "Business Promotion",
    tags: ["Web Design", "Instagram Marketing", "SEO"],
    desc: "Full website design crafted to mirror the brand's premium café experience, integrated with a cohesive Instagram marketing strategy for maximum reach and engagement.",
    img: "/logo.jpg",
    link: "https://the-cafe-elite.vercel.app/"
  },
  {
    title: "Shreetej Properties",
    category: "Real Estate Portal",
    tags: ["Next.js", "Quotation System", "SEO"],
    desc: "A comprehensive real estate portal featuring technical implementation of custom quotation systems, detailed address configurations, and Google Search Console ranking.",
    img: "/logo.jpg",
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
              <div className="project-img-wrap">
                <img
                  src={project.img}
                  alt={project.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="project-overlay">
                  <a href={project.link} className="view-project-btn">
                    Explore Case Study
                  </a>
                </div>
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
        
        .project-img-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--dark-3);
        }
        .project-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--transition);
        }
        .project-card:hover img {
          transform: scale(1.1);
        }
        
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,10,12,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        
        .view-project-btn {
          padding: 16px 32px;
          background: var(--gold);
          color: var(--dark);
          text-decoration: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transform: translateY(20px);
          transition: transform 0.4s;
        }
        .project-card:hover .view-project-btn {
          transform: translateY(0);
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
