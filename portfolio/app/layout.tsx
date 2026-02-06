import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarToggle from "@/components/SidebarToggle";
import Script from "next/script";

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
          <Script
            src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
            strategy="afterInteractive"
          />
          <SidebarProvider>
            <SidebarInset>{children}</SidebarInset>
            <AppSidebar side="right" />
            <SidebarToggle />
          </SidebarProvider>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
