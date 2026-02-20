"use client";

import { forwardRef, type Ref } from "react";
import type { BotMessageSquareHandle } from "../ui/bot-message-square";
import { BotMessageSquareIcon } from "../ui/bot-message-square";
import type { ConnectIconHandle } from "../ui/connect";
import { ConnectIcon } from "../ui/connect";
import type { FolderCodeIconHandle } from "../ui/folder-code";
import { FolderCodeIcon } from "../ui/folder-code";
import type { HomeIconHandle } from "../ui/home";
import { HomeIcon } from "../ui/home";
import type { WrenchIconHandle } from "../ui/wrench";
import { WrenchIcon } from "../ui/wrench";

export type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

interface DynamicIconProps {
  iconName: string;
  title?: string;
  className?: string;
  size?: number;
}

export const DynamicIcon = forwardRef<AnimatedIconHandle, DynamicIconProps>(
  ({ iconName, title, className = "text-current", size = 20 }, ref) => {
    const normalized = iconName.trim().toLowerCase();
    const normalizedTitle = title?.trim().toLowerCase() ?? "";
    const matches = (...keywords: string[]) =>
      keywords.some(
        (keyword) =>
          normalized.includes(keyword) || normalizedTitle.includes(keyword),
      );

    if (matches("home", "house")) {
      return (
        <HomeIcon
          className={className}
          size={size}
          ref={ref as Ref<HomeIconHandle>}
        />
      );
    }

    if (matches("project", "portfolio", "work", "folder", "code")) {
      return (
        <FolderCodeIcon
          className={className}
          size={size}
          ref={ref as Ref<FolderCodeIconHandle>}
        />
      );
    }

    if (matches("about", "bot", "robot", "ai", "user", "profile")) {
      return (
        <BotMessageSquareIcon
          className={className}
          size={size}
          ref={ref as Ref<BotMessageSquareHandle>}
        />
      );
    }

    if (
      matches("skill", "skills", "tool", "tools", "wrench", "tech", "stack")
    ) {
      return (
        <WrenchIcon
          className={className}
          size={size}
          ref={ref as Ref<WrenchIconHandle>}
        />
      );
    }

    if (
      matches("contact", "connect", "mail", "message", "chat", "link", "phone")
    ) {
      return (
        <ConnectIcon
          className={className}
          size={size}
          ref={ref as Ref<ConnectIconHandle>}
        />
      );
    }

    return (
      <HomeIcon
        className={className}
        size={size}
        ref={ref as Ref<HomeIconHandle>}
      />
    );
  },
);

DynamicIcon.displayName = "DynamicIcon";
