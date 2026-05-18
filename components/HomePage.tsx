"use client";

import { motion, useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Faq } from "@/components/Faq";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { ModeExplorer } from "@/components/ModeExplorer";
import { SectionReveal } from "@/components/SectionReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Ticker } from "@/components/Ticker";
import { Features } from "@/components/Features";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

const HowItWorksSection = dynamic(
  () => import("@/components/HowItWorksSection").then((mod) => mod.HowItWorksSection),
  { ssr: false }
);

const pillars = [
  {
    title: "Prayer-first gating",
    copy: "Convert the moment you reach for your phone into a Salah checkpoint instead of another unconscious scroll."
  },
  {
    title: "Private habit memory",
    copy: "Track daily prayers with context, missed-prayer reflection, and no public pressure mechanics."
  },
  {
    title: "Platform-aware controls",
    copy: "Android can support stronger app locks; iOS needs Focus, Shortcuts, and accountability patterns."
  }
];

const steps = [
  ["1", "Prayer window opens", "Muslim Locker detects the current Salah window from your selected calculation method."],
  ["2", "Distractions pause", "The lock layer gates selected apps while keeping emergency access and valid exemptions available."],
  ["3", "You confirm intentionally", "Mark the prayer complete, note a reason for delay, or switch to travel/exception mode."],
  ["4", "Your day stays visible", "A calm timeline shows what happened without turning worship into social performance."]
];

const platformRows = [
  ["Android", "App blocking, accessibility-assisted gates, reminders", "Best first beta target"],
  ["iOS", "Focus filters, Shortcuts, notifications, accountability", "No false promise of total lock"],
  ["Web", "Waitlist, content, account dashboard later", "Useful after mobile validation"]
];

const trustItems = [
  {
    title: "Privacy by default",
    copy: "Prayer history should be encrypted and private. Community features come later, only if they do not distort intention."
  },
  {
    title: "Valid exceptions",
    copy: "Travel, illness, menstruation, work constraints, sleep, and prayer combining need first-class handling."
  },
  {
    title: "No shame loops",
    copy: "The product has to help a user return to Salah after missing it. Punitive copy is a retention risk and a spiritual risk."
  }
];

