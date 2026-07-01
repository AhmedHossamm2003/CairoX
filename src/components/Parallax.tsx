import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  /** Pixels of vertical shift across the full visible-window range. Positive
   *  = moves down (slower than scroll); negative = moves up (faster). */
  offset?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Lightweight scroll-coupled parallax. Uses transform via rAF so it's smooth
 * and doesn't trigger layout. Respects prefers-reduced-motion.
 */
const Parallax = ({
  children,
  offset = 60,
  className = "",
  style,
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let rafId = 0;
    let pending = false;

    const update = () => {
      pending = false;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // Progress: -1 when below screen, 0 when centered, +1 when above.
      const center = rect.top + rect.height / 2;
      const t = (center - winH / 2) / (winH / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, t));
      el.style.transform = `translate3d(0, ${(-clamped * offset).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [offset]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Parallax;
