import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type Phase = "idle" | "in" | "out";

/**
 * Route-change curtain. Slides a brand-red panel up from the bottom to fully
 * cover the screen, then slides it out the top — the new page is already
 * mounted behind it so the swap is invisible during the "cover" frame.
 *
 * Total ~1.1s. Skips the very first render (no curtain on initial load).
 */
const PageTransition = () => {
  const location = useLocation();
  const [phase, setPhase] = useState<Phase>("idle");
  const firstRender = useRef(true);
  const prevKey = useRef(location.pathname);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prevKey.current === location.pathname) return;
    prevKey.current = location.pathname;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    setPhase("in");
    const t1 = window.setTimeout(() => setPhase("out"), 600);
    const t2 = window.setTimeout(() => setPhase("idle"), 1150);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname]);

  if (phase === "idle") return null;

  const animation = phase === "in" ? "animate-curtain-in" : "animate-curtain-out";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
    >
      <div
        className={`absolute inset-0 ${animation}`}
        style={{
          background:
            "linear-gradient(180deg, #B0121C 0%, #E11D2A 50%, #08080A 100%)",
        }}
      />
      <div
        className={`absolute inset-x-0 ${phase === "in" ? "bottom-full" : "top-full"} h-24`}
        style={{
          background:
            phase === "in"
              ? "linear-gradient(to top, rgba(225,29,42,0.5), transparent)"
              : "linear-gradient(to bottom, rgba(225,29,42,0.5), transparent)",
        }}
      />
    </div>
  );
};

export default PageTransition;
