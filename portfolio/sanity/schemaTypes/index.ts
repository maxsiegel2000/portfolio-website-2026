import type { SchemaTypeDefinition } from "sanity";
import contact from "./contact";
import education from "./education";
import experience from "./experience";
import navigation from "./navigation";
import profile from "./profile";
import project from "./project";
import siteSettings from "./siteSettings";
import skill from "./skill";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    contact,
    skill,

    project,

    experience,
    education,

    siteSettings,
    navigation,
  ],
};
