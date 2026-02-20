import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import ProjectsSectionClient, {
  type ProjectCard,
} from "./ProjectsSectionClient";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  "coverImageWidth": coverImage.asset->metadata.dimensions.width,
  "coverImageHeight": coverImage.asset->metadata.dimensions.height,
  technologies[]->{name, category, color, icon}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  const mappedProjects: ProjectCard[] = (projects ?? [])
    .map((project, index) => {
      const coverImageWidth = project.coverImageWidth ?? 0;
      const coverImageHeight = project.coverImageHeight ?? 0;
      const slugValue = project.slug?.current?.toLowerCase() ?? "";
      const titleValue = project.title?.toLowerCase() ?? "";
      const isPowerUpProject =
        slugValue.includes("powerup") ||
        slugValue.includes("power-up") ||
        titleValue.includes("power up");
      const isPortraitCover = coverImageHeight > coverImageWidth;
      const shouldContainCover = isPortraitCover || isPowerUpProject;
      const coverImageUrl = project.coverImage
        ? urlFor(project.coverImage).width(1200).auto("format").url()
        : "";

      return {
        title: project.title ?? "Untitled Project",
        slug: project.slug?.current ?? `project-${index}`,
        tagline: project.tagline ?? "",
        category: project.category ?? "other",
        liveUrl: project.liveUrl ?? "",
        githubUrl: project.githubUrl ?? "",
        coverImageUrl,
        coverImageAlt:
          project.coverImage?.alt ?? project.title ?? "Project cover image",
        isPortraitCover: shouldContainCover,
        technologies: (project.technologies ?? []).map((tech) => ({
          name: tech?.name ?? "Unknown",
          category: tech?.category ?? "other",
          color: tech?.color ?? "#7aecf5",
          icon: tech?.icon ?? "",
        })),
      };
    })
    .filter((project) => Boolean(project.coverImageUrl));

  if (mappedProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="px-6 py-20">
      <ProjectsSectionClient projects={mappedProjects} />
    </section>
  );
}