export function HomePage() {
  const { scrollYProgress } = useScroll();
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: 6 + (index * 3.7) % 82,
        size: 4 + (index % 3),
        rotation: Math.random() * 180,
        delay: index * 0.03,
        color: Math.random() > 0.55 ? "#C9A84C" : "#FFFFFF"
      })),
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setWaitlistSubmitted(true);
    setShowConfetti(true);

    window.setTimeout(() => {
      setShowConfetti(false);
    }, 1800);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-emerald">
      <SmoothScroll />

      <section id="top" className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,1)_0%,_rgba(240,247,244,0.72)_55%,_rgba(240,247,244,0.4)_100%)]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[520px] w-[520px] opacity-10">
          <svg viewBox="0 0 300 300" className="h-full w-full">
            <defs>
              <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 0 L60 30 M0 30 L0 60 L30 60" stroke="#014421" strokeWidth="1" opacity="0.14" />
              </pattern>
            </defs>
            <rect width="300" height="300" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 container-px mx-auto grid min-h-screen items-center gap-10 py-28 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#C9A84C]/40 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald shadow-soft"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F9F1D4] text-lg text-[#C9A84C] shadow-inner">
                🌙
              </span>
              <span className="relative overflow-hidden">
                <span className="relative z-10">Now in Beta</span>
                <motion.span
                  className="pointer-events-none absolute inset-y-0 left-[-120px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent"
                  animate={{ x: ["-120%", "180%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="max-w-3xl"
            >
              {['Pray', 'First.', 'Then', 'Scroll.'].map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                  className="block text-5xl font-semibold leading-[0.92] text-emerald sm:text-[72px] lg:text-[72px]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="max-w-2xl text-[20px] leading-8 text-ink/70"
            >
              Muslim Locker blocks your phone until you complete your Salah. Build the habit. Strengthen the deen.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-14 w-full rounded-full border border-emerald/15 bg-white px-5 text-base text-emerald outline-none transition focus:border-[#C9A84C] focus:ring-4 focus:ring-[#C9A84C]/15"
                />
                {showConfetti && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {confettiPieces.map((piece) => (
                      <motion.span
                        key={piece.id}
                        className="absolute rounded-full"
                        style={{
                          left: `${piece.left}%`,
                          width: `${piece.size}px`,
                          height: `${piece.size}px`,
                          background: piece.color,
                          transform: `rotate(${piece.rotation}deg)`
                        }}
                        initial={{ opacity: 1, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -70, scale: 1.4 }}
                        transition={{
                          delay: piece.delay,
                          duration: 1.1,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="min-h-14 rounded-full bg-[#C9A84C] px-8 text-sm font-semibold uppercase tracking-[0.06em] text-white shadow-[0_24px_60px_-36px_rgba(201,168,76,0.9)] transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#C9A84C]/30"
              >
                Join Waitlist
              </button>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: waitlistSubmitted ? 1 : 0, y: waitlistSubmitted ? 0 : 14 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-2 text-sm font-semibold text-emerald/80 sm:mt-0 sm:ml-4 sm:self-center"
              >
                You're on the list! 🤍
              </motion.div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {['AL', 'SM', 'AA', 'NY', 'FA'].map((initial, index) => (
                    <div
                      key={initial}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white bg-[#F7F5EB] text-xs font-bold text-emerald shadow-sm"
                      style={{ zIndex: 20 - index }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-ink/70">
                  Join <span className="font-semibold text-emerald">2,400+</span> Muslims building better habits
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-ink/70">
                <span className="font-semibold text-emerald">4.9</span>
                <span className="flex items-center gap-1 text-[#C9A84C]">
                  ★★★★★
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 38 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto w-full overflow-hidden rounded-[44px] border border-emerald/10 bg-[#F7FCF8] shadow-soft"
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-white/70" />
            <div className="relative h-[640px] w-full">
              <HeroScene scrollYProgress={scrollYProgress} />
              <div className="pointer-events-none absolute inset-x-8 bottom-8 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur">
                <p className="text-sm font-semibold text-emerald">Prayer focus preview</p>
                <p className="mt-1 text-xs leading-5 text-ink/60">
                  Calm lock interface with a gentle Noor glow.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continuous ticker */}
      <Ticker />

      {/* Features grid */}
      <Features />

      <HowItWorksSection />

      <TestimonialsSection />

      <section className="container-px mx-auto max-w-7xl py-8">
        <SectionReveal>
          <div className="grid gap-3 border-y hairline py-5 text-sm text-emerald/[0.78] sm:grid-cols-3">
            {["Built for Muslims with screen-time friction", "Premium, quiet interface", "Android-first validation path"].map(
              (item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  <span>{item}</span>
                </motion.div>
              )
            )}
          </div>
        </SectionReveal>
      </section>

      <section id="method" className="container-px mx-auto max-w-7xl py-20 sm:py-28">
        <SectionReveal className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            The mechanism
          </p>
          <FadeInWhenVisible>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
              Make the bad habit meet the better one.
            </h2>
          </FadeInWhenVisible>
          <p className="mt-5 text-base leading-8 text-ink/[0.68] sm:text-lg">
            The app is not trying to prove worship. It is trying to make phone use
            less automatic at the exact moment prayer deserves attention.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <SectionReveal key={pillar.title} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                className="h-full rounded-lg border hairline bg-white p-6 shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-md bg-emerald text-sm font-bold text-gold">
                  0{index + 1}
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-emerald">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink/[0.68]">{pillar.copy}</p>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <SectionReveal>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Product flow
            </p>
            <FadeInWhenVisible>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
                A lock that needs mercy built into it.
              </h2>
            </FadeInWhenVisible>
            <p className="mt-5 text-base leading-8 text-ink/[0.68] sm:text-lg">
              The failure mode is obvious: overlocking turns into resentment. A
              credible product needs emergency exits, legitimate exceptions, and
              calm recovery after a missed prayer.
            </p>
          </SectionReveal>

          <div className="grid gap-3">
            {steps.map(([number, title, copy], index) => (
              <SectionReveal key={title} delay={index * 0.06}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="grid gap-4 rounded-lg border hairline bg-bone p-5 sm:grid-cols-[3rem_1fr]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-gold text-sm font-bold text-emerald">
                    {number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink/[0.68]">{copy}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto grid max-w-7xl gap-10 py-20 sm:py-28 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <SectionReveal>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Experience
          </p>
          <FadeInWhenVisible>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
              Restrained by design. Serious by default.
            </h2>
          </FadeInWhenVisible>
          <p className="mt-5 text-base leading-8 text-ink/[0.68] sm:text-lg">
            The product should feel like a spiritual utility, not another dopamine
            layer. The interface stays quiet so the decision is clear.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <ModeExplorer />
        </SectionReveal>
      </section>

      <section id="platform" className="bg-emerald py-20 text-white sm:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <SectionReveal className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Platform reality
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              The riskiest assumption is the word “lock.”
            </h2>
            <p className="mt-5 text-base leading-8 text-white/[0.72] sm:text-lg">
              Investors will ask whether this can ship through app review. The
              honest answer is Android-first for stronger blocking, iOS-adapted for
              Focus and accountability.
            </p>
          </SectionReveal>

          <div className="mt-12 overflow-hidden rounded-lg border border-white/[0.15] bg-white/[0.07]">
            {platformRows.map(([platform, capabilities, note], index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.52, delay: index * 0.08 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.11)" }}
                className="grid gap-3 border-b border-white/[0.12] p-5 last:border-b-0 md:grid-cols-[.7fr_1.4fr_.9fr]"
              >
                <div className="font-semibold text-gold">{platform}</div>
                <div className="text-sm leading-7 text-white/[0.76]">{capabilities}</div>
                <div className="text-sm leading-7 text-white/[0.62]">{note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="container-px mx-auto max-w-7xl py-20 sm:py-28">
        <SectionReveal className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Trust model
            </p>
            <FadeInWhenVisible>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
                Build for sincerity, or lose the user.
              </h2>
            </FadeInWhenVisible>
          </div>
          <p className="text-base leading-8 text-ink/[0.68] sm:text-lg">
            Muslim Locker has to be more thoughtful than a generic app blocker with
            Islamic branding. The design needs theological humility, privacy, and a
            product loop that survives imperfect days.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {trustItems.map((item, index) => (
            <SectionReveal key={item.title} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                className="h-full rounded-lg border hairline bg-white p-6 shadow-soft"
              >
                <h3 className="text-2xl font-semibold text-emerald">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/[0.68]">{item.copy}</p>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-white py-20 sm:py-28">
        <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <SectionReveal>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Frequently asked questions
            </p>
            <FadeInWhenVisible>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
                Frequently asked questions
              </h2>
            </FadeInWhenVisible>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <Faq />
          </SectionReveal>
        </div>
      </section>

      <section id="waitlist" className="container-px mx-auto max-w-7xl py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
          <SectionReveal>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Private beta
            </p>
            <FadeInWhenVisible>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
                Join if the real problem is your phone, not your intention.
              </h2>
            </FadeInWhenVisible>
            <p className="mt-5 text-base leading-8 text-ink/[0.68] sm:text-lg">
              Early access will prioritize Muslims who want stronger Android
              blocking, honest iOS constraints, and a calmer way to protect daily
              Salah.
            </p>
            <motion.div
              whileHover={{ y: -4 }}
              className="mt-8 rounded-lg border hairline bg-white p-5"
            >
              <p className="text-sm font-semibold text-emerald">
                Founder note
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/[0.68]">
                The core bet is not that Muslims need more reminders. It is that
                phone compulsion is strong enough to require friction at the moment
                of decision.
              </p>
            </motion.div>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <WaitlistForm />
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
