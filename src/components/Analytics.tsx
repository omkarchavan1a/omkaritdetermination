"use client";

import Graph from "./Graph";

export default function Analytics() {
  const performanceData = [
    { label: "00:00", value: 82 },
    { label: "04:00", value: 85 },
    { label: "08:00", value: 78 },
    { label: "12:00", value: 92 },
    { label: "16:00", value: 88 },
    { label: "20:00", value: 95 },
    { label: "23:59", value: 91 },
  ];

  const latencyData = [
    { label: "00:00", value: 45 },
    { label: "04:00", value: 42 },
    { label: "08:00", value: 48 },
    { label: "12:00", value: 38 },
    { label: "16:00", value: 40 },
    { label: "20:00", value: 35 },
    { label: "23:59", value: 37 },
  ];

  return (
    <section id="analytics" className="reveal">
      <div className="container">
        <div className="analytics-header">
          <span className="section-label">Real-time Metrics</span>
          <h2 className="section-title serif">Strategic <em className="serif">Analytics</em>.</h2>
          <p className="section-desc">
            Monitoring the architectural resilience and algorithmic efficiency of our deployed artifacts in real-time.
          </p>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <Graph data={performanceData} title="Neural Compute Efficiency" />
          </div>
          <div className="analytics-card">
            <Graph data={latencyData} title="Global Latency Distribution (ms)" />
          </div>
        </div>
      </div>

      <style jsx>{`
        #analytics {
          padding: 160px 0;
          background: var(--surface-lowest);
          position: relative;
        }
        .analytics-header {
          margin-bottom: 80px;
          max-width: 800px;
        }
        .section-desc {
          margin-top: 24px;
          color: var(--on-surface-variant);
          font-weight: 300;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        @media (max-width: 1024px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
