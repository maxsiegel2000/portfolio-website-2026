import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

const writeToken =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN;

if (!writeToken) {
  throw new Error("Missing environment variable: SANITY_API_WRITE_TOKEN");
}

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});
