import { useEffect, useRef } from "react";

type ParticlesProps = {
  className?: string;
  /** Number of particles. */
  count?: number;
  /** Also draw faint links between nearby particles. */
  links?: boolean;
};

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  hot: boolean;
};

/**
 * Visible drifting particle field ("embers"): small glowing red/white dots
 * that float upward and react to the cursor (gentle push). Thin links connect
 * nearby particles for a network feel.
 *
 * DPR-aware, pauses when the tab is hidden, respects prefers-reduced-motion
 * (renders a single static frame instead of animating).
 */
const Particles = ({ className = "", count, links = true }: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const make = (): P => {
      const hot = Math.random() < 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.18 + Math.random() * 0.5),
        r: hot ? 1.4 + Math.random() * 2.2 : 0.8 + Math.random() * 1.3,
        a: 0.25 + Math.random() * 0.5,
        hot,
      };
    };

    const seed = () => {
      const area = width * height;
      const n = count ?? Math.round(Math.min(110, Math.max(50, area / 12000)));
      particles = Array.from({ length: n }, make);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / 120) * 0.6;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        // Damping so cursor pushes settle
        p.vx *= 0.96;
        p.vy = p.vy * 0.98 - 0.004; // keep a gentle upward bias

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Links
        if (links) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const lx = p.x - q.x;
            const ly = p.y - q.y;
            const ld2 = lx * lx + ly * ly;
            if (ld2 < 110 * 110) {
              const alpha = (1 - Math.sqrt(ld2) / 110) * 0.18;
              ctx.strokeStyle = `rgba(225,29,42,${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }

        // Dot with glow
        if (p.hot) {
          ctx.shadowColor = "rgba(225,29,42,0.9)";
          ctx.shadowBlur = 8;
          ctx.fillStyle = `rgba(255,70,84,${p.a})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255,255,255,${p.a * 0.5})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    seed();

    window.addEventListener("resize", () => {
      resize();
      seed();
    });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, links]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
};

export default Particles;
