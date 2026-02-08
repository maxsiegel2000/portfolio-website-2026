import { useEffect, useRef, useState } from "react";

export const useScrollReveal = <T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = {},
) => {
  const { threshold = 0.1, rootMargin = "0px" } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );
    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
