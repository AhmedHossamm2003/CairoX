import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  speed?: "normal" | "slow";
  className?: string;
};

/**
 * Infinite horizontal marquee. Duplicates the content so the loop is seamless.
 * Pauses on hover, fades at the edges.
 */
const Marquee = ({ items, speed = "normal", className = "" }: MarqueeProps) => {
  const duration = speed === "slow" ? "30s" : "18s";

  return (
    <div
      className={`group/marquee relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        className="cairox-marquee-track flex w-max min-w-full items-center gap-8 group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: duration }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex shrink-0 items-center gap-3 text-sm font-medium text-brand-muted whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
