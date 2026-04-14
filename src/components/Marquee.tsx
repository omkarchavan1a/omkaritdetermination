"use client";

const techStack = [
  "NEXT.JS 14+", "AI INTEGRATION", "CORE WEB VITALS", "STRATEGIC SEO",
  "PRECISION ENGINEERING", "FLASK ECOSYSTEM", "AWWWARDS-LEVEL UI",
  "DATA SCRAPING", "CLOUD DEPLOYMENT", "SYSTEM ARCHITECTURE"
];

export default function Marquee({ items }: { items?: string[] }) {
  const displayItems = items && items.length > 0 ? items : techStack;

  return (
    <div className="marquee">
      <div className="marquee-content">
        {/* Double the array for seamless looping */}
        {[...displayItems, ...displayItems].map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-dot"></span>
            {item}
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
          background: var(--dark-2);
          padding: 24px 0;
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          white-space: nowrap;
          position: relative;
        }
        .marquee-content {
          display: flex;
          gap: 40px;
          animation: marqueeScroll 40s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-dim);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .marquee-dot {
          width: 6px;
          height: 6px;
          background: var(--gold);
          border-radius: 50%;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
