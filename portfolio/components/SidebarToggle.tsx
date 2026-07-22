"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { MessageSquare, Sparkles } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

function SidebarToggle() {
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
  const { isSignedIn } = useUser();

  const isSidebarOpen = isMobile ? openMobile : open;

  if (isSidebarOpen) return null;

  const buttonStyles = `relative w-16 h-16 rounded-full
		bg-linear-to-br from-[#35bae7] to-[#204fd7]
		shadow-[0_0_40px_rgba(32,79,215,0.4)] 
    	hover:shadow-[0_0_60px_rgba(53,186,231,0.6)] 
		transition-all duration-500
		hover:scale-110 hover:rotate-12
		flex items-center justify-center`;

  return (
    <div className="group fixed top-[calc(env(safe-area-inset-top)+1.5rem)] right-6 z-50 md:top-auto md:bottom-6">
      {/* Animated rings */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#7aecf5] to-[#35bae7] opacity-20 blur-2xl animate-ping animation-duration-[2s]" />
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#35bae7] to-[#204fd7] opacity-30 blur-xl animate-pulse animation-duration-[3s]" />
      {/* Sparkle badge */}
      <div className="absolute -top-1 -right-1 z-10">
        <div className="h-6 w-6 rounded-full bg-linear-to-br from-amber-400 to-orange-500 shadow-lg flex items-center justify-center animate-bounce animation-duration-[2s]">
          <Sparkles className="h-3 w-3 text-primary" />
        </div>
      </div>
      {/* Tooltip */}
      <div className="pointer-events-none absolute right-0 bottom-full mb-2 hidden scale-90 rounded-lg border bg-background px-3 py-1.5 text-sm font-medium whitespace-nowrap text-primary opacity-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-100 group-hover:opacity-100 md:block">
        Chat with My AI Twin
        {/* Tooltip arrow */}
        <div className="absolute -bottom-1 right-6 w-2 h-2 rotate-45 bg-background border-r border-b" />
      </div>
      {isSignedIn ? (
        <button
          type="button"
          onClick={toggleSidebar}
          className={buttonStyles}
          aria-label="Chat with AI Twin"
        >
          <MessageSquare className="h-7 w-7 text-primary transition-transform group-hover:scale-110 cursor-pointer" />
        </button>
      ) : (
        <SignInButton mode="modal">
          <button
            type="button"
            className={buttonStyles}
            aria-label="Sign in to chat with AI Twin"
          >
            <MessageSquare className="h-7 w-7 text-primary transition-transform group-hover:scale-11 cursor-pointer" />
          </button>
        </SignInButton>
      )}
    </div>
  );
}

export default SidebarToggle;
