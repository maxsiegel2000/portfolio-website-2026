"use client";

import { RevealGroup, RevealItem } from "../animations/reveal";
import { ContactInfoCards, SocialLinks } from "../ui/get-in-touch";
import { ContactForm } from "./ContactForm";
import SectionHeader from "./SectionHeader";

type ContacProfile = {
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  socialLinks?: {
    github?: string;
    linkedin?: string;
  } | null;
};

type ContactSectionClientProps = {
  profile: ContacProfile;
};

export function ContactSectionClient({ profile }: ContactSectionClientProps) {
  return (
    <div className="@container">
      {/* Dark Horizon Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 mask-top-fade"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #0a0d12 40%, #0d1a36 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          header="Get in "
          animatedHeader="Touch"
          pillText="Let's Connect"
          pillIcon="connect"
          describtion="Wherever you are in the world, let&apos;s work together!"
        />
        {/* Section Content */}
        <RevealGroup className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 items-start @3xl:items-stretch mx-auto max-w-4xl">
          <RevealGroup className="flex flex-col gap-8">
            <RevealGroup>
              <RevealItem preset="fadeIn">
                <h3 className="text-xl @md/info:text-2xl font-semibold mb-6 text-white">
                  Contact Information
                </h3>
              </RevealItem>
              <RevealItem preset="slideLeft" distance={100}>
                <ContactInfoCards email={profile.email} phone={profile.phone} />
              </RevealItem>
            </RevealGroup>
            <RevealGroup>
              <RevealItem preset="fadeIn">
                <h3 className="text-xl @md/info:text-2xl font-semibold mb-6 text-white">
                  Follow Me
                </h3>
              </RevealItem>
              <RevealItem preset="slideLeft" distance={100}>
                <SocialLinks socialLinks={profile.socialLinks} />
              </RevealItem>
            </RevealGroup>
          </RevealGroup>
          <RevealItem
            preset="slideRight"
            distance={100}
            className="@3xl:h-full"
          >
            {/* Contact Form */}
            <ContactForm />
          </RevealItem>
        </RevealGroup>
      </div>
    </div>
  );
}
