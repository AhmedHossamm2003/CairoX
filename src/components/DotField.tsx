import { useEffect, useRef } from "react";

type DotFieldProps = {
  className?: string;
  /** Distance between dots in CSS pixels. */
  spacing?: number;
  /** Base radius of each dot in CSS pixels. */
  dotSize?: number;
  /** Cursor influence radius. */
  hoverRadius?: number;
  /** Base alpha when far from the cursor (0–1). */
  baseAlpha?: number;
};

/**
 * Canvas dot field with two layers of motion:
 *   1) a soft per-dot shimmer (subtle ambient life)
 *   2) cursor-reactive brighten + grow + red shift inside `hoverRadius`
 *
 * DPR-aware, respects prefers-reduced-motion, and falls back to a single
 * static draw on touch-only devices.
 */
const DotField = ({
  className = "",
  spacing = 30,
  dotSize = 1.1,
  hoverRadius = 170,
  baseAlpha = 0.08,
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const canHover = window.matchMedia("(hover: hover)").matches;

    let width = 0;
    let height = 0;
    let rafId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hr = hoverRadius;
      const hr2 = hr * hr;
      const t = time * 0.001;

      const startX = (width % spacing) / 2 + spacing / 2;
      const startY = (height % spacing) / 2 + spacing / 2;

      for (let x = startX; x < width; x += spacing) {
        for (let y = startY; y < height; y += spacing) {
          // Ambient shimmer (different phase per position)
          const phase = (x + y) * 0.012;
          const wobble = Math.sin(t * 0.9 + phase) * 0.5 + 0.5;
          let alpha = baseAlpha + wobble * 0.05;
          let size = dotSize;
          let r = 255;
          let g = 255;
          let b = 255;

          // Cursor influence
          const dx = x - mx;
          const dy = y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < hr2) {
            const k = 1 - Math.sqrt(d2) / hr;
            alpha = Math.min(0.95, baseAlpha + k * 0.85);
            size = dotSize + k * 1.7;
            // shift toward brand red as we approach
            r = 255 - k * 30;
            g = 255 - k * 226;
            b = 255 - k * 213;
          }

          ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (time: number) => {
      drawFrame(time);
      rafId = requestAnimationFrame(tick);
    };

    resize();

    if (reduceMotion || !canHover) {
      // Single static draw — no RAF loop, no battery cost.
      drawFrame(0);
      window.addEventListener("resize", resize);
    } else {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("resize", resize);
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [spacing, dotSize, hoverRadius, baseAlpha]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
};

export default DotField;
