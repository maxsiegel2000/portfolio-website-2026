"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { SectionName } from "@/sanity/lib/types";
import { LogoutIcon, type LogoutIconHandle } from "../ui/logout";
import { useSidebar } from "../ui/sidebar";
import { type AnimatedIconHandle, DynamicIcon } from "./DynamicIcon";

type NavItem = {
  title?: string | null;
  href?: string | null;
  icon?: string | null;
  isExternal?: boolean | null;
};

type DockClientProps = {
  navItems: NavItem[];
  className?: string;
  activeColor?: string;
};

type DockLink = {
  key: string;
  title: string;
  href?: string;
  isExternal?: boolean;
  sectionName?: SectionName;
  icon: React.ReactNode;
  iconName?: string;
  isAnimatedIcon?: boolean;
  isLogoutIcon?: boolean;
  onClick?: () => void;
};

const buttonVariants = {
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".6rem",
    paddingRight: isSelected ? "1rem" : ".6rem",
  }),
};

const labelVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { type: "spring", bounce: 0, duration: 0.45 };

const SECTION_BY_KEY: Record<string, SectionName> = {
  home: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  contact: "Contact",
};

const normalizeToSectionName = (value?: string | null): SectionName | null => {
  if (!value) return null;
  const key = value.trim().toLowerCase().replace(/^#/, "").replace(/^\/+/, "");
  return SECTION_BY_KEY[key] ?? null;
};


export function DockClient({
  navItems,
  className,
  activeColor = "text-white",
}: DockClientProps) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const {
    activeSection,
    setActiveSection,
    setTimeOfLastClick,
    timeOfLastClick,
  } = useActiveSectionContext();
  const { open, isMobile, openMobile } = useSidebar();
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = React.useState<string | null>(null);
  const iconRefs = React.useRef<
    Record<string, AnimatedIconHandle | LogoutIconHandle | null>
  >({});
  const isSidebarOpen = isMobile ? openMobile : open;

  const links: DockLink[] = React.useMemo(
    () => [
      ...navItems.map((item, index) => ({
        key: `${item.title ?? "item"}-${index}`,
        title: item.title ?? "",
        href: item.href ?? "#",
        isExternal: Boolean(item.isExternal),
        sectionName:
          normalizeToSectionName(item.href) ??
          normalizeToSectionName(item.title),
        iconName: item.icon || "",
        isAnimatedIcon: true,
        icon: null,
      })),
      ...(isSignedIn && !isSidebarOpen
        ? [
            {
              key: "sign-out",
              title: "Sign Out",
              icon: null,
              isAnimatedIcon: false,
              isLogoutIcon: true,
              onClick: () => signOut(),
            },
          ]
        : []),
    ],
    [isSidebarOpen, isSignedIn, navItems, signOut],
  );

  const observedSectionIds = React.useMemo(
    () =>
      links
        .map((link) =>
          link.href?.startsWith("#")
            ? link.href.slice(1).toLowerCase()
            : link.sectionName?.toLowerCase(),
        )
        .filter((id): id is string => Boolean(id)),
    [links],
  );

  const activeSectionId = useScrollSpy(
    observedSectionIds.length > 0
      ? observedSectionIds
      : ["home", "about", "skills", "projects", "contact"],
    140,
  );

  React.useEffect(() => {
    if (Date.now() - timeOfLastClick <= 1000) {
      return;
    }
    const sectionFromScroll = normalizeToSectionName(activeSectionId);
    if (sectionFromScroll) {
      setActiveSection(sectionFromScroll);
    }
  }, [activeSectionId, setActiveSection, timeOfLastClick]);

  React.useEffect(() => {
    const activeLink = links.find((link) => link.sectionName === activeSection);
    if (activeLink) {
      setSelectedKey(activeLink.key);
    }
  }, [activeSection, links]);

  const handleNavigate = (item: DockLink) => {
    setSelectedKey(item.key);

    if (item.onClick) {
      item.onClick();
      return;
    }

    if (!item.href) {
      return;
    }

    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.href.startsWith("#")) {
      if (item.sectionName) {
        setActiveSection(item.sectionName);
      }
      setTimeOfLastClick(Date.now());
      const section = document.querySelector(item.href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", item.href);
      }
      return;
    }

    router.push(item.href);
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-30 w-[calc(100vw-1rem)] max-w-fit -translate-x-1/2 ${className ?? ""}`}
    >
      <motion.div
        className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/55 p-1.5 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {links.map((item) => {
          const isSelected = selectedKey === item.key;
          const isSignOut = item.key === "sign-out";
          const shouldShowLabel =
            isSelected || (isSignOut && hoveredKey === item.key);
          const shouldExpand =
            isSelected || (isSignOut && hoveredKey === item.key);

          return (
            <motion.button
              key={item.key}
              type="button"
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={shouldExpand}
              onClick={() => handleNavigate(item)}
              onMouseEnter={() => {
                setHoveredKey(item.key);
                iconRefs.current[item.key]?.startAnimation();
              }}
              onMouseLeave={() => {
                setHoveredKey((current) =>
                  current === item.key ? null : current,
                );
                iconRefs.current[item.key]?.stopAnimation();
              }}
              onFocus={() => {
                setHoveredKey(item.key);
                iconRefs.current[item.key]?.startAnimation();
              }}
              onBlur={() => {
                setHoveredKey((current) =>
                  current === item.key ? null : current,
                );
                iconRefs.current[item.key]?.stopAnimation();
              }}
              transition={transition}
              className={`relative flex shrink-0 items-center rounded-xl py-2 text-sm font-medium transition-colors duration-300 ${
                isSignOut
                  ? "text-red-300 hover:bg-red-500/20 hover:text-red-200"
                  : isSelected
                    ? `bg-white/15 ${activeColor}`
                    : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              title={item.title}
            >
              <span className="h-5 w-5 shrink-0">
                {item.isAnimatedIcon ? (
                  <DynamicIcon
                    ref={(instance) => {
                      iconRefs.current[item.key] = instance;
                    }}
                    iconName={item.iconName || ""}
                    title={item.title || "Home"}
                  />
                ) : item.isLogoutIcon ? (
                  <LogoutIcon
                    ref={(instance) => {
                      iconRefs.current[item.key] = instance;
                    }}
                    size={20}
                    className="text-current"
                  />
                ) : (
                  item.icon
                )}
              </span>
              <AnimatePresence initial={false}>
                {shouldShowLabel && (
                  <motion.span
                    variants={labelVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="overflow-hidden whitespace-nowrap capitalize"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
