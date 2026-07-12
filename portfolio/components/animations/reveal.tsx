"use client";

import { type HTMLMotionProps, motion, type Variants } from "framer-motion";

type RevealPreset =
  | "fadeUp"
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "scaleIn";

type TimeInput = number;

const DEFAULT_EASE = [0.23, 0.86, 0.39, 0.96] as const;

const toSeconds = (value: number) => (value > 10 ? value / 1000 : value);

type BaseRevealProps = {
  preset?: RevealPreset;
  distance?: number;
  scaleFrom?: number;
  duration?: TimeInput;
  delay?: number;
  ease?: HTMLMotionProps<"div">["transition"] extends infer T
    ? T extends { ease?: infer E }
      ? E
      : never
    : never;
};

type ViewportProps = {
  once?: boolean;
  amount?: number;
  margin?: string;
};

type RevealProps = HTMLMotionProps<"div"> &
  BaseRevealProps &
  ViewportProps & {
    customVariants?: Variants;
  };

type RevealGroupProps = HTMLMotionProps<"div"> &
  ViewportProps & {
    staggerChildren?: TimeInput;
    delayChildren?: TimeInput;
    customVariants?: Variants;
  };

type RevealItemProps = HTMLMotionProps<"div"> &
  BaseRevealProps & {
    customVariants?: Variants;
  };

const createItemVariants = ({
  preset = "fadeUp",
  distance = 60,
  scaleFrom = 0.9,
  duration = 0.8,
  delay,
  ease = DEFAULT_EASE,
}: BaseRevealProps): Variants => {
  const transition = {
    duration: toSeconds(duration),
    ease,
    ...(delay !== undefined ? { delay: toSeconds(delay) } : {}),
  };

  switch (preset) {
    case "fadeIn":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition },
      };
    case "slideLeft":
      return {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0, transition },
      };
    case "slideRight":
      return {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0, transition },
      };
    case "scaleIn":
      return {
        hidden: { opacity: 0, scale: scaleFrom },
        visible: { opacity: 1, scale: 1, transition },
      };
    default:
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition },
      };
  }
};

const createGroupVariants = (
  staggerChildren: TimeInput,
  delayChildren: TimeInput,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: toSeconds(staggerChildren),
      delayChildren: toSeconds(delayChildren),
    },
  },
});

export function Reveal({
  preset = "fadeUp",
  distance = 60,
  scaleFrom = 0.9,
  duration = 0.8,
  delay,
  ease = DEFAULT_EASE,
  once = true,
  amount = 0.1,
  margin = "-60px 0px",
  customVariants,
  initial = "hidden",
  whileInView = "visible",
  viewport,
  ...props
}: RevealProps) {
  const variants =
    customVariants ??
    createItemVariants({ preset, distance, scaleFrom, duration, delay, ease });

  return (
    <motion.div
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport ?? { once, amount, margin }}
      {...props}
    />
  );
}

export function RevealGroup({
  staggerChildren = 0.2,
  delayChildren = 0.1,
  once = true,
  amount = 0.1,
  margin = "-80px 0px",
  customVariants,
  initial = "hidden",
  whileInView = "visible",
  viewport,
  ...props
}: RevealGroupProps) {
  const variants =
    customVariants ?? createGroupVariants(staggerChildren, delayChildren);

  return (
    <motion.div
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport ?? { once, amount, margin }}
      {...props}
    />
  );
}

export function RevealItem({
  preset = "fadeUp",
  distance = 60,
  scaleFrom = 0.9,
  duration = 0.8,
  delay,
  ease = DEFAULT_EASE,
  customVariants,
  ...props
}: RevealItemProps) {
  const variants =
    customVariants ??
    createItemVariants({ preset, distance, scaleFrom, duration, delay, ease });

  return <motion.div variants={variants} {...props} />;
}
