import { useEffect, useState } from "react";

export const useScrollSpy = (sectionIds: string[], offset = 100) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      //Find the current section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHigh = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHigh
          ) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
};

//Smooth scroll to a section
export const scrollToSection = (sectionId: string, offset = 80) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  window.scrollTo({
    top: section.offsetTop - offset,
    behavior: "smooth"
  });
};
