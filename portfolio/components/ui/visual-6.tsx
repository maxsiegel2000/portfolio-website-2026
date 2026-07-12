"use client";

import { motion, type Variants } from "framer-motion";
import { type CSSProperties, useRef, useState } from "react";

interface Visual4Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  showLayer1?: boolean;
}

const parent = {
  open: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.05,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const tabItem = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 4 },
};

const stats = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.06,
    },
  },
  closed: {
    opacity: 0,
    x: -4,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const statsRight = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 4 },
};

const textBar = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const sidebarTabs = [
  { id: "tab-1", y: 28, height: 6, fill: "#40475e" },
  { id: "tab-2", y: 38, height: 12, fill: "#35BAE7" },
  { id: "tab-3", y: 54, height: 12, fill: "#40475e" },
  { id: "tab-4", y: 70, height: 12, fill: "#40475e" },
  { id: "tab-5", y: 86, height: 12, fill: "#40475e" },
];

const statBarItem: Variants = {
  open: (bar: { height: number }) => ({
    height: bar.height,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  }),
  closed: {
    height: 0,
    transition: {
      duration: 0.12,
      ease: "easeOut",
    },
  },
};

const statsBar = [
  { id: "bar-1", y: 29, x: 220, height: 10 },
  { id: "bar-2", y: 31, x: 216, height: 8 },
  { id: "bar-3", y: 33, x: 212, height: 6 },
];

