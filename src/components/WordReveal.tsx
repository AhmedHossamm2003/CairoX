import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type WordRevealProps = {
  /** Plain text — split by space, each word animates in. */
  text?: string;
  /** Or pass children for richer markup (gradient spans etc.). They'll
   *  still animate as one block. */
  children?: ReactNode;
  className?: string;
  /** HTML element to render as (default h2). */
  as?: ElementType;
  /** Delay between consecutive words (ms). */
  stagger?: number;
  once?: boolean;
};

/**
 * Headline reveal: each word slides up from below + fades in as the element
 * enters the viewport. Falls back to instant render if prefers-reduced-motion.
 */
const WordReveal = ({
  text,
  children,
  className = "",
  as,
  stagger = 70,
  once = true,
}: WordRevealProps) => {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  if (text) {
    const words = text.split(" ");
    return (
      <Tag ref={ref} className={className}>
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="inline-block overflow-hidden align-baseline"
            style={{ paddingBottom: "0.06em" }}
          >
            <span
              className="inline-block transition-all duration-[700ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform"
              style={{
                transform: visible ? "translateY(0)" : "translateY(110%)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * stagger}ms`,
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`overflow-hidden transition-all duration-700 ease-out ${className}`}
      style={{
        transform: visible ? "translateY(0)" : "translateY(20px)",
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </Tag>
  );
};

export default WordReveal;
