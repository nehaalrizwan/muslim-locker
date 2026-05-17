import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F8F7F4",
        emerald: "#0D4B35",
        gold: "#C9A84C",
        ink: "#17211C",
        mist: "#E9E6DD"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(13, 75, 53, 0.12)",
        gold: "0 16px 42px rgba(201, 168, 76, 0.22)"
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at 12% 10%, rgba(201,168,76,.11), transparent 26rem), radial-gradient(circle at 88% 22%, rgba(13,75,53,.08), transparent 24rem)"
      }
    }
  },
  plugins: []
};

export default config;
