"use client";

import { useUser } from "@clerk/nextjs";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { LoaderCircle, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import { createSession } from "@/actions/create-session";
import type { CHAT_PROFILE_QUERY_RESULT } from "@/sanity.types";
import { useSidebar } from "../ui/sidebar";

function Chat({ profile }: { profile: CHAT_PROFILE_QUERY_RESULT | null }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <AuthenticatedChat profile={profile} />;
}

function AuthenticatedChat({
  profile,
}: {
  profile: CHAT_PROFILE_QUERY_RESULT | null;
}) {
  const { toggleSidebar } = useSidebar();
  const [chatError, setChatError] = useState<string | null>(null);
  const [isChatReady, setIsChatReady] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // Generate greeting based on available profile data
  const getGreeting = () => {
    if (!profile?.firstName) {
      return "Hi there! Ask me anything about my work, experience, or projects.";
    }

    // The .filter(Boolean) removes all falsy values from the array, so if the firstName or lastName is not set, it will be removed
    const fullName = [profile.firstName, profile.lastName]
      .filter(Boolean)
      .join(" ");

    return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
  };

  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        try {
          return await createSession();
        } catch (error) {
          setChatError(
            error instanceof Error
              ? error.message
              : "The chat service is currently unavailable.",
          );
          throw error;
        }
      },
    },
    onReady: () => {
      setChatError(null);
      setIsChatReady(true);
    },
    onError: ({ error }) => {
      setChatError(
        error.message || "The chat service is currently unavailable.",
      );
      setIsChatReady(false);
    },
    theme: {
      colorScheme: "dark",
      color: {
        accent: {
          primary: "#35BAE7",
          level: 1,
        },
        surface: {
          background: "#13161D",
          foreground: "#1E222B",
        },
      },
    },
    header: {
      title: {
        text: `Chat with ${profile?.firstName || "Me"} `,
      },
      leftAction: {
        icon: "close",
        onClick: () => {
          toggleSidebar();
        },
      },
    },
    startScreen: {
      greeting: getGreeting(),
      prompts: [
        {
          icon: "suitcase",
          label: "What's your experience?",
          prompt:
            "Tell me about your professional experience and previous roles",
        },
        {
          icon: "square-code",
          label: "What skills do you have?",
          prompt:
            "What technologies and programming languages do you specialize in?",
        },
        {
          icon: "cube",
          label: "What have you built?",
          prompt: "Show me some of your most interesting projects",
        },
        {
          icon: "profile",
          label: "Who are you?",
          prompt: "Tell me more about yourself and your background",
        },
      ],
    },

    disclaimer: {
      text: "Disclaimer: This is my AI-powered twin. It may not be 100% accurate and should be verified for accuracy.",
    },
  });

  const retryChat = () => {
    setChatError(null);
    setIsChatReady(false);
    setAttempt((currentAttempt) => currentAttempt + 1);
  };

  return (
    <div className="relative h-full w-full bg-[#13161d]">
      <ChatKit key={attempt} control={control} className="h-full w-full z-50" />

      {!isChatReady && (
        <div className="absolute inset-0 z-60 flex flex-col bg-[#13161d] text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h2 className="text-base font-semibold">
              Chat with {profile?.firstName || "Me"}
            </h2>
            <button
              type="button"
              onClick={toggleSidebar}
              className="flex size-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            {chatError ? (
              <>
                <div className="flex size-12 items-center justify-center rounded-full bg-white/5">
                  <RefreshCw className="size-5 text-[#35bae7]" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Chat temporarily unavailable</p>
                  <p className="max-w-xs text-sm leading-6 text-white/55">
                    My AI twin could not connect right now. You can close this
                    panel or try again in a moment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={retryChat}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  Try again
                </button>
              </>
            ) : (
              <>
                <LoaderCircle className="size-6 animate-spin text-[#35bae7]" />
                <p className="text-sm text-white/55">Starting chat…</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
