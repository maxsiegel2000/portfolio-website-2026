export const SKILL_PROFICIENCY_COLORS = {
  Beginner: "#2DD4BF",
  Intermediate: "#38BDF8",
  Advanced: "#A5B4FC",
  Expert: "#D8B4FE",
} as const;

export const SKILL_PROGRESS_GRADIENT = `linear-gradient(to right,
  ${SKILL_PROFICIENCY_COLORS.Beginner} 0%,
  ${SKILL_PROFICIENCY_COLORS.Intermediate} 33%,
  ${SKILL_PROFICIENCY_COLORS.Advanced} 66%,
  ${SKILL_PROFICIENCY_COLORS.Expert} 100%
)`;

export type SkillProficiency = keyof typeof SKILL_PROFICIENCY_COLORS;

const DEFAULT_SKILL_PROFICIENCY_COLOR = SKILL_PROFICIENCY_COLORS.Beginner;

export function getSkillProficiencyColor(proficiency?: string | null): string {
  if (proficiency && Object.hasOwn(SKILL_PROFICIENCY_COLORS, proficiency)) {
    return SKILL_PROFICIENCY_COLORS[proficiency as SkillProficiency];
  }

  return DEFAULT_SKILL_PROFICIENCY_COLOR;
}
