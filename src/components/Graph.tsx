"use client";

import React, { useMemo } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

const defaultData: DataPoint[] = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 35 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 55 },
  { label: 'Jun', value: 80 },
  { label: 'Jul', value: 75 },
  { label: 'Aug', value: 95 },
];

export default function Graph({ data = defaultData, title = "System Performance" }: { data?: DataPoint[], title?: string }) {
  const width = 800;
  const height = 400;
  const padding = 60;

  const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
  
  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = padding + (i * (width - 2 * padding) / (data.length - 1));
      const y = height - padding - (d.value / maxValue * (height - 2 * padding));
      return { x, y };
    });
  }, [data, maxValue]);

  const pathData = useMemo(() => {
    return points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");
  }, [points]);

  const areaData = useMemo(() => {
    return `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  }, [pathData, points]);

  return (
    <div className="graph-container">
      <div className="graph-header">
        <h4 className="graph-title serif">{title}</h4>
        <div className="graph-legend">
          <span className="legend-dot"></span>
          <span className="legend-label">Efficiency Output</span>
        </div>
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="graph-svg">
        <defs>
          <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-container)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary-container)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <line
            key={v}
            x1={padding}
            y1={height - padding - v * (height - 2 * padding)}
            x2={width - padding}
            y2={height - padding - v * (height - 2 * padding)}
            stroke="var(--glass-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area */}
        <path d={areaData} fill="url(#graphGradient)" className="graph-area" />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="var(--primary-container)"
          strokeWidth="3"
          className="graph-line"
          filter="url(#glow)"
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <g key={i} className="graph-point-group">
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="var(--surface)"
              stroke="var(--primary-container)"
              strokeWidth="2"
              className="graph-point"
            />
            <text
              x={p.x}
              y={height - padding + 20}
              textAnchor="middle"
              className="graph-label"
            >
              {data[i].label}
            </text>
          </g>
        ))}
      </svg>

      <style jsx>{`
        .graph-container {
          background: var(--surface);
          border: 1px solid var(--glass-border);
          padding: 32px;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s var(--transition);
        }
        .graph-container:hover {
          border-color: var(--primary-container);
        }
        .graph-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .graph-title {
          font-size: 1.25rem;
          color: var(--on-surface);
          font-weight: 300;
        }
        .graph-legend {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .legend-dot {
          width: 8px;
          height: 8px;
          background: var(--primary-container);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--primary-container);
        }
        .legend-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--on-surface-variant);
          opacity: 0.7;
        }
        .graph-svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .graph-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 2s forwards cubic-bezier(0.4, 0, 0.2, 1);
        }
        .graph-area {
          opacity: 0;
          animation: fadeIn 1s 1s forwards ease;
        }
        .graph-point-group {
          opacity: 0;
          animation: fadeIn 0.5s calc(var(--index, 0) * 0.1s + 1.5s) forwards ease;
        }
        .graph-label {
          font-size: 10px;
          fill: var(--on-surface-variant);
          font-family: inherit;
        }
        .graph-point {
          transition: r 0.3s var(--transition);
          cursor: pointer;
        }
        .graph-point-group:hover .graph-point {
          r: 6;
          fill: var(--primary-container);
        }

        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
