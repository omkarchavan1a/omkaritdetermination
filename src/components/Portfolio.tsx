"use client";

import useReveal from "@/hooks/useReveal";

const projects = [
  {
    title: "AI-Driven Real Estate Platform",
    category: "Web Engineering",
    tags: ["Next.js", "GPT-4", "PostgreSQL"],
    img: "/logo.jpg", // Placeholder
    link: "#"
  },
  {
    title: "Global Supply Chain Dashboard",
    category: "System Architecture",
    tags: ["React", "D3.js", "AWS"],
    img: "/logo.jpg", // Placeholder
    link: "#"
  },
  {
    title: "Strategic Growth Portal",
    category: "Digital Strategy",
    tags: ["SEO", "Marketing API", "Next.js"],
    img: "/logo.jpg", // Placeholder
    link: "#"
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
            A curation of high-impact projects where precision engineering Meets strategic business objectives.
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
        .portfolio-grid .project-card:first-child {
          grid-column: span 2;
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
        }

        @media (max-width: 1024px) {
          .portfolio-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .portfolio-grid { grid-template-columns: 1fr; }
          .portfolio-grid .project-card:first-child { grid-column: span 1; }
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
