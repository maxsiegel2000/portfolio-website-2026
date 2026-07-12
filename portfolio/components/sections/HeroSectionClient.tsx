"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Profile } from "@/sanity.types";
import { RevealGroup, RevealItem } from "../animations/reveal";
import GradientText from "../GradientText";
import { ProfileImage } from "../ProfileImage";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import { CopyIcon, type CopyIconHandle } from "../ui/copy";
import { GithubIcon, type GithubIconHandle } from "../ui/github";
import { LayoutTextFlip } from "../ui/layout-text-flip";
import { LinkedinIcon, type LinkedinIconHandle } from "../ui/linkedin";
import { MailCheckIcon, type MailCheckIconHandle } from "../ui/mail-check";
import { MapPinIcon, type MapPinIconHandle } from "../ui/map-pin";
import { Spotlight } from "../ui/spotlight-new";

type HeroProfile = {
  firstName?: string | null;
  lastName?: string | null;
  colorHeadline?: string | null;
  headline?: string | null;
  headlineStaticText?: string | null;
  headlineAnimatedWords?: string[] | null;
  headlineAnimationDuration?: number | null;
  shortBio?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  availability?: string | null;
  socialLinks?: {
    github?: string | null;
    linkedin?: string | null;
    website?: string | null;
  } | null;
  yearsOfExperience?: number | null;
  profileImage?: Profile["profileImage"] | null;
};

type HeroSectionClientProps = {
  profile: HeroProfile;
};

