"use client";

import { motion } from "framer-motion";
import { type CSSProperties, useState } from "react";

interface Visual4Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  showLayer1?: boolean;
}

const connectionPaths = [
  {
    id: "beam-top-left",
    d: "M 66 40 C 118 40, 146 46, 182 68",
    duration: 2,
    color: "#7aecf5",
  },
  {
    id: "beam-bottom-left",
    d: "M 66 140 C 118 140, 146 134, 182 112",
    duration: 2.1,
    color: "#204fd7",
  },
  {
    id: "beam-top-right",
    d: "M 354 40 C 302 40, 274 46, 238 68",
    duration: 1.9,
    color: "#35bae7",
  },
  {
    id: "beam-bottom-right",
    d: "M 354 140 C 302 140, 274 134, 238 112",
    duration: 2.2,
    color: "#8B5CF6",
  },
] as const;

const beamRepeatDelay = 0.85;

const avatars = [
  {
    id: "avatar-top-left",
    cx: 80,
    cy: 40,
    fill: "#5B6472",
    hoverFill: "#7aecf5",
  },
  {
    id: "avatar-bottom-left",
    cx: 80,
    cy: 140,
    fill: "#5B6472",
    hoverFill: "#204fd7",
  },
  {
    id: "avatar-top-right",
    cx: 340,
    cy: 40,
    fill: "#5B6472",
    hoverFill: "#35bae7",
  },
  {
    id: "avatar-bottom-right",
    cx: 340,
    cy: 140,
    fill: "#5B6472",
    hoverFill: "#8B5CF6",
  },
] as const;

const rectsData = [
  {
    id: "doc-line-1",
    x: 174.5,
    y: 60,
    width: 44,
    hoverWidth: 25,
    height: 6.5,
    fill: "#5B6472",
    hoverFill: "#204fd7",
  },
  {
    id: "doc-line-2",
    x: 182,
    y: 70,
    width: 50,
    hoverWidth: 50,
    height: 6.5,
    fill: "#35BAE7",
    hoverFill: "#35BAE7",
  },
  {
    id: "doc-line-3",
    x: 182,
    y: 80,
    width: 28,
    hoverWidth: 40,
    height: 6.5,
    fill: "#5B6472",
    hoverFill: "#8B5CF6",
  },
  {
    id: "doc-line-4",
    x: 192,
    y: 90,
    width: 45,
    hoverWidth: 32,
    height: 6.5,
    fill: "#5B6472",
    hoverFill: "#204fd7",
  },
  {
    id: "doc-line-5",
    x: 187,
    y: 100,
    width: 22,
    hoverWidth: 22,
    height: 6.5,
    fill: "#35BAE7",
    hoverFill: "#35BAE7",
  },
  {
    id: "doc-line-6",
    x: 177,
    y: 110,
    width: 20,
    hoverWidth: 35,
    height: 6.5,
    fill: "#5B6472",
    hoverFill: "#7aecf5",
  },
  {
    id: "doc-line-7",
    x: 174.5,
    y: 120,
    width: 15,
    hoverWidth: 22,
    height: 6.5,
    fill: "#5B6472",
    hoverFill: "#204fd7",
  },
];

export function Visual4({ gridColor = "#80808015" }: Visual4Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GridLayer color={gridColor} />

      <motion.svg
        viewBox="0 0 420 180"
        className="relative z-20"
        role="img"
        aria-labelledby="visual-4-title"
      >
        <defs>
          {connectionPaths.map((path) => (
            <linearGradient
              key={`${path.id}-gradient`}
              id={`${path.id}-gradient`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={path.color} stopOpacity="0" />
              <stop offset="25%" stopColor={path.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={path.color} stopOpacity="0.35" />
            </linearGradient>
          ))}
          <filter
            id="visual-4-beam-blur"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <radialGradient id="visual-4-doc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7AECF5" stopOpacity="1" />
            <stop offset="45%" stopColor="#35BAE7" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#204FD7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#204FD7" stopOpacity="0" />
          </radialGradient>
          <filter
            id="visual-4-doc-glow-blur"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
          >
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <g>
          {connectionPaths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              fill="none"
              stroke="#2a2d36"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
        </g>

        <g>
          {connectionPaths.map((path) => (
            <g key={`${path.id}-pulse`}>
              <motion.path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeOpacity="0.45"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="18 82"
                filter="url(#visual-4-beam-blur)"
                initial={false}
                animate={
                  hovered
                    ? { strokeDashoffset: [100, 0], opacity: 1 }
                    : { strokeDashoffset: 100, opacity: 0 }
                }
                transition={
                  hovered
                    ? {
                        strokeDashoffset: {
                          duration: path.duration * 0.55,
                          ease: "linear",
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: beamRepeatDelay,
                        },
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }
                    : {
                        strokeDashoffset: { duration: 0 },
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }
                }
              />
              <motion.path
                d={path.d}
                fill="none"
                stroke={`url(#${path.id}-gradient)`}
                strokeWidth="1"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="18 82"
                initial={false}
                animate={
                  hovered
                    ? { strokeDashoffset: [100, 0], opacity: 1 }
                    : { strokeDashoffset: 100, opacity: 0 }
                }
                transition={
                  hovered
                    ? {
                        strokeDashoffset: {
                          duration: path.duration * 0.55,
                          ease: "linear",
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: beamRepeatDelay,
                        },
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }
                    : {
                        strokeDashoffset: { duration: 0 },
                        opacity: { duration: 0.2, ease: "easeOut" },
                      }
                }
              />
            </g>
          ))}
        </g>

        <motion.g>
          <motion.rect
            x="166"
            y="40"
            width="88"
            height="96"
            rx="14"
            fill="url(#visual-4-doc-glow)"
            filter="url(#visual-4-doc-glow-blur)"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <rect
            x="166"
            y="40"
            width="88"
            height="96"
            rx="14"
            fill="#13161D"
            stroke="#3A4454"
          />

          <circle cx="178" cy="50" r="3.2" fill="#FF6B6B" />
          <circle cx="190" cy="50" r="3.2" fill="#FACC15" />
          <circle cx="202" cy="50" r="3.2" fill="#22C55E" />

          {rectsData.map((rect) => (
            <rect
              key={rect.id}
              width={hovered ? rect.hoverWidth : rect.width}
              height={rect.height}
              x={rect.x}
              y={rect.y}
              fill={hovered ? rect.hoverFill : rect.fill}
              rx="3.25"
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
            />
          ))}
        </motion.g>

        {avatars.map((avatar) => (
          <motion.g key={avatar.id}>
            <circle
              cx={avatar.cx}
              cy={avatar.cy}
              r="16"
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
              fill="#13161D"
              stroke="#2A2D36"
            />
            <circle
              cx={avatar.cx}
              cy={avatar.cy - 6}
              r="5"
              fill={hovered ? avatar.hoverFill : avatar.fill}
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
            />
            <rect
              x={avatar.cx - 7}
              y={avatar.cy + 2}
              width="14"
              height="8"
              rx="4"
              fill={hovered ? avatar.hoverFill : avatar.fill}
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
            />
          </motion.g>
        ))}
      </motion.svg>
    </motion.div>
  );
}

function GridLayer({ color }: { color: string }) {
  return (
    <div
      style={{ "--grid-color": color } as CSSProperties}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:20px_20px] bg-center opacity-70"
    />
  );
}
