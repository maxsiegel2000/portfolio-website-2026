"use client";

import { Lightbulb } from "lucide-react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";

interface Visual3Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  showLayer1?: boolean;
}

export function Visual4({
  mainColor = "var(--accent-cyan)",
  secondaryColor = "#fbbf24",
  gridColor = "#80808015",
  showLayer1 = false,
}: Visual3Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": mainColor,
            "--secondary-color": secondaryColor,
          } as React.CSSProperties
        }
      />

      <div className="flex items-center justify-center h-full w-full overflow-hidden">
        <LightBulbLayer color={gridColor} hovered={hovered} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

interface LayerProps {
  color: string;
  secondaryColor?: string;
  hovered?: boolean;
}

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-4 h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:20px_20px] bg-center opacity-70"
    />
  );
};

const LightBulbLayer: React.FC<LayerProps> = ({ color, hovered }) => {
  const hoverAnimationDuration = 2;
  const beamTravel = -32;
  const progress = useMotionValue(0);
  const beamY = useTransform(progress, [0, 1], ["0%", `${beamTravel}%`]);
  const beamOpacity = useTransform(progress, [0, 0.08, 1], [0, 1, 1]);
  const bulbClip = useTransform(
    progress,
    (value) => `inset(${(1 - value) * 100}% 0% 0% 0%)`,
  );
  const isHovered = Boolean(hovered);

  useEffect(() => {
    const controls = animate(progress, isHovered ? 1 : 0, {
      duration: hoverAnimationDuration,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [isHovered, progress]);

  return (
    <div
      className="flex items-center justify-center inset-0 z-5 h-27.5 w-27.5 bg-bg-gradient-primary border rounded-4xl"
      style={{ background: "var(--bg-gradient-primary)" }}
    >
      <div className="relative">
        <Lightbulb size={80} className="text-text-muted" />
        <motion.div
          className="absolute inset-0"
          style={{ color: "var(--accent-cyan)", clipPath: bulbClip }}
        >
          <Lightbulb size={80} />
        </motion.div>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-40"
        style={{ opacity: beamOpacity, y: beamY }}
      >
        <div className="h-40 w-0.5 absolute top-42 left-1/2 -translate-x-1/2 -rotate-90 m-auto bg-linear-to-b from-transparent via-(--accent-cyan) to-transparent">
          <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
            <Sparkles />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<
    Array<{
      id: string;
      top: number;
      left: number;
      moveX: number;
      moveY: number;
      opacity: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const randomMove = () => Math.random() * 2 - 1;
    const randomOpacity = () => Math.random();
    const random = () => Math.random();

    setSparkles(
      Array.from({ length: 12 }, (_, i) => ({
        id: `star-${i}`,
        top: random() * 100,
        left: random() * 100,
        moveX: randomMove(),
        moveY: randomMove(),
        opacity: randomOpacity(),
        duration: random() * 2 + 4,
        delay: random(),
      })),
    );
  }, []);

  if (sparkles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          animate={{
            top: `calc(${sparkle.top}% + ${sparkle.moveY}px)`,
            left: `calc(${sparkle.left}% + ${sparkle.moveX}px)`,
            opacity: sparkle.opacity,
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: sparkle.delay,
          }}
          style={{
            position: "absolute",
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-primary"
        />
      ))}
    </div>
  );
};

const _EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] h-full w-full">
      <svg
        viewBox="0 0 356 180"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 98) rotate(90) scale(98 178)"
          >
            <stop stopColor={color} stopOpacity="0.25" />
            <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
