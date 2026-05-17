"use client";

import { motion, useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { Faq } from "@/components/Faq";
import { ModeExplorer } from "@/components/ModeExplorer";
import { SectionReveal } from "@/components/SectionReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WaitlistForm } from "@/components/WaitlistForm";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((mod) => mod.HeroScene),
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

  return (
    <main className="min-h-screen overflow-hidden bg-bone bg-paper">
      <SmoothScroll />

      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="container-px fixed left-0 right-0 top-0 z-50"
      >
        <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-lg border border-white/70 bg-white/[0.82] px-4 py-3 shadow-soft backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-3 font-semibold text-emerald">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-emerald text-lg font-bold text-gold">
              ML
            </span>
            <span>Muslim Locker</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-emerald/[0.78] md:flex">
            <a href="#method">Method</a>
            <a href="#platform">Platform</a>
            <a href="#trust">Trust</a>
          </div>
          <motion.a
            href="#waitlist"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-md bg-gold px-4 py-2 text-sm font-bold text-emerald shadow-gold outline-none focus-visible:ring-4 focus-visible:ring-gold/30"
          >
            Join beta
          </motion.a>
        </nav>
      </motion.header>

      <section id="top" className="relative min-h-[92svh] pt-28 sm:pt-32">
        <HeroScene scrollYProgress={scrollYProgress} />
        <div className="container-px relative z-10 mx-auto grid max-w-7xl gap-12 pb-16 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:pb-24">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="inline-flex rounded-md border border-gold/[0.35] bg-white/[0.76] px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald backdrop-blur"
            >
              Pray before you scroll
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-4xl text-6xl font-semibold leading-[0.95] text-emerald sm:text-7xl lg:text-8xl"
            >
              Muslim Locker
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-lg leading-8 text-ink/[0.72] sm:text-xl"
            >
              A premium Islamic habit-tracking app designed to interrupt phone
              compulsion at prayer time, protect your Salah, and keep your progress
              private.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                href="#waitlist"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="grid min-h-12 place-items-center rounded-md bg-gold px-6 text-sm font-bold text-emerald shadow-gold outline-none focus-visible:ring-4 focus-visible:ring-gold/30"
              >
                Join private beta
              </motion.a>
              <motion.a
                href="#platform"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="grid min-h-12 place-items-center rounded-md border border-emerald/[0.16] bg-white/[0.76] px-6 text-sm font-bold text-emerald outline-none backdrop-blur focus-visible:ring-4 focus-visible:ring-emerald/[0.15]"
              >
                See platform reality
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto w-full max-w-md lg:pt-28"
          >
            <div className="rounded-lg border hairline bg-white/[0.84] p-5 shadow-soft backdrop-blur">
              <p className="font-arabic text-3xl leading-relaxed text-emerald" dir="rtl" lang="ar">
                إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
              </p>
              <p className="mt-4 text-sm leading-6 text-ink/[0.68]">
                &ldquo;Indeed, prayer has been decreed upon the believers at specified
                times.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Qur&apos;an 4:103
              </p>
            </div>
          </motion.div>
        </div>
      </section>

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
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
            Make the bad habit meet the better one.
          </h2>
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
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
              A lock that needs mercy built into it.
            </h2>
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
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
            Restrained by design. Serious by default.
          </h2>
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
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
              Build for sincerity, or lose the user.
            </h2>
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

      <section className="bg-white py-20 sm:py-28">
        <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <SectionReveal>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Hard questions
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
              The page should answer objections before the pitch call.
            </h2>
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
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">
              Join if the real problem is your phone, not your intention.
            </h2>
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

      <footer className="container-px mx-auto max-w-7xl border-t hairline py-8">
        <div className="flex flex-col gap-3 text-sm text-emerald/[0.68] sm:flex-row sm:items-center sm:justify-between">
          <p>Muslim Locker</p>
          <p>Built for a private beta, not broad claims.</p>
        </div>
      </footer>
    </main>
  );
}
