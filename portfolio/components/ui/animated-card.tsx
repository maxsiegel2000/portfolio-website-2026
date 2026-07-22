import type * as React from "react";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative h-62.5 w-full max-w-100 overflow-hidden rounded-xl border shadow-sm md:h-75 md:max-w-125",
        className,
      )}
      style={{ background: "var(--bg-gradient-primary)" }}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn("flex flex-col space-y-1.5 p-4", className)}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg leading-none font-semibold tracking-tight text-primary",
        className,
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-text-secondary", className)} {...props} />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "h-38.75 md:h-50 lg:h-55 w-full overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}
