import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import HeroSectionClient from "./HeroSectionClient";

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
		firstName,
		lastName,
		headline,
		colorHeadline,
		headlineStaticText,
		headlineAnimatedWords,
		headlineAnimationDuration,
		shortBio,
		email,
		phone,
		location,
		availability,
		socialLinks,
		yearsOfExperience,
		profileImage
	}`);

async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });

  if (!profile) {
    return null;
  }

  return <HeroSectionClient profile={profile} />;
}

export default HeroSection;
