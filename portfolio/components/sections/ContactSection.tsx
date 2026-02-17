import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ContactForm } from "./ContactForm";
import { ContactSectionClient } from "./ContactSectionClient";
import { ContactInfoCards, SocialLinks } from "../ui/get-in-touch";

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
    <section id="contact">
      <div className="min-h-screen w-full relative py-20 px-6">
        {/* Dark Horizon Glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0 mask-top-fade"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #0a0d12 40%, #0d1a36 100%)",
          }}
        />
        <div className="relative z-10 container mx-auto max-w-4xl">
          <ContactSectionClient />
          <div className="@container">
            <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 items-start">
              {/* Contact Info */}
              <div className="@container/info space-y-6 z-10">
                <h3 className="text-xl @md/info:text-2xl font-semibold mb-6">
                  Contact Information
                </h3>
                <ContactInfoCards
                  email={profile.email}
                  phone={profile.phone}
                  //location={profile.location}
                />

                <h3 className="text-xl @md/info:text-2xl font-semibold mb-6">
                  Follow Me
                </h3>
                <SocialLinks />
              </div>
              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
