"use client";

import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as TbIcons from "react-icons/tb";
import * as TfiIcons from "react-icons/tfi";
import { RevealGroup, RevealItem } from "../animations/reveal";
import SectionHeader from "./SectionHeader";

export type ProjectCard = {
  title: string;
  slug: string;
  tagline: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  coverImageUrl: string;
  coverImageAlt: string;
  isPortraitCover: boolean;
  technologies: Array<{
    name: string;
    category: string;
    color: string;
    icon: string;
  }>;
};

type ProjectsSectionClientProps = {
  projects: ProjectCard[];
};

function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
  const getSkillIcon = (iconName?: string | null): IconType | null => {
    if (!iconName) return null;
    const icons: Array<Record<string, IconType>> = [
      TbIcons as Record<string, IconType>,
      TfiIcons as Record<string, IconType>,
      AiIcons as Record<string, IconType>,
      BiIcons as Record<string, IconType>,
    ];
    for (const pack of icons) {
      const icon = pack[iconName];
      if (icon) return icon;
    }
    return null;
  };

  return (
    <>
      <SectionHeader
        header="Featured "
        animatedHeader="Projects"
        pillText="Private Projects"
        pillIcon="project"
        describtion="See how i transformed concepts into engaging digital experiences."
      />
      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="@container">
          <RevealGroup
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            delayChildren={0.1}
            staggerChildren={0.2}
          >
            {projects.map((project, index) => (
              <RevealItem
                key={project.slug}
                preset={index % 2 === 0 ? "slideLeft" : "slideRight"}
                distance={100}
                className="overflow-hidden rounded-2xl border bg-[#1e222b] transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_16px_rgba(53,186,231,0.3)]"
              >
                <div
                  className={`relative aspect-video ${
                    project.isPortraitCover ? "bg-[#0f1320]" : ""
                  }`}
                >
                  <Image
                    src={project.coverImageUrl}
                    alt={project.coverImageAlt}
                    fill
                    className={
                      project.isPortraitCover
                        ? "object-contain p-2"
                        : "object-cover"
                    }
                  />
                </div>
                <RevealGroup
                  className="space-y-3 px-5 py-5"
                  delayChildren={0.35}
                  staggerChildren={0.12}
                  once={true}
                  amount={0.2}
                  margin="-80px"
                >
                  <RevealItem preset="fadeIn" duration={0.45}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <p className="text-xs uppercase tracking-wide text-[#7aecf5]">
                        {project.category}
                      </p>
                    </div>
                  </RevealItem>

                  {project.tagline ? (
                    <RevealItem preset="fadeIn" duration={0.45}>
                      <p className="text-sm text-white/70">{project.tagline}</p>
                    </RevealItem>
                  ) : null}

                  <RevealItem preset="fadeIn" duration={0.45}>
                    <div className="flex justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => {
                          const Icon = getSkillIcon(tech.icon);

                          return (
                            <div
                              key={`${project.slug}-${tech.name}`}
                              title={tech.name}
                              className="rounded-full border p-2 hover:bg-linear-to-br from-[#35bae7]/20 to-[#204fd7]/20 hover:border-[#35bae7]/50 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:drop-shadow-[0_0_16px_rgba(53,186,231,0.3)]"
                            >
                              {Icon ? (
                                <Icon className="text-sm" />
                              ) : (
                                <span className="block h-3 w-3 rounded-full bg-[#7aecf5]" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-4 text-sm">
                        {project.liveUrl ? (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-[#7aecf5] transition-all duration-300"
                          >
                            Live
                          </Link>
                        ) : null}
                        {project.githubUrl ? (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-[#7aecf5] transition-all duration-300"
                          >
                            GitHub
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </RevealItem>
                </RevealGroup>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </>
  );
}

export default ProjectsSectionClient;
