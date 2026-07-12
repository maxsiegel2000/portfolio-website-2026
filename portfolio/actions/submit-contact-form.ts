"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { serverClient } from "@/sanity/lib/serverClient";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getText = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function submitContactForm(formData: FormData) {
  try {
    const name = getText(formData, "name");
    const email = getText(formData, "email");
    const subject = getText(formData, "subject");
    const message = getText(formData, "message");
    const website = getText(formData, "website");

    // Silently accept bot submissions that fill the hidden honeypot field.
    if (website) {
      return { success: true };
    }

    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    const clientAddress = forwardedFor?.split(",")[0]?.trim() || "unknown";
    const rateLimit = checkRateLimit(
      `contact:${clientAddress}`,
      5,
      15 * 60 * 1000,
    );

    if (!rateLimit.allowed) {
      return {
        success: false,
        error: `Too many messages. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
      };
    }

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    if (!EMAIL_PATTERN.test(email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 5000
    ) {
      return { success: false, error: "One or more fields are too long" };
    }

    await serverClient.create({
      _type: "contact",
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Failed to submit the form. Please try again later.",
    };
  }
}
