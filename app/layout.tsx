import type { Metadata } from "next";
import { Amiri, Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { AppShell } from "@/components/AppShell";
import InteractiveQuran from '@/components/InteractiveQuran';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap"
});

const amiri = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muslimlocker.app"),
  title: "Muslim Locker — Pray First. Then Scroll.",
  description:
    "The app that locks your phone until you complete your Salah. Build the habit. Strengthen the deen.",
  openGraph: {
    title: "Muslim Locker — Pray First. Then Scroll.",
    description:
      "The app that locks your phone until you complete your Salah. Build the habit. Strengthen the deen.",
    url: "https://muslimlocker.app",
    siteName: "Muslim Locker",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Muslim Locker — Pray First. Then Scroll."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Locker — Pray First. Then Scroll.",
    description:
      "The app that locks your phone until you complete your Salah. Build the habit. Strengthen the deen.",
    images: ["/og-image.svg"]
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${amiri.variable} scroll-smooth`}>
      <body>
        <AppShell>{children}</AppShell>
        <InteractiveQuran />
      </body>
    </html>
  );
}
