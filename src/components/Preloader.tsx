"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "var(--dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        transition: "opacity 0.8s ease, visibility 0.8s ease",
      }}
    >
      <svg
        style={{
          width: "100px",
          height: "100px",
          animation: "preloaderSpin 2s linear infinite",
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="rgba(201,168,76,0.15)"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: 280,
            strokeDashoffset: 280,
            animation: "preloaderDash 1.8s ease forwards",
          }}
        />
        <defs>
          <linearGradient
            id="goldGrad"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C9A84C" />
            <stop offset="1" stopColor="#FF6F00" />
          </linearGradient>
        </defs>
      </svg>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.5rem",
          fontStyle: "italic",
          letterSpacing: "0.1em",
          background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "fadeInUp 0.5s ease 0.3s both",
        }}
      >
        Omkar IT Determination
      </div>
      <div
        style={{
          width: "200px",
          height: "2px",
          backgroundColor: "var(--dark-3)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, var(--gold), var(--saffron))",
            borderRadius: "2px",
            animation: "loadBar 2s ease forwards",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes preloaderSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes preloaderDash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes loadBar {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
