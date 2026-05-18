"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const hoverSelector = "a, button, input, textarea, select, [role=button], [data-cursor-hover]";

function isHoverable(element: HTMLElement | null) {
  return !!element?.closest(hoverSelector);
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setEnabled(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setEnabled(event.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (isHoverable(target)) {
        setHovered(true);
      }
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (isHoverable(target)) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ translateX: springX, translateY: springY }}
      animate={{ scale: hovered ? 3.3 : 1, opacity: hovered ? 0.95 : 0.85 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_0_6px_rgba(201,168,76,0.18)]" />
    </motion.div>
  );
}
