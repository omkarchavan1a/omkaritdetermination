"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? "scrolled" : ""} id="navbar">
      <Link href="#hero" className="nav-logo">
        <img
          src="/logo.jpg"
          alt="Omkar IT Determination Logo"
          className="nav-logo-img"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            const span = (e.target as HTMLImageElement).nextElementSibling as HTMLSpanElement;
            if (span) span.style.display = "block";
          }}
        />
        <span className="nav-logo-text" style={{ display: "block" }}>
          Omkar.
        </span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#services">Services</Link>
        </li>
        <li>
          <Link href="#portfolio">Work</Link>
        </li>
        <li>
          <Link href="#process">Process</Link>
        </li>
        <li>
          <Link href="#contact" className="nav-cta">
            Let's Talk
          </Link>
        </li>
      </ul>

      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 60px;
          transition: padding 0.4s, background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s;
        }
        nav.scrolled {
          padding: 14px 60px;
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .nav-logo-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
          object-fit: cover;
          transition: transform 0.4s;
        }
        .nav-logo:hover .nav-logo-img {
          transform: rotate(360deg);
        }
        .nav-logo-text {
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          font-size: 1.3rem;
          color: var(--gold);
          letter-spacing: 0.02em;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
        }
        .nav-links :global(a) {
          text-decoration: none;
          color: var(--text-dim);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.3s;
          position: relative;
        }
        .nav-links :global(a)::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s;
        }
        .nav-links :global(a):hover {
          color: var(--gold);
        }
        .nav-links :global(a):hover::after {
          width: 100%;
        }
        .nav-cta {
          padding: 10px 24px;
          border: 1px solid var(--gold);
          border-radius: 50px;
          color: var(--gold) !important;
          font-size: 0.82rem !important;
          letter-spacing: 0.1em !important;
          transition: background 0.3s, color 0.3s !important;
        }
        .nav-cta:hover {
          background: var(--gold) !important;
          color: var(--dark) !important;
        }
        .nav-cta::after {
          display: none !important;
        }

        @media (max-width: 1024px) {
          nav { padding: 18px 32px; }
          nav.scrolled { padding: 12px 32px; }
        }
        @media (max-width: 640px) {
          nav { padding: 16px 20px; }
          nav.scrolled { padding: 12px 20px; }
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
}
