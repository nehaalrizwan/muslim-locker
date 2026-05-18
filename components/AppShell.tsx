"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsContentVisible(true);
    }, 2100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SmoothScroll />
      <LoadingScreen />
      <Navbar />
      <main className={isContentVisible ? "opacity-100" : "pointer-events-none opacity-0"}>
        {children}
        <Footer />
      </main>
      <CustomCursor />
      <Analytics />
    </>
  );
}
