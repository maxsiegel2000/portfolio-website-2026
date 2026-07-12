"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import type { SectionName } from "@/sanity/lib/types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return { ref, inView };
}
