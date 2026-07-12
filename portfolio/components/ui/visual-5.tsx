"use client";

import { motion } from "framer-motion";
import { type CSSProperties, useState } from "react";

interface Visual4Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  showLayer1?: boolean;
}

export function Visual5({ gridColor = "#80808015" }: Visual4Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 md:px-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GridLayer color={gridColor} />

      <motion.svg
        viewBox="0 0 480 260"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="relative z-20 block h-full w-full min-w-0 max-w-[480px]"
      >
        <defs>
          <radialGradient id="visual5-hover-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#35BAE7" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#35BAE7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#35BAE7" stopOpacity="0" />
          </radialGradient>
          <mask id="visual5-center-point-cutout">
            <rect x="0" y="0" width="480" height="260" fill="white" />
            <circle cx="250" cy="132" r="7" fill="black" />
          </mask>
        </defs>

        {/* Glow Background */}
        <motion.ellipse
          cx="250"
          cy="132"
          rx="92"
          ry="58"
          fill="url(#visual5-hover-glow)"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.94 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transformOrigin: "250px 132px" }}
        />

        {/* Top Branch */}
        <g>
          <motion.path
            d="M168 132 C 188 132, 188 88, 214 88 L 286 88 C 312 88, 312 132, 332 132"
            fill="none"
            stroke="#204fD7"
            strokeWidth={2.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              hovered
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 0.45,
              delay: hovered ? 0.16 : 0,
              ease: "easeOut",
            }}
          />
          <motion.circle
            cx="250"
            cy="88"
            r="6.5"
            initial={false}
            animate={{
              fill: hovered ? "#204FD7" : "#4B5563",
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              duration: 0.16,
              delay: hovered ? 0.26 : 0,
              ease: "easeOut",
            }}
          />
        </g>

        {/* Main Branch */}
        <g>
          <line
            x1="72"
            y1="132"
            x2="250"
            y2="132"
            stroke="#586171"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="250"
            y1="132"
            x2="392"
            y2="132"
            stroke="#586171"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <motion.line
            x1="250"
            y1="132"
            x2="392"
            y2="132"
            stroke="#35BAE7"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={false}
            animate={hovered ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ pathLength: hovered ? 1 : 0 }}
          />

          {/* First Circle */}
          <circle cx="96" cy="132" r="7" fill="#4B5563" />

          {/* Second Circle */}
          <motion.circle
            cx="168"
            cy="132"
            r="7"
            initial={false}
            animate={{ fill: hovered ? "#204FD7" : "#4B5563" }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          />

          {/* Third Circle */}
          <circle cx="250" cy="132" r="7" fill="#35BAE7" className="z-20" />

          {/* Forth Circle */}
          <motion.circle
            cx="332"
            cy="132"
            r="7"
            initial={false}
            animate={{ fill: hovered ? "#204FD7" : "#4B5563" }}
            transition={{
              duration: 0.16,
              delay: hovered ? 0.6 : 0,
              ease: "easeOut",
            }}
          />

          {/* Rectangle */}
          <motion.rect
            x="392"
            y="116"
            width="48"
            height="32"
            rx="8"
            initial={false}
            animate={{
              fill: hovered ? "#358fab" : "#13161D",
              stroke: hovered ? "#67E8F9" : "#374151",
            }}
            transition={{
              duration: 0.22,
              delay: hovered ? 0.6 : 0,
              ease: "easeOut",
            }}
          />

          <motion.rect
            x="406"
            y="128"
            width="20"
            height="6"
            rx="3"
            initial={false}
            animate={{ fill: hovered ? "#D8F7FF" : "#5B6472" }}
            transition={{
              duration: 0.22,
              delay: hovered ? 0.6 : 0,
              ease: "easeOut",
            }}
          />
        </g>

        {/* Bottom Branch */}
        <g>
          <motion.path
            d="M250 132 C 270 132, 270 178, 300 178 L 390 178"
            fill="none"
            stroke="#8B5CF6"
            mask="url(#visual5-center-point-cutout)"
            className="z-10"
            strokeWidth={2.4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              hovered
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 0.45,
              delay: hovered ? 0.16 : 0,
              ease: "easeOut",
            }}
          />

          <motion.circle
            cx="340"
            cy="178"
            r="6.5"
            initial={false}
            animate={{
              fill: hovered ? "#8B5CF6" : "#4B5563",
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              duration: 0.16,
              delay: hovered ? 0.4 : 0,
              ease: "easeOut",
            }}
          />

          {/* Rectangle */}
          <motion.rect
            x="390"
            y="162"
            width="50"
            height="32"
            rx="8"
            initial={false}
            animate={{
              fill: hovered ? "#8B5CF6" : "#13161D",
              stroke: hovered ? "#C084FC" : "#374151",
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              duration: 0.22,
              delay: hovered ? 0.6 : 0,
              ease: "easeOut",
            }}
          />

          <motion.rect
            x="405"
            y="174"
            width="20"
            height="6"
            rx="3"
            initial={false}
            animate={{
              fill: hovered ? "#F3E8FF" : "#5B6472",
              opacity: hovered ? 1 : 0,
            }}
            transition={{
              duration: 0.22,
              delay: hovered ? 0.6 : 0,
              ease: "easeOut",
            }}
          />
        </g>
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
