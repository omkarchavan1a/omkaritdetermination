"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="#hero" className="footer-logo">
              <img
                src="/logo.jpg"
                alt="Omkar IT Determination"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="footer-logo-text">Omkar IT Determination</span>
            </Link>
            <p className="footer-tagline">
              Transforming complex problems into seamless digital experiences through precision engineering, AI innovation, and strategic determination.
            </p>
          </div>

          <div className="footer-group">
            <h4 className="footer-label">Navigation</h4>
            <ul className="footer-links">
              <li><Link href="#about">The Founder</Link></li>
              <li><Link href="#services">Our Expertise</Link></li>
              <li><Link href="#portfolio">Artifacts</Link></li>
              <li><Link href="#process">The Method</Link></li>
            </ul>
          </div>

          <div className="footer-group">
            <h4 className="footer-label">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://wa.me/919096518451" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/omkarchavann_" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://the-cafe-elite.vercel.app/" target="_blank" rel="noopener noreferrer">The Cafe Elite</a></li>
              <li><a href="https://www.shreetejproperties.com/" target="_blank" rel="noopener noreferrer">Shreetej Properties</a></li>
            </ul>
          </div>

          <div className="footer-group">
            <h4 className="footer-label">Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:omkarchavan1500@gmail.com">omkarchavan1500@gmail.com</a></li>
              <li><a href="tel:+919096518451">+91 90965 18451</a></li>
              <li><span style={{color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 300}}>Sangamner, India</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Omkar IT Determination. All Rights Reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        footer {
          background: var(--dark-2);
          padding: 100px 0 40px;
          border-top: 1px solid var(--glass-border);
          position: relative;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          margin-bottom: 24px;
        }
        .footer-logo img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--gold);
        }
        .footer-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.3rem;
          color: var(--gold);
        }
        .footer-tagline {
          color: var(--text-dim);
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 320px;
          font-weight: 300;
        }
        .footer-label {
          color: var(--text);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 28px;
          font-weight: 700;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-links a {
          color: var(--text-dim);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s;
          font-weight: 300;
        }
        .footer-links a:hover {
          color: var(--gold);
        }
        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .footer-legal {
          display: flex;
          gap: 24px;
        }
        .footer-legal a {
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-legal a:hover { color: var(--gold); }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
