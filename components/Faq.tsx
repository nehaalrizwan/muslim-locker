"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Which platforms will Muslim Locker support?",
    a: "Android first (Q3 2025), iOS shortly after."
  },
  {
    q: "How does the app blocking actually work?",
    a: "Uses Android's Accessibility Service to overlay a lock screen until prayer is confirmed."
  },
  {
    q: "What if I'm at work and can't pray immediately?",
    a: "You can set a grace period (15-30 min) before the lock activates."
  },
  {
    q: "Does it track if I actually prayed or just tap to dismiss?",
    a: "The confirmation screen requires you to note the prayer details. We're also exploring GPS-based mosque detection."
  },
  {
    q: "Is my data private?",
    a: "Yes. Prayer data stays on-device. We never sell your data."
  },
  {
    q: "Can I use it for my children?",
    a: "Yes — Family Mode lets parents monitor children's prayer streaks."
  },
  {
    q: "What about during travel or different time zones?",
    a: "Prayer times auto-adjust using your GPS location."
  },
  {
    q: "Is this app religiously endorsed?",
    a: "We've consulted with scholars. The app is a tool for building habit — not a replacement for sincerity."
  }
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-emerald/10 rounded-3xl border border-emerald/10 bg-white shadow-soft">
      {faqs.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.q} className={`${isOpen ? "border-l-4 border-gold bg-[#FEF9EA]" : "border-l-4 border-transparent"}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:px-7"
            >
              <span className="text-base font-semibold text-emerald sm:text-lg">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bone text-xl text-gold"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                  <path d="M5.23 7.21a.75.75 0 011.06-.02L10 10.83l3.71-3.64a.75.75 0 111.04 1.08l-4.2 4.12a.75.75 0 01-1.04 0L5.25 8.27a.75.75 0 01-.02-1.06z" fill="currentColor" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 pr-12 text-sm leading-7 text-ink/[0.68] sm:px-7 sm:text-base">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
