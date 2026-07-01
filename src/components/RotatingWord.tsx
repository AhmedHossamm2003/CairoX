import { useEffect, useState } from "react";

type RotatingWordProps = {
  words: string[];
  /** Time each word stays visible (ms). */
  interval?: number;
  className?: string;
};

/**
 * Stacks all words in the same grid cell so the container auto-sizes to the
 * widest word. The active word slides in from below; the previous one slides
 * out to the top — both in one smooth pass.
 */
const RotatingWord = ({
  words,
  interval = 2400,
  className = "",
}: RotatingWordProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      className={`relative inline-grid align-baseline overflow-hidden ${className}`}
      style={{ gridTemplateColumns: "1fr", gridTemplateRows: "1fr" }}
    >
      {words.map((word, i) => {
        const isActive = i === index;
        const isPrev =
          (index === 0 ? words.length - 1 : index - 1) === i && !isActive;
        let transform = "translateY(110%)";
        let opacity = 0;
        if (isActive) {
          transform = "translateY(0)";
          opacity = 1;
        } else if (isPrev) {
          transform = "translateY(-110%)";
          opacity = 0;
        }
        return (
          <span
            key={`${word}-${i}`}
            aria-hidden={!isActive}
            className="col-start-1 row-start-1 transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform"
            style={{ transform, opacity }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default RotatingWord;
