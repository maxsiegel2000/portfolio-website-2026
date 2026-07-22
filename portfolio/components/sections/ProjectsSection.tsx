import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { PROJECTS_QUERY_RESULT } from "@/sanity.types";
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
  "caseStudyPdfUrl": caseStudyPdf.asset->url,
  coverImage,
  "coverImageWidth": coverImage.asset->metadata.dimensions.width,
  "coverImageHeight": coverImage.asset->metadata.dimensions.height,
  technologies[]->{name, category, icon}
}`);

export async function ProjectsSection() {
  const projects = await client.fetch<PROJECTS_QUERY_RESULT>(
    PROJECTS_QUERY,
    {},
    { cache: "no-store" },
  );

  const mappedProjects: ProjectCard[] = (projects ?? [])
    .map((project, index) => {
      const coverImageWidth = project.coverImageWidth ?? 0;
      const coverImageHeight = project.coverImageHeight ?? 0;
      const slugValue = project.slug?.current?.toLowerCase() ?? "";
      const titleValue = project.title?.toLowerCase() ?? "";
      const isDogFlowManager =
        slugValue.includes("dogflow") ||
        slugValue.includes("dog-flow") ||
        titleValue.includes("dogflow") ||
        titleValue.includes("dog flow");
      const isPowerUpProject =
        slugValue.includes("powerup") ||
        slugValue.includes("power-up") ||
        titleValue.includes("power up");
      const isPortraitCover = coverImageHeight > coverImageWidth;
      const shouldContainCover = isPortraitCover || isPowerUpProject;
      const coverImageUrl = project.coverImage
        ? urlFor(project.coverImage).width(1200).auto("format").url()
        : "";
      const caseStudyPdfUrl = project.caseStudyPdfUrl
        ? `${project.caseStudyPdfUrl}?dl=${encodeURIComponent(
            "Max_Siegel_DogFlowManager_Case_Study.pdf",
          )}`
        : "";

      return {
        title: project.title ?? "Untitled Project",
        slug: project.slug?.current ?? `project-${index}`,
        tagline: project.tagline ?? "",
        category: project.category ?? "other",
        liveUrl: project.liveUrl ?? "",
        githubUrl: project.githubUrl ?? "",
        caseStudyUrl: isDogFlowManager ? caseStudyPdfUrl : "",
        coverImageUrl,
        coverImageAlt:
          project.coverImage?.alt ?? project.title ?? "Project cover image",
        isPortraitCover: shouldContainCover,
        technologies: (project.technologies ?? []).map((tech) => ({
          name: tech?.name ?? "Unknown",
          category: tech?.category ?? "other",
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
