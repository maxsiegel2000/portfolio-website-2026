"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import GradientText from "../GradientText";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

export function ContactSectionClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="text-center mb-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-background border backdrop-blur-sm mb-6"
        whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.3)" }}
        variants={fadeInUp}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-4 w-4 text-indigo-300" />
        </motion.div>
        <span className="text-sm font-medium text-white/80">
          ✨ Let's Connect
        </span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </motion.div>

      <motion.h2
        className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
        variants={fadeInUp}
      >
        <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-white/80">
          Get in 
        </span>
        {" "}
        <GradientText
          animationSpeed={3}
          className="inline-flex! items-baseline! font-bold! bg-bg-gradient-primary"
        >
          Touch
        </GradientText>
      </motion.h2>

      <motion.p
        className="text-xl sm:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed"
        variants={fadeInUp}
      >
        Wherever you are in the world, let&apos;s work together on your next
        project.
      </motion.p>
    </motion.div>
  );
}
