"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const modes = [
  {
    id: "intent",
    label: "Intention",
    title: "Start with niyyah, not punishment.",
    copy: "Before each prayer window, Muslim Locker surfaces the prayer, the remaining time, and a single intentional action."
  },
  {
    id: "focus",
    label: "Focus lock",
    title: "Block the scroll loop while Salah is due.",
    copy: "On supported Android builds, distracting apps can be gated until the prayer is marked complete. iOS starts with Focus automation, reminders, and accountability."
  },
  {
    id: "proof",
    label: "Proof",
    title: "Track consistency without turning worship into a scoreboard.",
    copy: "Daily streaks stay private, soft, and contextual: helpful for reflection, never designed for public religious performance."
  }
];

export function ModeExplorer() {
  const [active, setActive] = useState(modes[1]);

  return (
    <div className="rounded-lg border hairline bg-white p-2 shadow-soft">
      <div className="grid grid-cols-3 gap-1 rounded-md bg-bone p-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setActive(mode)}
            className="relative min-h-11 rounded-md px-2 text-sm font-semibold text-emerald outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {active.id === mode.id ? (
              <motion.span
                layoutId="active-mode"
                className="absolute inset-0 rounded-md bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{mode.label}</span>
          </button>
        ))}
      </div>
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-5 sm:p-7"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          {active.label}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-emerald sm:text-3xl">
          {active.title}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-ink/70 sm:text-base">
          {active.copy}
        </p>
      </motion.div>
    </div>
  );
}
