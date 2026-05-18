"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const footerLinks = {
  product: ["Features", "How It Works", "Pricing", "Download"],
  company: ["About", "Blog", "Privacy Policy", "Terms"],
  community: ["Join Waitlist", "Contact", "Discord"]
};

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald/10 bg-white text-emerald transition hover:border-emerald hover:bg-emerald/5"
    >
      {children}
    </a>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="group inline-flex items-center text-sm text-emerald transition"
    >
      <span className="relative overflow-hidden">
        <span className="relative z-10">{label}</span>
        <span className="absolute left-0 bottom-0 h-[1px] w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
    </a>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-[#E5E5E5] bg-white text-emerald">
      <div className="container-px mx-auto max-w-7xl py-10">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald/40">بِسْمِ اللَّهِ</p>
        <div className="mt-8 grid gap-8 md:grid-cols-4">
          <div className="space-y-6">
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em] text-emerald">Muslim Locker</p>
              <p className="mt-3 max-w-xs text-sm leading-7 text-ink/75">
                A quiet lock for Salah habit, built with respect and gentle accountability.
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setEmail("");
              }}
              className="flex flex-col gap-3"
            >
              <label className="text-sm font-semibold text-emerald">Get launch updates</label>
              <div className="flex rounded-full border border-emerald/10 bg-[#F8F7F3] p-1 shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="flex-1 rounded-full border-none bg-transparent px-4 py-3 text-sm text-emerald outline-none placeholder:text-emerald/40"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald text-white transition hover:bg-[#0B3A26]"
                  aria-label="Submit email"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M3 12l18-9-9 18-2-7-7-2z" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3">
              <SocialIcon label="Twitter / X">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M22 5.72c-.78.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.61 8.61 0 01-2.72 1.04 4.29 4.29 0 00-7.3 3.91A12.17 12.17 0 013 4.82a4.29 4.29 0 001.33 5.73 4.27 4.27 0 01-1.94-.54v.05a4.29 4.29 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004.01 2.98A8.61 8.61 0 012 19.54a12.15 12.15 0 006.58 1.93c7.9 0 12.22-6.55 12.22-12.23 0-.19 0-.37-.01-.56A8.72 8.72 0 0022 5.72z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.35 2.2a.86.86 0 11-1.72 0 .86.86 0 011.72 0zM12 7.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 1.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="TikTok">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M17.5 3.5h-2.5v9.5a4.5 4.5 0 11-4.5-4.5v2.5a2 2 0 102 2V5.5h4.5V3.5z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald/70">Product</h3>
            <div className="mt-6 space-y-4">
              {footerLinks.product.map((item) => (
                <FooterLink key={item} label={item} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald/70">Company</h3>
            <div className="mt-6 space-y-4">
              {footerLinks.company.map((item) => (
                <FooterLink key={item} label={item} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald/70">Community</h3>
            <div className="mt-6 space-y-4">
              {footerLinks.community.map((item) => (
                <FooterLink key={item} label={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5] bg-[#FCFBF8] py-5 text-center text-sm text-emerald/70">
        © 2025 Muslim Locker. Built with 🤍 for the Ummah.
      </div>
    </footer>
  );
}
