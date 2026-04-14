"use client";

import Link from "next/link";

export default function Footer({ content }: { content?: any }) {
  const displayTagline = content?.tagline || "Founder & Lead Developer at Omkar IT Determination. Providing high-quality websites, landing pages, IT software, and AI-driven services.";
  const displayTrademark = content?.trademark || `© ${new Date().getFullYear()} Omkar IT Determination. All Rights Reserved.`;
  const internalLinks = (content?.links && content.links.length > 0) ? content.links : [
    { label: "The Founder", url: "#about" },
    { label: "The Expertise", url: "#services" },
    { label: "The Artifacts", url: "#portfolio" },
    { label: "The Method", url: "#process" }
  ];
  const socialLinks = (content?.social && content.social.length > 0) ? content.social : [
    { platform: "Instagram", url: "https://www.instagram.com/omkarchavann_", icon: "" },
    { platform: "WhatsApp", url: "https://wa.me/919096518451", icon: "" },
    { platform: "Email Office", url: "mailto:omkarchavan1500@gmail.com", icon: "" }
  ];

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-signature">
            <div className="footer-brand-logo">
              <img 
                src="/logo.jpg" 
                alt="Omkar IT Logo" 
                className="footer-logo-img"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <h2 className="signature-logo serif">Omkar IT Determination</h2>
            </div>
            <p className="signature-tagline">
              {displayTagline}
            </p>
          </div>
          
          <div className="footer-nav">
            <div className="nav-group">
              <span className="nav-label">Navigation</span>
              <ul className="nav-list">
                {internalLinks.map((link: any, i: number) => (
                  <li key={i}><Link href={link.url}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="nav-group">
              <span className="nav-label">Connect</span>
              <ul className="nav-list">
                {socialLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            {displayTrademark}
          </div>
          <div className="location-stamp">
            Pune, India — Global Scale.
          </div>
        </div>
      </div>

      <style jsx>{`
        footer {
          background: var(--surface);
          padding: 120px 0 60px;
          border-top: 1px solid var(--glass-border);
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 100px;
          margin-bottom: 100px;
        }
        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }
        .footer-logo-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid var(--primary-container);
          object-fit: cover;
        }
        .signature-logo {
          font-size: 2rem;
          color: var(--primary-container);
        }
        .signature-tagline {
          font-size: 1.1rem;
          color: var(--on-surface-variant);
          max-width: 400px;
          line-height: 1.7;
          font-weight: 300;
        }

        .footer-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        .nav-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--on-surface-variant);
          margin-bottom: 32px;
          font-weight: 600;
        }
        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .nav-list a {
          color: #3b82f6;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 300;
          transition: color 0.3s;
        }
        .nav-list a:hover {
          color: var(--primary-container);
        }

        .footer-nav .nav-group:last-child .nav-list a {
          color: var(--on-surface);
        }
        .footer-nav .nav-group:last-child .nav-list a:hover {
          color: var(--primary-container);
        }

        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--on-surface-variant);
          opacity: 0.6;
        }

        @media (max-width: 1024px) {
          .footer-top { grid-template-columns: 1fr; gap: 80px; }
          .footer-nav { max-width: 600px; }
        }
        @media (max-width: 768px) {
          .footer-nav { grid-template-columns: 1fr; gap: 40px; }
          .footer-brand-logo { flex-direction: column; align-items: flex-start; }
          .signature-logo { font-size: 1.5rem; }
        }
        @media (max-width: 640px) {
          .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
