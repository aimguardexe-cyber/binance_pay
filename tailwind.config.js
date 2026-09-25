/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '540px',
      },

      colors: {
        primary: {
          DEFAULT: "#17171c", // near-black primary
          foreground: "#ffffff",
        },
        "cohere-black": "#000000",
        ink: "#212121",
        "deep-green": "#003c33",
        "dark-navy": "#071829",
        canvas: "#ffffff",
        "soft-stone": "#eeece7",
        "pale-green": "#edfce9",
        "pale-blue": "#f1f5ff",
        hairline: "#d9d9dd",
        "border-light": "#e5e7eb",
        "card-border": "#f2f2f2",
        muted: "#93939f",
        slate: "#75758a",
        "body-muted": "#616161",
        "action-blue": "#1863dc",
        "focus-blue": "#4c6ee6",
        coral: {
          DEFAULT: "#ff7759",
          soft: "#ffad9b",
        },
        "form-focus": "#9b60aa",
        on: {
          primary: "#ffffff",
          dark: "#ffffff",
        },
        error: "#b30000",
        
        // shadcn compat
        background: "#ffffff",
        foreground: "#212121",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#212121",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#212121",
        },
        border: "#e5e7eb",
        input: "#ffffff",
        ring: "#4c6ee6",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "Arial", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "22px",
        xl: "30px",
        pill: "32px",
        full: "9999px",
      },
      spacing: {
        xxs: "2px",
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        xxl: "32px",
        section: "80px",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
