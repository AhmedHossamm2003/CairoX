import { useRef } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Intensity (0–1) of the red spotlight glow that follows the cursor. */
  intensity?: number;
};

/**
 * A card with a soft red spotlight that follows the cursor.
 * Pure CSS variables — no JS animation libraries needed.
 */
const SpotlightCard = ({
  children,
  className = "",
  intensity = 0.18,
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const style = {
    "--spot-intensity": intensity.toString(),
  } as CSSProperties;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      style={style}
      className={`group/spot relative isolate overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 transition-colors duration-300 hover:border-brand-red/50 ${className}`}
    >
      {/* Top inner highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {/* Cursor-tracked spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(225,29,42,calc(var(--spot-intensity) * 1)), transparent 60%)",
        }}
      />
      {/* Subtle base sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
};

export default SpotlightCard;
