"use client";

import React from "react";

// Content items for the marquee
const items = [
  "⭐⭐⭐⭐⭐ Finally praying Fajr consistently — Ahmed R.",
  "2,400+ Muslims on the waitlist",
  "⭐⭐⭐⭐⭐ This app changed my relationship with salah — Fatima K.",
  "Featured in Muslim lifestyle blogs"
];

/**
 * Horizontal ticker that loops infinitely.
 * Uses pure CSS animation – no JavaScript needed for the scrolling.
 * On hover the animation pauses.
 */
export const Ticker: React.FC = () => {
  // Duplicate the items array to create a seamless loop
  const loopItems = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden bg-[#F0F7F4] h-12 flex items-center"
      style={{
        // Fade edges with a mask gradient
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
      }}
    >
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animation: "marquee 20s linear infinite",
          animationPlayState: "running"
        }}
        // Pause on hover
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {loopItems.map((text, idx) => (
          <span key={idx} className="mx-6 flex items-center text-sm text-emerald">
            <span>{text}</span>
            {/* Small gold crescent separator */}
            <span className="mx-2 text-gold">🌙</span>
          </span>
        ))}
      </div>
      {/* Inline keyframes for the marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
