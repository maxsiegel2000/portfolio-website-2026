"use client";

import { submitContactForm } from "@/actions/submit-contact-form";
import { useState, useTransition } from "react";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        // Reset the form
        (e.target as HTMLFormElement).reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <div className="@container/form bg-[#1e222b] border rounded-lg p-4 @md/form:p-6 h-full">
      <form className="space-y-8 @md/form:space-y-5" onSubmit={handleSubmit}>
        <FieldSet className="gap-4 @md/form:gap-5">
          <FieldLegend className="text-xl @md/form:text-2xl">
            Send a Message
          </FieldLegend>

          {status.type && (
            <div
              className={`p-3 rounded-lg text-sm ${
                status.type === "success"
                  ? "bg-green-900/30 text-green-300"
                  : "bg-red-900/30 text-red-300"
              }`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </div>
          )}

          <FieldGroup className="gap-4 @md/form:gap-5">
            <Field data-disabled={isPending ? true : undefined}>
              <FieldLabel
                htmlFor="name"
                className="text-xs @md/form:text-sm font-medium"
              >
                Name
              </FieldLabel>
              <FieldContent>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="h-auto px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg bg-background text-sm @md/form:text-base"
                  placeholder="Your name"
                  required
                  disabled={isPending}
                />
              </FieldContent>
            </Field>

            <Field data-disabled={isPending ? true : undefined}>
              <FieldLabel
                htmlFor="email"
                className="text-xs @md/form:text-sm font-medium"
              >
                Email
              </FieldLabel>
              <FieldContent>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="h-auto px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg bg-background text-sm @md/form:text-base"
                  placeholder="your.email@example.com"
                  required
                  disabled={isPending}
                />
              </FieldContent>
            </Field>

            <Field data-disabled={isPending ? true : undefined}>
              <FieldLabel
                htmlFor="subject"
                className="text-xs @md/form:text-sm font-medium"
              >
                Subject
              </FieldLabel>
              <FieldContent>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  className="h-auto px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg bg-background text-sm @md/form:text-base"
                  placeholder="What's this about?"
                  required
                  disabled={isPending}
                />
              </FieldContent>
            </Field>

            <Field data-disabled={isPending ? true : undefined}>
              <FieldLabel
                htmlFor="message"
                className="text-xs @md/form:text-sm font-medium"
              >
                Message
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="px-3 py-1.5 @md/form:px-4 @md/form:py-2 rounded-lg bg-background resize-none text-sm @md/form:text-base"
                  placeholder="Tell me about your project..."
                  required
                  disabled={isPending}
                />
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 @md/form:px-6 @md/form:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm @md/form:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
