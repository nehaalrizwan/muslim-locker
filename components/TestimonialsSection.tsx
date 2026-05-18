"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ahmed S.",
    location: "London",
    quote: "I've tried dozens of habit apps. Nothing made Fajr stick like this.",
    initials: "AS"
  },
  {
    name: "Fatima A.",
    location: "Toronto",
    quote: "The lock screen reminder is so effective. My kids now remind ME to pray.",
    initials: "FA"
  },
  {
    name: "Omar H.",
    location: "Dubai",
    quote: "Simple. Effective. Barakah.",
    initials: "OH"
  },
  {
    name: "Aisha M.",
    location: "Birmingham",
    quote: "Streak feature keeps me accountable in a way that feels spiritual, not gamey.",
    initials: "AM"
  },
  {
    name: "Yusuf K.",
    location: "Kuala Lumpur",
    quote: "Downloaded on a whim. Haven't missed Asr in 60 days.",
    initials: "YK"
  },
  {
    name: "Mariam T.",
    location: "New York",
    quote: "The Quran reminders are beautiful. Feels like a companion, not an app.",
    initials: "MT"
  }
];

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-gold" aria-hidden="true">
      <path d="M10 1.5l2.84 5.76 6.35.92-4.59 4.47 1.08 6.32L10 15.93l-5.68 2.99 1.08-6.32L1.81 8.18l6.35-.92L10 1.5z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald/15 bg-emerald/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-emerald" aria-hidden="true">
        <path d="M10 1.5a8.5 8.5 0 108.5 8.5A8.51 8.51 0 0010 1.5zm3.24 6.07l-3.8 4.4a.75.75 0 01-1.12.04l-1.9-1.9a.75.75 0 111.06-1.06l1.34 1.34 3.26-3.76a.75.75 0 111.16.94z" />
      </svg>
      verified
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">What early users are saying</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">What early users are saying</h2>
        </div>

        <div className="mt-12 columns-1 gap-6 md:columns-2 xl:columns-3">
          {testimonials.map((item, index) => {
            const fromLeft = index % 2 === 0;
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 28, x: fromLeft ? -28 : 28 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="mb-6 inline-block w-full break-inside-avoid rounded-[28px] border border-emerald/10 bg-white p-7 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald text-sm font-semibold text-white">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-emerald">{item.name}</p>
                    <p className="text-sm text-ink/70">{item.location}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <StarIcon key={starIndex} />
                  ))}
                </div>

                <p className="mt-6 text-lg leading-8 text-emerald/95 italic font-serif">
                  “{item.quote}”
                </p>

                <div className="mt-6">
                  <VerifiedBadge />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
