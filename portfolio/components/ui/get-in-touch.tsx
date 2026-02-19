"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";

type ContactInfoProps = {
  email?: string | null;
  phone?: string | null;
};

export const ContactInfoCards = ({
  email,
  phone,
}: ContactInfoProps) => {
  const contactItems = [
    {
      name: "Email",
      value: email,
      icon: <Mail className="w-7 h-7" />,
      gradient: "from-emerald-600 to-teal-400",
      shadowColor: "rgba(16, 185, 129, 0.5)",
      link: email ? `mailto:${email}` : undefined,
    },
    {
      name: "Phone",
      value: phone,
      icon: <Phone className="w-7 h-7" />,
      gradient: "from-sky-600 to-cyan-400",
      shadowColor: "rgba(56, 189, 248, 0.5)",
      link: phone ? `tel:${phone}` : undefined,
    },
  ].filter((item) => item.value);

  if (contactItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 mx-auto">
      {contactItems.map((item) => {
        const content = (
          <div className="relative bg-[#1e222b] backdrop-blur-2xl rounded-lg p-4 border overflow-hidden transition-all duration-500 hover:scale-105 w-full">
            {/* Hover Gradient Effect */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            ></div>
            {/* Glow Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${item.shadowColor}, transparent 70%)`,
                filter: "blur(40px)",
              }}
            ></div>

            {/* Content */}
            <div className="flex flex-row z-10 gap-6 items-center justify-between">
              {/* Icon Container */}
              <div
                className={`inline-flex p-3 rounded-xl bg-linear-to-br ${item.gradient} text-white transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg mb-1 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-gray-400 break-words">
                  {item.value}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        );

        const isExternal =
          typeof item.link === "string" && item.link.startsWith("http");

        return item.link ? (
          <a
            key={item.name}
            href={item.link}
            className="group relative transition-all duration-700 block w-full"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {content}
          </a>
        ) : (
          <div
            key={item.name}
            className="group relative transition-all duration-700 block w-full"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

type SocialLinksProps = {
  socialLinks?: {
    github?: string | null
    linkedin?: string | null
  } | null
}

export const SocialLinks = ({socialLinks}: SocialLinksProps) => {
  const socialPlatforms = [
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <title>LinkedIn</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      gradient: "from-blue-600 to-blue-400",
      shadowColor: "rgba(59, 130, 246, 0.5)",
      link: socialLinks?.linkedin,
      description: "Professional Network",
    },
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <title>GitHub</title>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      gradient: "from-gray-700 to-gray-500",
      shadowColor: "rgba(75, 85, 99, 0.5)",
      link: socialLinks?.github,
      description: "Code Repository",
    },
  ].filter((platform) => platform.link);

  return (
    <div className="flex flex-col gap-6 mx-auto">
      {socialPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.link}
          className="group relative transition-all duration-700 block w-full"
        >
          {/* Card Container */}
          <div className="relative bg-[#1e222b] backdrop-blur-2xl rounded-lg p-4 border overflow-hidden transition-all duration-500 hover:scale-105 w-full">
            {/* Hover Gradient Effect */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            ></div>
            {/* Glow Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${platform.shadowColor}, transparent 70%)`,
                filter: "blur(40px)",
              }}
            ></div>

            {/* Content */}
            <div className="flex flex-row z-10 gap-6 items-center justify-between">
              {/* Icon Container */}
              <div
                className={`inline-flex p-3 rounded-xl bg-linear-to-br ${platform.gradient} text-white transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
              >
                {platform.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1 transition-colors duration-300">
                  {platform.name}
                </h3>
                <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-gray-400">
                  {platform.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </a>
      ))}
    </div>
  );
};
