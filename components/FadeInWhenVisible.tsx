"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function FadeInWhenVisible({
  children,
  className = "",
  threshold = 0.2
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold, margin: "-80px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
