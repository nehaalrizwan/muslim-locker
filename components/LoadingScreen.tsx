"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-white text-emerald"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <motion.svg
              viewBox="0 0 120 120"
              className="h-24 w-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.path
                d="M36 22c-5.8 5.8-9.4 13.8-9.4 22.6 0 17.4 14.1 31.5 31.5 31.5 8.8 0 16.8-3.6 22.6-9.4-12.9 3-26.7-1.1-35.7-10.1C37.1 47.1 33 33.3 36 22z"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </motion.svg>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="space-y-2"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-emerald/50">Loading</p>
              <p className="text-3xl font-semibold text-emerald">Muslim Locker</p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
