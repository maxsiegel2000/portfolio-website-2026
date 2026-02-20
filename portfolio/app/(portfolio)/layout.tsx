import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { AppSidebar } from "@/components/app-sidebar";
import { FloatingDock } from "@/components/dock/FloatingDock";
import SidebarToggle from "@/components/SidebarToggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Max Siegel Portfolio",
  description: "My personal Portfolio Website to show my Skills and Work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth! scrollbar-hide">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <ActiveSectionContextProvider>
            <Script
              src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
              strategy="afterInteractive"
            />
            <SidebarProvider defaultOpen={false}>
              <SidebarInset>{children}</SidebarInset>
              <AppSidebar side="right" />
              <FloatingDock />
              <SidebarToggle />
            </SidebarProvider>
            <SanityLive />
          </ActiveSectionContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
