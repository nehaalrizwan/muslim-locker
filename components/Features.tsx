"use client";

import React from "react";
import { motion } from "framer-motion";

// Simple gold‑circle icon wrapper – replace SVGs with actual icons later
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white">
    {children}
  </div>
);

// Card definition type
type Card = {
  title: string;
  description: string;
  span?: number; // column span for large cards (2)
  icon: React.ReactNode;
  hoverAnimClass: string; // class that triggers micro‑animation on hover
};

// Define all cards
const cards: Card[] = [
  {
    title: "Smart App Blocking",
    description: "Automatically lock distracting apps during prayer windows.",
    span: 2,
    icon: (
      // placeholder phone icon
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16h10M7 12h10M7 8h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    hoverAnimClass: "animate-lock"
  },
  {
    title: "Prayer Time Detection",
    description: "Detects local prayer times and activates the lock.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
      </svg>
    ),
    hoverAnimClass: "animate-clock"
  },
  {
    title: "Streak Tracking",
    description: "Visualize your prayer streaks and stay motivated.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    ),
    hoverAnimClass: "animate-flame"
  },
  {
    title: "Quranic Reminders",
    description: "Gentle reminders with verses to keep focus.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6" />
        <rect width="18" height="12" x="3" y="6" rx="2" ry="2" stroke="currentColor" strokeWidth={2} fill="none" />
      </svg>
    ),
    hoverAnimClass: "animate-pages"
  },
  {
    title: "Progress Analytics",
    description: "Charts showing your prayer consistency over time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
    ),
    hoverAnimClass: "animate-bars"
  },
  {
    title: "Family Accountability",
    description: "Invite family members to share and encourage each other.",
    span: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87" />
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={2} fill="none" />
      </svg>
    ),
    hoverAnimClass: "animate-family"
  }
];

// Base card component with hover effects and scroll‑in animation
const FeatureCard: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <motion.div
      className={`bg-white border border-[#E5E5E5] rounded-[16px] p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-gold ${card.hoverAnimClass}`}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <IconWrapper>{card.icon}</IconWrapper>
      <h3 className="text-lg font-semibold text-emerald">{card.title}</h3>
      <p className="text-sm text-ink/70 leading-snug">{card.description}</p>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="container-px mx-auto max-w-7xl py-16">
      <h2 className="mb-8 text-3xl font-bold text-emerald text-center">
        Everything you need to guard your Salah
      </h2>
      <motion.div
        className="grid gap-6 md:grid-cols-4"
        // Stagger children when the whole grid comes into view
        whileInView="show"
        initial="hidden"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } }
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className={card.span ? `md:col-span-${card.span}` : undefined}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <FeatureCard card={card} />
          </motion.div>
        ))}
      </motion.div>
      {/* Inline CSS for micro‑animations */}
      <style jsx>{`
        @keyframes lock { 0% { transform: rotate(0deg); } 50% { transform: rotate(15deg); } 100% { transform: rotate(0deg); } }
        .animate-lock:hover { animation: lock 0.6s ease-in-out; }
        @keyframes clock { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-clock:hover { animation: clock 1.5s linear infinite; }
        @keyframes flame { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .animate-flame:hover { animation: flame 1s ease-in-out infinite; }
        @keyframes pages { 0% { transform: translateY(0); } 50% { transform: translateY(-4px); } 100% { transform: translateY(0); } }
        .animate-pages:hover { animation: pages 1s ease-in-out infinite; }
        @keyframes bars { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }
        .animate-bars:hover { animation: bars 0.8s ease-out forwards; }
        @keyframes family { 0% { opacity: 0.6; } 100% { opacity: 1; } }
        .animate-family:hover { animation: family 0.8s ease-in-out forwards; }
      `}</style>
    </section>
  );
};
