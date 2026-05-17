"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import clsx from 'clsx';

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const GOLD = '#C9A84C';
const EMERALD = '#014421';

function CrescentMoon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={32}
      height={32}
    >
      <path
        d="M28 16c0 6.627-5.373 12-12 12-2.13 0-4.13-.56-5.85-1.54C17.5 25.5 22 19.5 22 13.5c0-2.13-.56-4.13-1.54-5.85C22.44 9.87 28 13.5 28 16z"
        fill={GOLD}
      />
    </svg>
  );
}

function MagneticLink({ label, href, isActive, onClick }: { label: string; href: string; isActive: boolean; onClick: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setMagnet({ x: x * 0.2, y: y * 0.2 });
  }
  function handleMouseLeave() {
    setMagnet({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className={clsx(
        'relative px-3 py-1 font-medium text-lg cursor-pointer select-none',
        playfair.className,
      )}
      style={{
        display: 'inline-block',
        transform: `translate(${magnet.x}px, ${magnet.y}px)`,
        color: isActive ? EMERALD : 'rgba(1, 68, 33, 0.75)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span>{label}</span>
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute left-0 right-0 -bottom-1 h-[2px] rounded bg-[#C9A84C]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(NAV_LINKS[0].href);
  const [logoHover, setLogoHover] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 8);
  });

  // Scroll progress bar

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-[100]"
        style={{
          width: '100vw',
          background: GOLD,
          scaleX: scrollYProgress,
          transformOrigin: 'left',
        }}
      />
      <motion.nav
        className={clsx(
          'fixed top-0 left-0 w-full z-50 transition-colors duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <motion.span
              animate={{ rotate: logoHover ? 10 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-block"
            >
              <CrescentMoon className="w-8 h-8" />
            </motion.span>
            <span
              className={clsx(
                'text-2xl font-bold tracking-tight',
                playfair.className,
                'text-[#014421]'
              )}
            >
              Muslim Locker
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2 lg:gap-6 items-center">
            <LayoutGroup>
              {NAV_LINKS.map((link) => (
                <MagneticLink
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  isActive={active === link.href}
                  onClick={() => setActive(link.href)}
                />
              ))}
            </LayoutGroup>
          </div>

          {/* Join Waitlist Button */}
          <a
            href="#waitlist"
            className="hidden md:inline-block ml-4 px-6 py-2 rounded-full bg-[#C9A84C] text-white font-semibold shadow transition-transform duration-150 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
            style={{ boxShadow: '0 0 0 0 #C9A84C', animation: 'pulse 2s infinite' }}
          >
            Join Waitlist
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <span className="block w-7 h-0.5 bg-[#014421] rounded" />
            <span className="block w-7 h-0.5 bg-[#014421] rounded" />
            <span className="block w-7 h-0.5 bg-[#014421] rounded" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white/90 backdrop-blur flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-6 right-6 p-2 relative"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <span className="block w-7 h-0.5 bg-[#014421] rotate-45 absolute" style={{ top: 12 }} />
              <span className="block w-7 h-0.5 bg-[#014421] -rotate-45 absolute" style={{ top: 12 }} />
            </button>
            <div className="flex flex-col gap-8 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'text-2xl font-bold text-[#014421] text-center',
                    playfair.className
                  )}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 80, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
                  onClick={() => {
                    setActive(link.href);
                    setMobileOpen(false);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#waitlist"
                className="mt-8 px-8 py-3 rounded-full bg-[#C9A84C] text-white font-semibold shadow text-xl text-center"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 30 }}
                onClick={() => setMobileOpen(false)}
              >
                Join Waitlist
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 #C9A84C; }
          70% { box-shadow: 0 0 0 8px rgba(201, 168, 76, 0); }
          100% { box-shadow: 0 0 0 0 #C9A84C; }
        }
      `}</style>
    </>
  );
}