export function Visual6({ gridColor = "#80808015" }: Visual4Props) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const closeTimoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handelMouseEnter = () => {
    if (closeTimoutRef.current) {
      clearTimeout(closeTimoutRef.current);
      closeTimoutRef.current = null;
    }

    setHovered(true);
    setExpanded(true);
  };

  const handeMouseLeave = () => {
    setHovered(false);

    closeTimoutRef.current = setTimeout(() => {
      setExpanded(false);
      closeTimoutRef.current = null;
    }, 500);
  };

  return (
    <motion.div
      className="relative overflow-hidden"
      onMouseEnter={() => handelMouseEnter()}
      onMouseLeave={() => handeMouseLeave()}
    >
      <GridLayer color={gridColor} />

      <motion.svg viewBox="0 0 420 180" className="relative z-20">
        <defs>
          <linearGradient
            id="visual6-blue-gradient"
            x1="293.5"
            y1="101"
            x2="139.5"
            y2="49"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#D8FBFF" stopOpacity="0.3" />
            <stop offset="34%" stopColor="#9BEFFF" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#62D7F4" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#35BAE7" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="visual6-hover-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#35BAE7" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#204FD7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#204FD7" stopOpacity="0.0" />
          </radialGradient>
          {/* Big hover glow bg */}
          <filter
            id="visual6-hover-glow-blur"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
          >
            <feGaussianBlur stdDeviation="24" />
          </filter>
          {/* Tab hover glow */}
          <filter id="tab-glow" x="-140%" y="-140%" width="380%" height="380%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.21 0 0 0 0 0.73 0 0 0 0 0.91 0 0 0 0.45 0"
            />
          </filter>
        </defs>

        <motion.ellipse
          cx="210"
          cy="92"
          rx="124"
          ry="78"
          fill="url(#visual6-hover-glow)"
          filter="url(#visual6-hover-glow-blur)"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.94 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transformOrigin: "210px 92px" }}
        />

        {/* Dashboard */}
        <g>
          {/* Main Window */}
          <motion.rect
            x={expanded ? "110" : "140"}
            y={expanded ? "20" : "40"}
            width={expanded ? "188" : "128"}
            height={expanded ? "128" : "88"}
            rx="8"
            fill="#13161D"
            stroke={expanded ? "#637591" : "#3A4454"}
            strokeWidth={expanded ? 1 : 0.75}
            className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
          />
          {/* Sidebar */}
          <g>
            {/* Sidebar main rect */}
            <rect
              x={expanded ? "115" : "143.5"}
              y={expanded ? "24" : "42.5"}
              width={expanded ? "20" : "10"}
              height={expanded ? "120" : "82"}
              rx="5.25"
              fill="#2a2d36"
              stroke={expanded ? "#374152" : "#2a2d36"}
              strokeWidth={expanded ? 0.5 : 0.25}
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
            />
            {/* Sidebar tabs on hover */}
            <motion.g
              variants={parent}
              initial={false}
              animate={hovered ? "open" : "closed"}
            >
              {sidebarTabs.map((tab) => (
                <motion.g key={tab.id} variants={tabItem}>
                  {tab.id === "tab-2" && (
                    <rect
                      x="118.5"
                      y={tab.y - 0.5}
                      width="13"
                      height={tab.height + 1}
                      rx="3"
                      fill="#35BAE7"
                      filter="url(#tab-glow)"
                      opacity="0.42"
                    />
                  )}
                  <rect
                    width="12"
                    x="119"
                    y={tab.y}
                    rx="2.5"
                    height={tab.height}
                    fill={tab.fill}
                  />
                  {tab.id === "tab-2" && (
                    <circle
                      cx={119 + 12 / 2}
                      cy={tab.y + tab.height / 2}
                      r="4"
                      fill="#fff"
                    />
                  )}
                </motion.g>
              ))}
            </motion.g>
          </g>

          {/* Top Stats */}
          <g>
            {/* Left "Overview" */}
            <g>
              <rect
                x={expanded ? "139.5" : "157"}
                y={expanded ? "24" : "42.5"}
                width={expanded ? "60" : "52"}
                height={expanded ? "20" : "15"}
                rx="5.25"
                fill="#2a2d36"
                stroke={expanded ? "#374152" : "#2a2d36"}
                strokeWidth={expanded ? 0.5 : 0.25}
                className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
              />
              <motion.g
                variants={parent}
                initial={false}
                animate={hovered ? "open" : "closed"}
              >
                <motion.g variants={stats}>
                  <rect
                    x="145"
                    y="27"
                    width="14"
                    height="14"
                    rx="2.5"
                    fill="#40475e"
                  />
                  <rect
                    x="149"
                    y="31"
                    width="6"
                    height="6"
                    rx="1"
                    strokeWidth={0.5}
                    fill="none"
                    stroke="#fff"
                  />
                </motion.g>
                <motion.text
                  x="165"
                  y="36"
                  fill="#fff"
                  fontSize="6"
                  variants={textBar}
                >
                  Overview
                </motion.text>
              </motion.g>
            </g>
          </g>

          {/* Right "Analitcs" */}
          <g>
            <rect
              x={expanded ? "204" : "212"}
              y={expanded ? "24" : "42.5"}
              width={expanded ? "90" : "52"}
              height={expanded ? "20" : "15"}
              rx="5.25"
              fill="#2a2d36"
              stroke={expanded ? "#374152" : "#2a2d36"}
              strokeWidth={expanded ? 0.5 : 0.25}
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
            />
            <motion.g
              variants={parent}
              initial={false}
              animate={hovered ? "open" : "closed"}
            >
              <motion.g variants={stats}>
                <rect
                  x="210"
                  y="27"
                  width="14"
                  height="14"
                  rx="2.5"
                  fill="#40475e"
                />
                {statsBar.map((bar) => (
                  <motion.rect
                    key={bar.id}
                    variants={statBarItem}
                    custom={bar}
                    x={bar.x}
                    y={bar.y}
                    width="2"
                    height={bar.height}
                    rx="1"
                    fill="#204fd7"
                  />
                ))}
              </motion.g>
              <motion.g variants={statsRight}>
                <rect
                  x="280"
                  y="29"
                  width="10"
                  height="10"
                  rx="2.5"
                  fill="#40475e"
                />

                {Array.from({ length: 3 }).map((_, index) => (
                  <circle
                    key={index}
                    cx={282.5 + index * 2.5}
                    cy="34"
                    r="0.8"
                    fill="#fff"
                  />
                ))}
              </motion.g>
              <motion.text
                x="230"
                y="36"
                fill="#fff"
                fontSize="6"
                variants={textBar}
              >
                Analytics
              </motion.text>
            </motion.g>
          </g>

          {/* Main Rectangles */}
          <g>
            <rect
              x={expanded ? "139.5" : "157"}
              y={expanded ? "49" : "62.5"}
              width={expanded ? "154" : "106.5"}
              height={expanded ? "52" : "20"}
              rx="5.25"
              fill="#35BAE7"
              stroke={expanded ? "#7aecf5" : "#35bae7"}
              strokeWidth={expanded ? 0.75 : 0.5}
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
            />
            <motion.rect
              x={expanded ? "139.5" : "157"}
              y={expanded ? "49" : "62.5"}
              width={expanded ? "154" : "106.5"}
              height={expanded ? "52" : "20"}
              rx="5.25"
              fill="url(#visual6-blue-gradient)"
              initial={false}
              animate={{ opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.6, 0.6, 0, 1] }}
              className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
            />
          </g>
          {/* Main highlight details on hover */}
          <motion.g
            initial={false}
            variants={parent}
            animate={hovered ? "open" : "closed"}
          ></motion.g>
          <rect
            x={expanded ? "139.5" : "157"}
            y={expanded ? "107" : "87.5"}
            width={expanded ? "154" : "106.5"}
            height="37"
            rx="5.25"
            fill="#2a2d36"
            stroke={expanded ? "#374152" : "#2a2d36"}
            strokeWidth={expanded ? 0.5 : 0.25}
            className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
          />
        </g>
        {/* Measurement lines - only visible on hover */}
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
