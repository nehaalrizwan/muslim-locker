"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Can an app really lock my entire phone?",
    a: "Not universally. Android allows stronger app-blocking paths with the right permissions. iOS is more restricted, so the beta will use Focus mode, Shortcuts, reminders, and accountability instead of claiming a full system lock."
  },
  {
    q: "How do you avoid making prayer feel gamified?",
    a: "The product should reward consistency without public leaderboards, competitive worship metrics, or shame loops. Private reflection beats performative streaks."
  },
  {
    q: "Will the app know whether I actually prayed?",
    a: "No app can verify worship itself. Muslim Locker can verify intentional check-ins, timing, and optional accountability signals. The landing page should not pretend otherwise."
  },
  {
    q: "What happens when I am traveling or unable to pray immediately?",
    a: "The product needs exemptions for travel, illness, menstruation, work constraints, and valid prayer combining. Without those, the lock becomes brittle and users will churn."
  }
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-emerald/10 rounded-lg border hairline bg-white">
      {faqs.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:px-7"
            >
              <span className="text-base font-semibold text-emerald sm:text-lg">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bone text-xl text-gold"
              >
                +
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
                  <p className="px-5 pb-6 text-sm leading-7 text-ink/[0.68] sm:px-7 sm:text-base">
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
