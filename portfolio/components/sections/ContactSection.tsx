import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

import { ContactSectionClient } from "./ContactSectionClient";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function ContactSection() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="contact" className="min-h-screen w-full relative py-20 px-6">
      <ContactSectionClient profile={profile} />
    </section>
  );
}
