import { z } from "zod";

export const waitlistSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email.")
    .max(120, "Email is too long."),
  platform: z.enum(["ios", "android", "both"], {
    required_error: "Choose a platform."
  }),
  intent: z
    .string()
    .trim()
    .max(240, "Keep this under 240 characters.")
    .optional()
    .or(z.literal(""))
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
