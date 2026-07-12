// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import type { ClientReturn } from "@sanity/client";
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const live = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});

type LiveFetchOptions = Parameters<typeof live.sanityFetch>[0];
type LiveFetchResult = Awaited<ReturnType<typeof live.sanityFetch>>;

export const SanityLive = live.SanityLive;

export async function sanityFetch<const QueryString extends string>(
  options: Omit<LiveFetchOptions, "query"> & { query: QueryString },
): Promise<
  Omit<LiveFetchResult, "data"> & {
    data: ClientReturn<QueryString, unknown>;
  }
> {
  return live.sanityFetch(options) as Promise<
    Omit<LiveFetchResult, "data"> & {
      data: ClientReturn<QueryString, unknown>;
    }
  >;
}