function HeroSectionClient({ profile }: HeroSectionClientProps) {
  const hasProfileImage = Boolean(profile.profileImage);
  const githubIconRef = useRef<GithubIconHandle>(null);
  const linkedInIconRef = useRef<LinkedinIconHandle>(null);
  const mailCheckIconRef = useRef<MailCheckIconHandle>(null);
  const copyIconRef = useRef<CopyIconHandle>(null);
  const mapPinIconRef = useRef<MapPinIconHandle>(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [showEmailCopiedTooltip, setShowEmailCopiedTooltip] = useState(false);
  const emailCopyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (emailCopyTimeoutRef.current) {
        clearTimeout(emailCopyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Background Spotlight and Ripple Effect */}
      <Spotlight />
      <BackgroundRippleEffect />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-8xl">
        <div className="@container">
          <RevealGroup
            className={`grid grid-cols-1 gap-8 items-center @lg:gap-12 ${
              hasProfileImage ? "@3xl:grid-cols-2" : ""
            }`}
            delayChildren={0.2}
            staggerChildren={0.5}
          >
            {/* Text Content */}
            <RevealGroup
              className="@container/hero space-y-4 @md/hero:space-y-6"
              delayChildren={0.25}
              staggerChildren={0.2}
            >
              <RevealItem preset="fadeUp" distance={50} duration={0.5}>
                <h1 className="text-4xl @md/hero:text-5xl @lg/hero:text-7xl font-bold tracking-tight">
                  <GradientText
                    animationSpeed={3}
                    className="inline-flex! items-baseline! font-bold! bg-bg-gradient-primary"
                  >
                    {profile.colorHeadline}
                  </GradientText>{" "}
                  {profile.headline}
                </h1>
              </RevealItem>
              <RevealItem preset="fadeUp" distance={45} duration={0.45}>
                <div className="flex flex-col items-start gap-2 @lg/hero:flex-row @lg/hero:items-center">
                  <p className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-text-secondary font-medium">
                    {profile.headlineStaticText}
                  </p>
                  {profile.headlineAnimatedWords &&
                  profile.headlineAnimationDuration &&
                  profile.headlineAnimationDuration > 0 ? (
                    <LayoutTextFlip
                      text={""}
                      words={profile.headlineAnimatedWords}
                      duration={profile.headlineAnimationDuration}
                      className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-primary font-medium"
                    />
                  ) : (
                    <p className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted font-medium">
                      {profile.headline}
                    </p>
                  )}
                </div>
              </RevealItem>
              {/* Social Links */}
              <RevealItem preset="fadeUp" distance={40} duration={0.45}>
                {profile.socialLinks ? (
                  <div className="flex flex-wrap gap-3 @md/hero:gap-4 pt-4">
                    {profile.socialLinks.github && (
                      <Link
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 items-center px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border bg-background hover:bg-accent transition-colors text-sm @md/hero:text-base"
                        onMouseEnter={() =>
                          githubIconRef.current?.startAnimation()
                        }
                        onMouseLeave={() =>
                          githubIconRef.current?.stopAnimation()
                        }
                      >
                        GitHub
                        <GithubIcon ref={githubIconRef} size={20} />
                      </Link>
                    )}
                    {profile.socialLinks.linkedin && (
                      <Link
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 items-center px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border bg-background hover:bg-accent transition-colors text-sm @md/hero:text-base"
                        onMouseEnter={() =>
                          linkedInIconRef.current?.startAnimation()
                        }
                        onMouseLeave={() =>
                          linkedInIconRef.current?.stopAnimation()
                        }
                      >
                        Linkedin
                        <LinkedinIcon ref={linkedInIconRef} size={18} />
                      </Link>
                    )}
                  </div>
                ) : null}
              </RevealItem>
              <RevealItem preset="fadeUp" distance={35} duration={0.45}>
                <div className="flex flex-wrap gap-4 @md/hero:gap-6 pt-4 text-xs @md/hero:text-sm text-muted-foreground">
                  {profile.email && (
                    <button
                      type="button"
                      className="relative flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors"
                      title="Copy email"
                      onMouseEnter={() => {
                        if (isEmailCopied) {
                          copyIconRef.current?.startAnimation();
                        } else {
                          mailCheckIconRef.current?.startAnimation();
                        }
                      }}
                      onMouseLeave={() => {
                        if (isEmailCopied) {
                          copyIconRef.current?.stopAnimation();
                        } else {
                          mailCheckIconRef.current?.stopAnimation();
                        }
                      }}
                      onClick={() => {
                        if (!profile.email) {
                          return;
                        }
                        navigator.clipboard?.writeText(profile.email);
                        setIsEmailCopied(true);
                        copyIconRef.current?.startAnimation();
                        setShowEmailCopiedTooltip(true);
                        if (emailCopyTimeoutRef.current) {
                          clearTimeout(emailCopyTimeoutRef.current);
                        }
                        emailCopyTimeoutRef.current = setTimeout(() => {
                          setShowEmailCopiedTooltip(false);
                        }, 1400);
                      }}
                    >
                      <span className="relative size-5 pointer-events-none">
                        <span
                          className={`pointer-events-none absolute inset-0 transition-all duration-200 ease-in-out ${
                            isEmailCopied
                              ? "opacity-0 scale-90"
                              : "opacity-100 scale-100"
                          }`}
                        >
                          <MailCheckIcon
                            ref={mailCheckIconRef}
                            size={20}
                            className="pointer-events-none"
                          />
                        </span>
                        <span
                          className={`pointer-events-none absolute inset-0 transition-all duration-200 ease-in-out ${
                            isEmailCopied
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-90"
                          }`}
                        >
                          <CopyIcon
                            ref={copyIconRef}
                            size={20}
                            className="pointer-events-none"
                          />
                        </span>
                      </span>
                      <span className="truncate pointer-events-none">
                        {profile.email}
                      </span>
                      <span
                        className={`pointer-events-none absolute -top-6 left-0 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-foreground shadow-sm transition-all ${
                          showEmailCopiedTooltip
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-1"
                        }`}
                      >
                        Copied!
                      </span>
                    </button>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <MapPinIcon ref={mapPinIconRef} size={20} />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.availability && (
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500 size-2.5 rounded-full relative">
                        <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
                      </div>
                      <span>{profile.availability}</span>
                    </div>
                  )}
                </div>
              </RevealItem>
            </RevealGroup>
            {profile.profileImage && (
              <RevealItem preset="scaleIn" duration={0.6}>
                <ProfileImage
                  imageUrl={urlFor(profile.profileImage).url()}
                  firstName={profile.firstName || ""}
                  lastName={profile.lastName || ""}
                />
              </RevealItem>
            )}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionClient;
