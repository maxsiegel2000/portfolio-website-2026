import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
};

const FadeIn = ({
  children,
  delay = 0,
  duration = 500,
  threshold = 0.1,
  className,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        //Trigger animation when element enters viewport
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px", //Trigger slightly before element is fully visible
      },
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
  }, [threshold, isVisible]);
  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className ?? ""}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
