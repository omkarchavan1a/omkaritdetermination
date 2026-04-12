"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll(
      "a, button, .service-card, .project-card, .skill-chip, .stat-card, .contact-channel"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    let requestRef: number;

    const animateRing = () => {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      requestRef = requestAnimationFrame(animateRing);
    };

    requestRef = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(requestRef);
  }, [position]);

  return (
    <>
      <div
        id="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          position: "fixed",
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          backgroundColor: isHovering ? "var(--saffron)" : "var(--gold)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
        }}
      />
      <div
        id="cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          position: "fixed",
          width: isHovering ? "52px" : "36px",
          height: isHovering ? "52px" : "36px",
          border: `1.5px solid ${isHovering ? "var(--saffron)" : "var(--gold)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          opacity: isHovering ? 1 : 0.6,
          transition: "width 0.4s, height 0.4s, border-color 0.3s, opacity 0.3s",
        }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        @media (max-width: 1024px) {
          #cursor-dot, #cursor-ring {
            display: none !important;
          }
          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  );
}
