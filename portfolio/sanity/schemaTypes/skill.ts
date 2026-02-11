import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "Frontend" },
          { title: "Backend", value: "Backend" },
          { title: "Tools & Others", value: "Tools" },
          { title: "AI/ML", value: "Ai-Ml" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "Beginner" },
          { title: "Intermediate", value: "Intermediate" },
          { title: "Advanced", value: "Advanced" },
          { title: "Expert", value: "Expert" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "percentage",
      title: "Proficiency Percentage",
      type: "number",
      description: "0-100 for visual progress bars",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description:
        "Hex color from light to dark (Beginner to Expert)",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description:
        "Name of the Icon",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      proficiency: "proficiency",
    },
    prepare(selection) {
      const { title, subtitle, proficiency } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${proficiency}`,
      };
    },
  },
  orderings: [
    {
      title: "Category, then Name",
      name: "categoryName",
      by: [
        { field: "category", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});
