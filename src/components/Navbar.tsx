"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`} id="navbar">
      <div className="nav-container">
        <Link href="#hero" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="logo-img" 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span className="logo-text serif">Omkar IT Determination</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links desktop-only">
          <li><Link href="#about">The Founder</Link></li>
          <li><Link href="#services">The Expertise</Link></li>
          <li><Link href="#portfolio">The Artifacts</Link></li>
          <li><Link href="#process">The Method</Link></li>
          <li><Link href="#contact" className="nav-cta">Get in Touch</Link></li>
        </ul>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="mobile-nav-links">
          <li><Link href="#about" onClick={toggleMenu}>The Founder</Link></li>
          <li><Link href="#services" onClick={toggleMenu}>The Expertise</Link></li>
          <li><Link href="#portfolio" onClick={toggleMenu}>The Artifacts</Link></li>
          <li><Link href="#process" onClick={toggleMenu}>The Method</Link></li>
          <li><Link href="#contact" className="btn-primary" onClick={toggleMenu}>Get in Touch</Link></li>
        </ul>
      </div>

      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 32px 0;
          transition: all 0.6s var(--transition);
        }
        nav.scrolled {
          padding: 16px 0;
          background: rgba(19, 19, 19, 0.7);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 80px;
          position: relative;
          z-index: 1100;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
        }
        .logo-img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--primary-container);
          object-fit: cover;
        }
        .logo-text {
          font-size: 1.15rem;
          color: var(--primary-container);
          letter-spacing: -0.01em;
          font-weight: 500;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
          list-style: none;
        }
        .nav-links :global(a) {
          text-decoration: none;
          color: var(--primary-container);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .nav-links :global(a):hover { color: var(--primary); }

        .nav-cta {
          padding: 10px 24px;
          border: 1px solid var(--primary-container);
          border-radius: var(--radius-sm);
          color: var(--primary-container) !important;
        }
        .nav-cta:hover {
          background: var(--primary-container);
          color: var(--surface) !important;
        }

        /* Mobile Controls */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 6px;
          padding: 10px;
        }
        .bar {
          width: 24px;
          height: 1px;
          background: var(--primary-container);
          transition: all 0.4s var(--transition);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(-100%);
          transition: transform 0.6s var(--transition);
          z-index: 1050;
        }
        .mobile-menu.active { transform: translateY(0); }
        .mobile-nav-links {
          list-style: none;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .mobile-nav-links :global(a) {
          font-family: 'Noto Serif', serif;
          font-size: 2rem;
          text-decoration: none;
          color: var(--on-surface);
          transition: color 0.3s;
        }
        .mobile-nav-links :global(a):hover { color: var(--primary-container); }

        @media (max-width: 1024px) {
          .nav-container { padding: 0 40px; }
          .nav-links { gap: 24px; }
        }
        @media (max-width: 850px) {
          .desktop-only { display: none; }
          .mobile-toggle { display: flex; }
          
          /* Hamburger Animation */
          nav.menu-open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
          nav.menu-open .bar:nth-child(2) { opacity: 0; }
          nav.menu-open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
          
          .logo-text { font-size: 1rem; }
        }
        @media (max-width: 480px) {
          .nav-container { padding: 0 24px; }
          .logo-text { display: none; }
        }
      `}</style>
    </nav>
  );
}
