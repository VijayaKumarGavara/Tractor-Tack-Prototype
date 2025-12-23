/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      /* =========================
         FONTS
      ========================= */
      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },

      /* =========================
         COLORS
      ========================= */
      colors: {
        /* Brand / Primary */
        brand: {
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },

        /* Light Theme */
        light: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E5E7EB",
          text: "#0F172A",
          text2: "#64748B",
        },

        /* Dark Theme */
        // dark: {
        //   bg: "#020617",
        //   card: "#0F172A",
        //   border: "#1E293B",
        //   text: "#F8FAFC",
        //   text2: "#94A3B8",
        // },
        dark: {
          bg: "#0D0F14",
          card: "#1A1C23",
          border: "#2A2D35",
          text: "#E5E7EB",
          text2: "#9CA3AF",
        },
        /* Accent / Info */
        accent: "#0EA5E9",

        /* States */
        danger: "#EF4444",
        warning: "#F59E0B",
        success: "#22C55E",
      },

      /* =========================
         RESPONSIVE FONT SIZES
      ========================= */
      fontSize: {
        xs: "clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)",
        sm: "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)",
        base: "clamp(1rem, 0.95rem + 0.4vw, 1.125rem)",
        lg: "clamp(1.125rem, 1.05rem + 0.5vw, 1.25rem)",
        xl: "clamp(1.25rem, 1.15rem + 0.6vw, 1.5rem)",
        "2xl": "clamp(1.5rem, 1.3rem + 1vw, 2rem)",
        "3xl": "clamp(1.875rem, 1.6rem + 1.5vw, 2.5rem)",
      },

      /* =========================
         RESPONSIVE SPACING
      ========================= */
      spacing: {
        xs: "clamp(0.25rem, 0.2rem + 0.2vw, 0.5rem)",
        sm: "clamp(0.5rem, 0.4rem + 0.3vw, 0.75rem)",
        md: "clamp(1rem, 0.8rem + 0.5vw, 1.25rem)",
        lg: "clamp(1.5rem, 1.2rem + 0.8vw, 2rem)",
        xl: "clamp(2rem, 1.6rem + 1vw, 3rem)",
      },

      /* =========================
         BACKGROUND IMAGES
      ========================= */
      backgroundImage: {
        "hero-bg": "url('src/assets/bg.png')",
      },
    },
  },
  plugins: [],
};
