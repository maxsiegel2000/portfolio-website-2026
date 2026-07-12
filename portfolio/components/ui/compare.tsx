"use client";
import { IconDotsVertical } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  autoplayActive?: boolean;
  allowUserInteraction?: boolean;
  autoplayMode?: "alternate" | "to-left" | "to-right";
}
export const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  autoplayActive = true,
  allowUserInteraction = true,
  autoplayMode = "alternate",
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderXPercentRef = useRef(initialSliderPercentage);

  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayRafRef = useRef<number | null>(null);
  const resetAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    sliderXPercentRef.current = sliderXPercent;
  }, [sliderXPercent]);

  const stopResetAnimation = useCallback(() => {
    if (resetAnimationRef.current !== null) {
      cancelAnimationFrame(resetAnimationRef.current);
      resetAnimationRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay || !autoplayActive) return;
    stopResetAnimation();

    const startPercent = Math.max(0, Math.min(100, sliderXPercentRef.current));
    if (autoplayMode === "alternate") {
      const startOffsetMs = (startPercent / 100) * autoplayDuration;
      const startTime = Date.now() - startOffsetMs;
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress =
          (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
        const percentage =
          progress <= 1 ? progress * 100 : (2 - progress) * 100;

        setSliderXPercent(percentage);
        autoplayRef.current = setTimeout(animate, 16); // ~60fps
      };

      animate();
      return;
    }

    const endPercent = autoplayMode === "to-left" ? 0 : 100;
    const delta = endPercent - startPercent;

    if (Math.abs(delta) < 0.1) {
      setSliderXPercent(endPercent);
      return;
    }

    const durationMs = Math.max(
      120,
      (Math.abs(delta) / 100) * autoplayDuration,
    );
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      setSliderXPercent(startPercent + delta * progress);

      if (progress < 1) {
        autoplayRafRef.current = requestAnimationFrame(step);
      } else {
        autoplayRafRef.current = null;
      }
    };

    autoplayRafRef.current = requestAnimationFrame(step);
  }, [
    autoplay,
    autoplayDuration,
    autoplayActive,
    autoplayMode,
    stopResetAnimation,
  ]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (autoplayRafRef.current !== null) {
      cancelAnimationFrame(autoplayRafRef.current);
      autoplayRafRef.current = null;
    }
  }, []);

  const animateToInitialPosition = useCallback(() => {
    stopResetAnimation();

    const start = sliderXPercentRef.current;
    const end = initialSliderPercentage;
    const delta = end - start;

    if (Math.abs(delta) < 0.1) {
      setSliderXPercent(end);
      return;
    }

    const durationMs = 320;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const eased = easeOutCubic(progress);
      setSliderXPercent(start + delta * eased);

      if (progress < 1) {
        resetAnimationRef.current = requestAnimationFrame(step);
      } else {
        resetAnimationRef.current = null;
      }
    };

    resetAnimationRef.current = requestAnimationFrame(step);
  }, [initialSliderPercentage, stopResetAnimation]);

  useEffect(() => {
    if (!autoplay) return;

    if (autoplayActive) {
      startAutoplay();
      return () => stopAutoplay();
    }

    stopAutoplay();
    animateToInitialPosition();
  }, [
    autoplay,
    autoplayActive,
    startAutoplay,
    stopAutoplay,
    animateToInitialPosition,
  ]);

  useEffect(() => {
    return () => {
      stopAutoplay();
      stopResetAnimation();
    };
  }, [stopAutoplay, stopResetAnimation]);

  function mouseEnterHandler() {
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    startAutoplay();
  }

  const handleStart = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(true);
    }
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging],
  );

  const handleMouseDown = useCallback(() => handleStart(), [handleStart]);
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove],
  );

  const handleTouchStart = useCallback(() => {
    if (!allowUserInteraction || autoplay) return;
    handleStart();
  }, [allowUserInteraction, autoplay, handleStart]);

  const handleTouchEnd = useCallback(() => {
    if (!allowUserInteraction || autoplay) return;
    handleEnd();
  }, [allowUserInteraction, autoplay, handleEnd]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!allowUserInteraction || autoplay) return;
      const touch = e.touches[0];
      if (!touch) return;
      handleMove(touch.clientX);
    },
    [allowUserInteraction, autoplay, handleMove],
  );

  return (
    <div
      ref={sliderRef}
      className={cn("w-[400px] h-[400px] overflow-hidden", className)}
      style={{
        position: "relative",
        cursor: allowUserInteraction
          ? slideMode === "drag"
            ? "grab"
            : "col-resize"
          : "default",
      }}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderXPercent)}
      tabIndex={allowUserInteraction ? 0 : -1}
      onMouseMove={allowUserInteraction ? handleMouseMove : undefined}
      onMouseLeave={allowUserInteraction ? mouseLeaveHandler : undefined}
      onMouseEnter={allowUserInteraction ? mouseEnterHandler : undefined}
      onMouseDown={allowUserInteraction ? handleMouseDown : undefined}
      onMouseUp={allowUserInteraction ? handleMouseUp : undefined}
      onTouchStart={allowUserInteraction ? handleTouchStart : undefined}
      onTouchEnd={allowUserInteraction ? handleTouchEnd : undefined}
      onTouchMove={allowUserInteraction ? handleTouchMove : undefined}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
          <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
          <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
            <MemoizedSparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          {showHandlebar && (
            <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute   flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <IconDotsVertical className="h-4 w-4 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden",
                firstImageClassName,
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              {/* biome-ignore lint/performance/noImgElement: Motion comparison layers require a plain image element. */}
              <img
                alt="Before"
                src={firstImage}
                className={cn(
                  "absolute inset-0  z-20 rounded-2xl shrink-0 w-full h-full select-none",
                  firstImageClassName,
                )}
                draggable={false}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondImage ? (
          <motion.div
            className={cn(
              "absolute top-0 left-0 z-[19]  rounded-2xl w-full h-full select-none",
              secondImageClassname,
            )}
          >
            {/* biome-ignore lint/performance/noImgElement: Motion comparison layers require a plain image element. */}
            <img
              className="h-full w-full rounded-2xl"
              alt="After"
              src={secondImage}
              draggable={false}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
