"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { WaitlistInput, waitlistSchema } from "@/lib/waitlist";

export function WaitlistForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      platform: "android",
      intent: ""
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    setServerMessage("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
      error?: string;
    };

    if (!response.ok || !result.success) {
      setServerError(
        result.message || result.error || "Something went wrong. Try again."
      );
      return;
    }

    setServerMessage("You're on the waitlist. Check your inbox for confirmation.");
    reset();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border hairline bg-white p-5 shadow-soft sm:p-7"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-emerald">
          Name
          <input
            {...register("name")}
            autoComplete="name"
            className="min-h-12 rounded-md border border-emerald/[0.15] bg-bone px-4 font-normal text-ink outline-none ring-gold/0 transition focus:border-gold focus:ring-4 focus:ring-gold/[0.15]"
            placeholder="Your name"
          />
          {errors.name ? (
            <span className="text-xs font-medium text-red-700">
              {errors.name.message}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-semibold text-emerald">
          Email
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className="min-h-12 rounded-md border border-emerald/[0.15] bg-bone px-4 font-normal text-ink outline-none ring-gold/0 transition focus:border-gold focus:ring-4 focus:ring-gold/[0.15]"
            placeholder="you@example.com"
          />
          {errors.email ? (
            <span className="text-xs font-medium text-red-700">
              {errors.email.message}
            </span>
          ) : null}
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-emerald">Beta platform</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-md bg-bone p-1">
          {[
            ["android", "Android"],
            ["ios", "iOS"],
            ["both", "Both"]
          ].map(([value, label]) => (
            <label key={value} className="relative cursor-pointer">
              <input
                {...register("platform")}
                type="radio"
                value={value}
                className="peer sr-only"
              />
              <span className="grid min-h-11 place-items-center rounded-md px-2 text-sm font-semibold text-emerald transition peer-checked:bg-white peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-emerald">
        What would make this worth using?
        <textarea
          {...register("intent")}
          rows={4}
          className="resize-none rounded-md border border-emerald/[0.15] bg-bone px-4 py-3 font-normal text-ink outline-none ring-gold/0 transition focus:border-gold focus:ring-4 focus:ring-gold/[0.15]"
          placeholder="Example: Blocking social apps until I pray Fajr."
        />
        {errors.intent ? (
          <span className="text-xs font-medium text-red-700">
            {errors.intent.message}
          </span>
        ) : null}
      </label>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 min-h-12 w-full rounded-md bg-gold px-5 text-sm font-bold text-emerald shadow-gold outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-gold/30"
      >
        {isSubmitting ? "Joining..." : "Join private beta"}
      </motion.button>

      {serverMessage ? (
        <p className="mt-4 rounded-md bg-emerald/[0.08] px-4 py-3 text-sm font-medium text-emerald">
          {serverMessage}
        </p>
      ) : null}
      {serverError ? (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {serverError}
        </p>
      ) : null}
    </form>
  );
}
