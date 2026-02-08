"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPrisma,
} from "react-icons/si";

interface Skill {
  name: string | null;
  category: string | null;
  proficiency: string | null;
  percentage: number | null;
  yearsOfExperience: number | null;
  color: string | null;
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

  const stack = [
    { name: "React.js", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Typecript", icon: SiTypescript },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Prisma", icon: SiPrisma },
  ];

  return (
    <div className="flex justify-center">
      {/* Tech Stack */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl">
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
    </div>
  );
}
