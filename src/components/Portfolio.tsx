"use client";

import { useEffect } from "react";

const projects = [
  {
    title: "The Cafe Elite",
    category: "Business Promotion",
    tags: ["Full Stack", "Instagram Marketing", "Web Design"],
    desc: "Full website design integrated with Instagram marketing strategies. A digital translation of a premium café experience.",
    favicon: "https://www.google.com/s2/favicons?sz=128&domain=the-cafe-elite.vercel.app",
    link: "https://the-cafe-elite.vercel.app/"
  },
  {
    title: "Shreetej Properties",
    category: "Real Estate Portal",
    tags: ["Next.js", "Real Estate", "Logic Engine"],
    desc: "Technical implementation involving custom dynamic quotation systems and detailed address configurations for organic dominance.",
    favicon: "https://www.google.com/s2/favicons?sz=128&domain=shreetejproperties.com",
    link: "https://www.shreetejproperties.com/"
  }
];

export default function Portfolio({ content }: { content?: any }) {
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

  const safeContent = content || {
    title: "Selected <em class=\"serif\">Artifacts</em>.",
    description: "A curated selection of our most advanced digital solutions, showcasing high-quality technical delivery and strategic design.",
    projects: projects
  };

  return (
    <section id="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <span className="section-label reveal">The Artifacts</span>
          <h2 className="section-title reveal delay-1" dangerouslySetInnerHTML={{ __html: safeContent.title }}></h2>
        </div>

        <div className="portfolio-grid">
          {safeContent.projects?.map((project: any, index: number) => (
            <div key={index} className={`project-artifact reveal delay-${index + 1}`}>
              <div className="artifact-top">
                <div className="artifact-meta">
                  <span className="artifact-cat">{project.category}</span>
                  <div className="artifact-tags">
                    {project.tags?.map((tag: string, tIndex: number) => (
                      <span key={tIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="artifact-link">
                  Visit Project ↗
                </a>
              </div>
              
              <div className="artifact-main">
                <div className="artifact-icon-box">
                   <img
                    src={project.favicon || "/logo.jpg"}
                    alt={`${project.title} logo`}
                    className="artifact-icon"
                  />
                </div>
                <div className="artifact-text">
                  <h3 className="artifact-title serif">{project.title}</h3>
                  <p className="artifact-desc">{project.desc || project.description}</p>
                </div>
              </div>

              <div className="artifact-bottom-glass"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        #portfolio {
          background: var(--surface-low);
          border-top: 1px solid var(--glass-border);
        }
        .portfolio-header {
          margin-bottom: 80px;
        }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .project-artifact {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          padding: 56px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 60px;
          transition: all 0.6s var(--transition);
          overflow: hidden;
        }
        .project-artifact:hover {
          border-color: var(--primary-container);
          transform: scale(1.02);
        }
        .artifact-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 2;
        }
        .artifact-cat {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--primary-container);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }
        .artifact-tags {
          display: flex;
          gap: 8px;
        }
        .artifact-tags .tag {
          font-size: 0.6rem;
          color: var(--on-surface-variant);
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .artifact-link {
          font-size: 0.8rem;
          color: var(--on-surface);
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid var(--primary-container);
          padding-bottom: 2px;
          transition: opacity 0.3s;
        }
        .artifact-link:hover { opacity: 0.7; }
        
        .artifact-main {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 40px;
          align-items: center;
          z-index: 2;
        }
        .artifact-icon-box {
          width: 100px;
          height: 100px;
          background: var(--surface-container);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .artifact-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.7;
          transition: all 0.6s var(--transition);
        }
        .project-artifact:hover .artifact-icon {
          filter: grayscale(0);
          opacity: 1;
        }
        .artifact-title {
          font-size: 2.2rem;
          font-weight: 400;
          margin-bottom: 16px;
        }
        .artifact-desc {
          font-size: 0.95rem;
          color: var(--on-surface-variant);
          line-height: 1.8;
          font-weight: 300;
        }

        .artifact-bottom-glass {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(to right, var(--primary-container), transparent);
          opacity: 0;
          transition: opacity 0.6s var(--transition);
        }
        .project-artifact:hover .artifact-bottom-glass {
          opacity: 0.6;
        }

        @media (max-width: 1100px) {
          .portfolio-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .project-artifact { padding: 40px 30px; gap: 40px; }
          .artifact-main { grid-template-columns: 1fr; gap: 30px; }
          .artifact-icon-box { width: 80px; height: 80px; }
          .artifact-title { font-size: 1.75rem; }
        }

        .delay-1 { transition-delay: 0.1s; }
      `}</style>
    </section>
  );
}
