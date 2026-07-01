/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#08080A",
          panel: "#0D0D11",
          border: "#1C1C22",
          muted: "#8A8A93",
          text: "#E7E7EA",
          red: "#E11D2A",
          redDeep: "#B0121C",
          redGlow: "rgba(225, 29, 42, 0.45)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "red-glow": "0 0 40px -8px rgba(225, 29, 42, 0.55)",
        "red-glow-sm": "0 0 18px -4px rgba(225, 29, 42, 0.5)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 10px 30px -10px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-red":
          "radial-gradient(60% 60% at 50% 0%, rgba(225,29,42,0.18) 0%, rgba(225,29,42,0) 70%)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out both",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "marquee": "marquee 22s linear infinite",
        "marquee-slow": "marquee 34s linear infinite",
        "shimmer": "shimmer 2.2s linear infinite",
        "float": "float 7s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "gradient-shift": "gradientShift 12s ease-in-out infinite",
        "drift-a": "driftA 14s ease-in-out infinite",
        "drift-b": "driftB 18s ease-in-out infinite",
        "drift-c": "driftC 16s ease-in-out infinite",
        "wave-slow": "waveX 14s linear infinite",
        "wave-med": "waveX 9s linear infinite",
        "wave-fast": "waveX 6s linear infinite",
        "curtain-in": "curtainIn 0.6s cubic-bezier(0.65,0,0.35,1) forwards",
        "curtain-out": "curtainOut 0.5s cubic-bezier(0.65,0,0.35,1) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        driftA: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(160px, -90px) scale(1.18)" },
          "66%": { transform: "translate(-120px, 100px) scale(0.88)" },
        },
        driftB: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-150px, 90px) scale(1.25)" },
        },
        driftC: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-140px, -70px) scale(0.85)" },
          "66%": { transform: "translate(120px, 110px) scale(1.2)" },
        },
        waveX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        curtainIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        curtainOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
