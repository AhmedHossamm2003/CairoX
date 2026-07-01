type WavesProps = {
  className?: string;
};

/**
 * Three layered SVG ribbon waves drifting horizontally at different speeds.
 * Pure CSS animation — no JS, GPU-friendly.
 *
 * Each layer is 200% width so we can translate the SVG by -50% in a perfect
 * loop without visible seams (the path tiles seamlessly across two halves).
 */
const Waves = ({ className = "" }: WavesProps) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
      }}
    >
      {/* Back wave — slowest, biggest, most muted */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[70%] w-[200%] animate-wave-slow"
        viewBox="0 0 2400 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-fill-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(225,29,42,0.30)" />
            <stop offset="100%" stopColor="rgba(225,29,42,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 180 C 200 120, 400 240, 600 180 C 800 120, 1000 240, 1200 180 C 1400 120, 1600 240, 1800 180 C 2000 120, 2200 240, 2400 180 L 2400 320 L 0 320 Z"
          fill="url(#wave-fill-back)"
        />
      </svg>

      {/* Middle wave */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[55%] w-[200%] animate-wave-med"
        viewBox="0 0 2400 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-fill-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,86,99,0.34)" />
            <stop offset="100%" stopColor="rgba(225,29,42,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 200 C 150 140, 300 260, 450 200 C 600 140, 750 260, 900 200 C 1050 140, 1200 260, 1350 200 C 1500 140, 1650 260, 1800 200 C 1950 140, 2100 260, 2250 200 C 2325 170, 2400 230, 2400 200 L 2400 320 L 0 320 Z"
          fill="url(#wave-fill-mid)"
        />
      </svg>

      {/* Front wave — fastest, sharpest */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[40%] w-[200%] animate-wave-fast"
        viewBox="0 0 2400 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-fill-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(225,29,42,0.48)" />
            <stop offset="100%" stopColor="rgba(225,29,42,0)" />
          </linearGradient>
          <linearGradient id="wave-stroke-front" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(225,29,42,0)" />
            <stop offset="50%" stopColor="rgba(255,86,99,0.7)" />
            <stop offset="100%" stopColor="rgba(225,29,42,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 220 C 100 170, 200 270, 300 220 C 400 170, 500 270, 600 220 C 700 170, 800 270, 900 220 C 1000 170, 1100 270, 1200 220 C 1300 170, 1400 270, 1500 220 C 1600 170, 1700 270, 1800 220 C 1900 170, 2000 270, 2100 220 C 2200 170, 2300 270, 2400 220 L 2400 320 L 0 320 Z"
          fill="url(#wave-fill-front)"
        />
        <path
          d="M0 220 C 100 170, 200 270, 300 220 C 400 170, 500 270, 600 220 C 700 170, 800 270, 900 220 C 1000 170, 1100 270, 1200 220 C 1300 170, 1400 270, 1500 220 C 1600 170, 1700 270, 1800 220 C 1900 170, 2000 270, 2100 220 C 2200 170, 2300 270, 2400 220"
          fill="none"
          stroke="url(#wave-stroke-front)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default Waves;
