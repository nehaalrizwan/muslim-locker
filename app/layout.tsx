import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://muslimlocker.app"),
  title: "Muslim Locker | Pray before you scroll",
  description:
    "A premium Islamic habit-tracking app designed to help Muslims protect Salah with focus locks, prayer accountability, and calm daily progress.",
  openGraph: {
    title: "Muslim Locker | Pray before you scroll",
    description:
      "Protect your daily Salah with platform-aware focus locks, prayer tracking, and gentle accountability.",
    url: "https://muslimlocker.app",
    siteName: "Muslim Locker",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Locker | Pray before you scroll",
    description:
      "A restrained Islamic focus app for Muslims serious about praying on time."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
