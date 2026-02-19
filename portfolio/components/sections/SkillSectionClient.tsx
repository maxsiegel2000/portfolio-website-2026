"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPrisma,
} from "react-icons/si";
import type { IconType } from "react-icons";
import * as TbIcons from "react-icons/tb";
import * as TfiIcons from "react-icons/tfi";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import FadeIn from "../animations/FadeIn";
import SectionHeader from "./SectionHeader";
import { RevealGroup, RevealItem } from "../animations/reveal";

interface Skill {
  name: string | null;
  category: string | null;
  proficiency: string | null;
  percentage: number | null;
  yearsOfExperience: number | null;
  color: string | null;
  icon: string | null;
}

interface SkillsChartProps {
  skills: Skill[];
}

export function SkillSectionClient({ skills }: SkillsChartProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  // Group skills by category dynamically
  const groupedSkills = new Map<string, Skill[]>();

  for (const skill of skills) {
    const category = skill.category || "other";
    const existing = groupedSkills.get(category) || [];
    groupedSkills.set(category, [...existing, skill]);
  }

  const renderCategoryCard = (
    category: string,
    categorySkills: Skill[],
    className = "",
    listClassName = ""
  ) => {
    if (!categorySkills || categorySkills.length === 0) return null;

    const displayLabel = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <div
        key={category}
        className={`group relative bg-[#1e222b] border rounded-2xl p-6 flex flex-col ${className} transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_16px_rgba(53,186,231,0.3)]`}
      >
        <div>
          <div className="flex items-center justify-between mb-4 border-b">
            <h3 className="text-lg font-semibold">{displayLabel}</h3>
          </div>
        </div>
        <div className={`space-y-5 ${listClassName}`}>
          {categorySkills.map((skill) => {
            const color = skill.color ?? "#7aecf5";
            const Icon = getSkillIcon(skill.icon);
            return (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative p-2 bg-white/5 rounded-lg overflow-hidden transition-all duration-500">
                      <div className="absolute inset-0 bg-linear-to-br from-[#35bae7]/20 to-[#204fd7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        {Icon ? <Icon className="text-base text-primary" /> : null}
                      </div>
                    </div>
                    <div>
                      <div className="text-md font-medium text-primary transition-all duration-500 ease-in-out">
                        {skill.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        <p>{skill.yearsOfExperience}+ years</p>
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      color,
                      backgroundColor: `${color}33`,
                      borderColor: `${color}4d`,
                    }}
                    className="text-xs px-2 py-1 rounded-full border"
                  >
                    {skill.proficiency}
                  </span>
                </div>
                <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-linear-to-r from-[#35bae7] to-[#204fd7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const frontendSkills = groupedSkills.get("Frontend") ?? [];
  const backendSkills = groupedSkills.get("Backend") ?? [];
  const toolsSkills = groupedSkills.get("Tools") ?? [];
  const aiSkills = groupedSkills.get("Ai-Ml") ?? [];

  const stack = [
    { name: "React.js", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Typecript", icon: SiTypescript },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Prisma", icon: SiPrisma },
  ];

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
      <SectionHeader header="Skills & "animatedHeader="Technologies" pillText="My Expertise" pillIcon="tool" describtion="A comprehensive overview of my technical skills and proficiency levels."/>
      <RevealGroup className="flex flex-col items-center justify-center gap-14">
        {/* Tech Stack */}
        <RevealItem preset="scaleIn">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full mx-auto">
            {stack.map((item) => (
              <div
                key={item.name}
                className="group relative bg-[#1e222b] hover:bg-linear-to-br from-[#35bae7]/20 to-[#204fd7]/20 border hover:border-[#35bae7]/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:drop-shadow-[0_0_16px_rgba(53,186,231,0.3)]"
              >
                <item.icon className="text-3xl text-[#7aecf5]" />
                <p className="text-sm group-hover:text-md text-primary/80 font-medium text-center group-hover:text-primary transition-all duration-300">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </RevealItem>
        {/* Skill Section Grid*/}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-4 items-start md:items-stretch lg:items-start w-full max-w-300 mx-auto">
          <RevealItem preset="slideLeft" distance={100} className="lg:row-span-2 lg:self-stretch lg:min-h-0">
            {renderCategoryCard(
                "Frontend",
                frontendSkills,
              )}
          </RevealItem>
          <RevealItem preset="fadeUp" distance={100} className="lg:row-span-2 lg:self-stretch lg:min-h-0">
            {renderCategoryCard(
                "Backend",
                backendSkills,
              )}
          </RevealItem>
          <RevealItem preset="slideRight" distance={100} className="lg:col-start-3 lg:row-start-1">
            {renderCategoryCard("Tools", toolsSkills)}
          </RevealItem>
          <RevealItem preset="slideRight" distance={100} className="lg:col-start-3 lg:row-start-2">
             {renderCategoryCard("Ai-Ml", aiSkills)}
          </RevealItem>
        </RevealGroup>
      </RevealGroup>
    </>
  );
}
