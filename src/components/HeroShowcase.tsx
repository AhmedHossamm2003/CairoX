import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Brain,
  Check,
  LayoutGrid,
  Lock,
  MoreVertical,
  Plus,
  RotateCw,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Wifi,
} from "lucide-react";

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts up to `end` once on mount (ease-out cubic). */
const CountUp = ({
  end,
  duration = 1100,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReduced()) {
      setValue(end);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <>
      {prefix}
      {formatted}
      {suffix}
    </>
  );
};

/** Types `text` out character by character on mount, with a blinking caret. */
const Typewriter = ({
  text,
  speed = 30,
  startDelay = 0,
  className = "",
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) => {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReduced()) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    let step: number;
    const begin = window.setTimeout(() => {
      const advance = () => {
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) {
          step = window.setTimeout(advance, speed);
        } else {
          setDone(true);
        }
      };
      advance();
    }, startDelay);
    return () => {
      window.clearTimeout(begin);
      window.clearTimeout(step);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {out}
      {!done && (
        <span className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[1px] animate-pulse bg-current align-middle" />
      )}
    </span>
  );
};

/** Tiny iOS-style status bar icons for the phone. */
const StatusIcons = () => (
  <span className="flex items-center gap-1 text-white/80">
    <span className="flex items-end gap-[1px]">
      <span className="h-1 w-[2px] rounded-sm bg-current" />
      <span className="h-1.5 w-[2px] rounded-sm bg-current" />
      <span className="h-2 w-[2px] rounded-sm bg-current" />
      <span className="h-2.5 w-[2px] rounded-sm bg-current opacity-40" />
    </span>
    <Wifi size={9} strokeWidth={2.5} />
    <span className="flex h-2.5 w-4 items-center rounded-[2px] border border-current px-[1px]">
      <span className="h-1.5 w-3/4 rounded-[1px] bg-current" />
    </span>
  </span>
);

// ----------------------------------------------------------------------------
// App data
// ----------------------------------------------------------------------------

const APPS = [
  { id: "analytics", label: "Analytics", url: "app.cairox.io/overview", dot: "#E11D2A" },
  { id: "store", label: "NOVA Store", url: "shop.cairox.io", dot: "#22c55e" },
  { id: "assistant", label: "Assistant", url: "chat.cairox.io", dot: "#a855f7" },
] as const;

const kpis = [
  { label: "Revenue", prefix: "$", end: 84.2, decimals: 1, suffix: "k", delta: "+12.4%" },
  { label: "Orders", end: 1284, delta: "+8.1%" },
  { label: "Active users", end: 8.6, decimals: 1, suffix: "k", delta: "+5.3%" },
];

const products = [
  { name: "Air Runner", price: "$128", rating: "4.8", img: "linear-gradient(135deg,#33333d,#15151a)" },
  { name: "Tech Hoodie", price: "$72", rating: "4.6", img: "linear-gradient(135deg,#3a1418,#15151a)" },
  { name: "Daypack 22L", price: "$228", rating: "4.9", img: "linear-gradient(135deg,#1c1c26,#0a0a0d)" },
];

// ----------------------------------------------------------------------------
// Laptop apps — realistic product UIs
// ----------------------------------------------------------------------------

const AnalyticsApp = () => (
  <div className="flex h-full">
    <div className="hidden w-9 flex-col items-center gap-2.5 border-r border-brand-border bg-brand-bg/60 py-3 sm:flex">
      <span className="mb-1 h-5 w-5 rounded-md bg-brand-red" />
      {[LayoutGrid, BarChart3, Users, Settings].map((Icon, i) => (
        <span
          key={i}
          className={`flex h-6 w-6 items-center justify-center rounded-md ${
            i === 0 ? "bg-brand-red/15 text-brand-red" : "text-brand-muted"
          }`}
        >
          <Icon size={13} />
        </span>
      ))}
    </div>

    <div className="flex-1 p-3">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-display text-[13px] font-bold leading-none text-white">
            Overview
          </p>
          <p className="mt-1 text-[8px] text-brand-muted">Welcome back, Hossam</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center rounded-md border border-brand-border bg-brand-bg/70 px-2 py-1 text-[8px] text-brand-muted sm:flex">
            Last 30 days
          </span>
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-brand-red to-brand-redDeep" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-brand-border bg-brand-bg/50 p-2"
          >
            <p className="truncate text-[8px] text-brand-muted">{k.label}</p>
            <p className="font-display text-[13px] font-bold leading-tight text-white">
              <CountUp
                prefix={k.prefix}
                end={k.end}
                decimals={k.decimals ?? 0}
                suffix={k.suffix}
              />
            </p>
            <p className="flex items-center gap-0.5 text-[7px] font-medium text-emerald-400">
              <TrendingUp size={8} />
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 rounded-lg border border-brand-border bg-brand-bg/50 p-2">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[9px] font-semibold text-white">Revenue trend</p>
          <span className="text-[8px] text-brand-muted">2024</span>
        </div>
        <svg viewBox="0 0 280 60" preserveAspectRatio="none" className="h-12 w-full">
          <defs>
            <linearGradient id="revfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E11D2A" stopOpacity="0.32" />
              <stop offset="1" stopColor="#E11D2A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,48 L40,40 L80,44 L120,26 L160,31 L200,15 L240,22 L280,9 L280,60 L0,60 Z"
            fill="url(#revfill)"
          />
          <path
            d="M0,48 L40,40 L80,44 L120,26 L160,31 L200,15 L240,22 L280,9"
            fill="none"
            stroke="#E11D2A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hero-draw"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[7px] text-brand-muted">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
        </div>
      </div>
    </div>
  </div>
);

const StoreApp = () => (
  <div className="flex h-full flex-col">
    <div className="flex items-center justify-between border-b border-brand-border px-3 py-2">
      <div className="flex items-center gap-3">
        <span className="font-display text-[12px] font-bold tracking-tight text-white">
          NOVA
        </span>
        <span className="hidden gap-2.5 text-[8px] text-brand-muted sm:flex">
          <span className="text-white">New</span>
          <span>Men</span>
          <span>Women</span>
        </span>
      </div>
      <div className="flex items-center gap-2.5 text-brand-muted">
        <Search size={12} />
        <span className="relative">
          <ShoppingCart size={12} />
          <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-brand-red text-[6px] font-bold text-white">
            3
          </span>
        </span>
      </div>
    </div>

    <div className="mx-3 mt-2.5 flex items-center justify-between overflow-hidden rounded-lg bg-gradient-to-r from-brand-red to-brand-redDeep px-3 py-2">
      <div>
        <p className="text-[10px] font-bold leading-none text-white">
          Summer collection
        </p>
        <p className="mt-1 text-[8px] text-white/80">Up to 30% off</p>
      </div>
      <span className="rounded-md bg-white px-2 py-1 text-[8px] font-bold text-brand-red">
        Shop now
      </span>
    </div>

    <div className="grid flex-1 grid-cols-3 gap-2 px-3 pt-2.5">
      {products.map((p, i) => (
        <div
          key={p.name}
          className="flex flex-col rounded-lg border border-brand-border bg-brand-bg/50 p-1.5"
          style={{ animation: `hero-row-in 0.5s ease-out ${i * 0.08}s backwards` }}
        >
          <div className="mb-1.5 h-9 rounded-md" style={{ background: p.img }} />
          <p className="truncate text-[8px] font-medium text-white">{p.name}</p>
          <div className="mt-auto flex items-center justify-between pt-0.5">
            <span className="font-display text-[9px] font-bold text-white">
              {p.price}
            </span>
            <span className="flex items-center gap-0.5 text-[7px] text-amber-400">
              <Star size={7} fill="currentColor" />
              {p.rating}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="mx-3 mb-3 mt-2.5 flex items-center justify-between rounded-lg bg-brand-red px-3 py-2">
      <span className="text-[9px] text-white/90">Cart · 3 items</span>
      <span className="flex items-center gap-1 font-display text-[11px] font-bold text-white">
        Checkout $428
        <ArrowUpRight size={11} />
      </span>
    </div>
  </div>
);

const AssistantApp = () => (
  <div className="flex h-full">
    <div className="hidden w-[74px] flex-col gap-1.5 border-r border-brand-border bg-brand-bg/60 p-2 sm:flex">
      <span className="flex items-center gap-1 rounded-md bg-brand-red px-1.5 py-1 text-[8px] font-semibold text-white">
        <Plus size={9} /> New chat
      </span>
      {["Lead summary", "Q3 report", "Onboarding"].map((t, i) => (
        <span
          key={t}
          className={`truncate rounded-md px-1.5 py-1 text-[8px] ${
            i === 0 ? "bg-white/5 text-brand-text" : "text-brand-muted"
          }`}
        >
          {t}
        </span>
      ))}
    </div>

    <div className="flex flex-1 flex-col p-3">
      <div className="flex items-center gap-1.5 border-b border-brand-border pb-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-red text-white">
          <Brain size={12} />
        </span>
        <p className="text-[10px] font-semibold text-white">CairoX Assistant</p>
        <span className="ml-auto flex items-center gap-1 text-[7px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-1.5 py-2">
        <p
          className="ml-auto max-w-[78%] rounded-lg rounded-br-sm bg-white/10 px-2.5 py-1.5 text-[9px] text-brand-text"
          style={{ animation: "hero-row-in 0.4s ease-out backwards" }}
        >
          Summarize today&apos;s leads.
        </p>
        <div
          className="mr-auto max-w-[90%] rounded-lg rounded-bl-sm bg-brand-red/90 px-2.5 py-1.5 text-[9px] leading-relaxed text-white"
          style={{ animation: "hero-row-in 0.4s ease-out 0.4s backwards" }}
        >
          <Typewriter
            text="You have 18 hot leads today — 4 are ready for a call. Want me to draft the follow-ups?"
            startDelay={600}
          />
        </div>
      </div>

      <div className="mb-1.5 flex gap-1.5">
        {["Draft emails", "Book calls"].map((c) => (
          <span
            key={c}
            className="rounded-full border border-brand-border px-2 py-0.5 text-[7px] text-brand-muted"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-bg/70 px-2.5 py-1.5">
        <span className="flex-1 text-[8px] text-brand-muted">Message CairoX…</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-red text-white">
          <Send size={10} />
        </span>
      </div>
    </div>
  </div>
);

const LaptopApp = ({ app }: { app: number }) => {
  if (app === 0) return <AnalyticsApp />;
  if (app === 1) return <StoreApp />;
  return <AssistantApp />;
};

// ----------------------------------------------------------------------------
// Phone — mobile companion synced to the active app
// ----------------------------------------------------------------------------

const PhoneScreen = ({ app }: { app: number }) => {
  if (app === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-display text-[11px] font-bold text-white">Today</p>
          <span className="rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-400">
            LIVE
          </span>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-bg/70 p-2">
          <p className="text-[8px] text-brand-muted">Revenue</p>
          <p className="font-display text-sm font-bold text-white">
            <CountUp prefix="$" end={84.2} decimals={1} suffix="k" />
          </p>
          <svg viewBox="0 0 100 26" className="mt-1 h-6 w-full">
            <polyline
              points="0,21 16,17 32,19 48,9 64,12 80,4 100,7"
              fill="none"
              stroke="#E11D2A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-bg/70 px-2.5 py-1.5">
          <span className="text-[8px] text-brand-muted">Conversion</span>
          <span className="flex items-center gap-1 text-[8px] font-semibold text-emerald-400">
            <TrendingUp size={9} /> 4.8%
          </span>
        </div>
      </div>
    );
  }

  if (app === 1) {
    return (
      <div className="space-y-2">
        <p className="font-display text-[11px] font-bold text-white">Notifications</p>
        <div
          className="rounded-xl border border-brand-red/40 bg-brand-red/10 p-2.5"
          style={{ animation: "hero-notif-in 0.55s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <Bell size={10} className="text-brand-red" />
            <span className="text-[8px] font-semibold uppercase tracking-wide text-brand-red">
              New order
            </span>
            <span className="ml-auto text-[7px] text-brand-muted">now</span>
          </div>
          <p className="text-[10px] font-semibold text-white">$428 · Paid</p>
          <p className="flex items-center gap-1 text-[8px] text-emerald-400">
            <Check size={9} strokeWidth={3} /> Payment confirmed
          </p>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-bg/70 px-2.5 py-1.5 opacity-70">
          <span className="text-[8px] text-brand-muted">Order #1043</span>
          <span className="text-[8px] font-semibold text-white">$72</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-red text-white">
          <Brain size={13} />
        </span>
        <p className="font-display text-[11px] font-bold text-white">Assistant</p>
      </div>
      <div
        className="rounded-xl rounded-bl-sm border border-brand-border bg-brand-bg/70 px-2.5 py-2"
        style={{ animation: "hero-row-in 0.4s ease-out backwards" }}
      >
        <p className="text-[9px] leading-relaxed text-brand-text">
          <Typewriter text="Drafted 4 follow-up emails ✓" startDelay={400} />
        </p>
      </div>
      <button className="flex w-full items-center justify-between rounded-xl bg-brand-red px-2.5 py-2 text-[9px] font-semibold text-white">
        Review drafts
        <ArrowUpRight size={11} />
      </button>
    </div>
  );
};

// ----------------------------------------------------------------------------
// Main showcase
// ----------------------------------------------------------------------------

const SCENE_DURATION = 5000;

const HeroShowcase = () => {
  const [app, setApp] = useState(0);
  const [paused, setPaused] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paused || prefersReduced()) return;
    const id = window.setTimeout(() => {
      setApp((a) => (a + 1) % APPS.length);
    }, SCENE_DURATION);
    return () => window.clearTimeout(id);
  }, [app, paused]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--hero-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--hero-y", y.toFixed(3));
  };

  const reset = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--hero-x", "0");
    event.currentTarget.style.setProperty("--hero-y", "0");
  };

  const sceneStyle = { "--hero-x": "0", "--hero-y": "0" } as CSSProperties;

  return (
    <div
      ref={sceneRef}
      className="device-stack-scene relative mx-auto h-[400px] w-full max-w-[580px] select-none sm:h-[450px] lg:mx-0"
      style={sceneStyle}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {/* Soft contained glow */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[58%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/15 blur-[90px]" />
      {/* Reflective floor */}
      <div className="pointer-events-none absolute inset-x-8 bottom-[58px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute bottom-[34px] left-1/2 h-8 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-2xl" />

      {/* ---------------------------------------------------------------- */}
      {/* LAPTOP — focal, realistic, interactive                            */}
      {/* ---------------------------------------------------------------- */}
      <div className="device-stack-layer device-stack-desktop absolute inset-x-0 top-0 mx-auto w-[95%]">
        <div
          style={{
            WebkitBoxReflect:
              "below 2px linear-gradient(to bottom, rgba(255,255,255,0.16), rgba(255,255,255,0) 34%)",
          }}
        >
          {/* Lid: aluminum frame + thin bezel */}
          <div className="relative rounded-t-[14px] bg-gradient-to-b from-[#2a2a30] to-[#0c0c10] p-[3px] shadow-panel">
            <div className="rounded-t-[12px] border border-black/40 bg-[#050506] p-2">
              {/* camera */}
              <span className="absolute left-1/2 top-[7px] h-1 w-1 -translate-x-1/2 rounded-full bg-white/15" />

              <div className="overflow-hidden rounded-[8px] border border-white/5 bg-brand-panel">
                {/* Browser: window controls + tabs */}
                <div className="flex items-center gap-2 border-b border-brand-border bg-brand-bg/90 px-2.5 pt-2">
                  <span className="flex gap-1.5 pb-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </span>
                  <div className="flex items-end gap-1 overflow-hidden">
                    {APPS.map((a, i) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setApp(i)}
                        className={`flex items-center gap-1.5 rounded-t-lg px-2.5 py-1.5 text-[9px] transition-colors ${
                          i === app
                            ? "bg-brand-panel text-white"
                            : "text-brand-muted hover:text-brand-text"
                        }`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: a.dot }}
                        />
                        <span className="max-w-[64px] truncate">{a.label}</span>
                      </button>
                    ))}
                    <span className="pb-1.5 pl-0.5 text-brand-muted">
                      <Plus size={11} />
                    </span>
                  </div>
                </div>

                {/* Browser: address bar */}
                <div className="flex items-center gap-2 border-b border-brand-border bg-brand-panel px-2.5 py-1.5">
                  <span className="flex gap-1 text-brand-muted/50">
                    <ArrowLeft size={11} />
                    <ArrowRight size={11} />
                    <RotateCw size={10} />
                  </span>
                  <div className="flex flex-1 items-center gap-1.5 rounded-md bg-brand-bg/70 px-2 py-1 text-[8px] text-brand-muted">
                    <Lock size={8} className="text-emerald-400" />
                    {APPS[app].url}
                  </div>
                  <MoreVertical size={11} className="text-brand-muted/50" />
                </div>

                {/* Screen reflection */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-white/[0.05] to-transparent" />

                {/* Active app — keyed so entry animations replay on switch */}
                <div
                  key={app}
                  className="hero-scene-in relative h-[196px] sm:h-[228px]"
                >
                  <LaptopApp app={app} />
                </div>
              </div>
            </div>
          </div>

          {/* Hinge + tapered aluminum base with rounded lip */}
          <div className="relative mx-auto h-[7px] w-[101%] rounded-b-[3px] bg-gradient-to-b from-[#3a3a42] to-[#101015]" />
          <div className="relative mx-auto -mt-px h-2.5 w-[108%] -translate-x-[3.7%] rounded-b-[10px] bg-gradient-to-b from-[#26262c] via-[#16161b] to-[#08080a] shadow-[0_8px_16px_-6px_rgba(0,0,0,0.8)]">
            <span className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-lg bg-black/60" />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* PHONE — secondary, realistic metal frame                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="device-stack-layer device-stack-mobile absolute bottom-9 left-0 w-[118px] sm:left-1">
        <div
          className="relative rounded-[1.9rem] bg-gradient-to-b from-[#3a3a42] to-[#0a0a0d] p-[3px]"
          style={{
            WebkitBoxReflect:
              "below 2px linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0) 32%)",
          }}
        >
          {/* Antenna lines + side buttons on the metal edge */}
          <span className="absolute -left-[1px] top-7 h-[2px] w-[3px] bg-black/50" />
          <span className="absolute -left-[1px] bottom-10 h-[2px] w-[3px] bg-black/50" />
          <span className="absolute -right-[1px] top-10 h-[2px] w-[3px] bg-black/50" />
          <span className="absolute -left-[3px] top-14 h-8 w-[3px] rounded-l bg-[#2a2a30]" />
          <span className="absolute -right-[3px] top-11 h-11 w-[3px] rounded-r bg-[#2a2a30]" />

          <div className="relative overflow-hidden rounded-[1.65rem] border border-black/50 bg-brand-panel">
            {/* Dynamic island */}
            <span className="absolute left-1/2 top-2 z-20 h-3.5 w-12 -translate-x-1/2 rounded-full bg-black" />

            {/* Status bar */}
            <div className="flex items-center justify-between px-3 pb-1 pt-2.5 text-[8px] font-medium text-white/80">
              <span>9:41</span>
              <StatusIcons />
            </div>

            {/* Screen reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-white/[0.05] to-transparent" />

            <div key={app} className="hero-scene-in px-2.5 pb-2 pt-2">
              <PhoneScreen app={app} />
            </div>

            <div className="mx-auto mb-2 mt-1 h-1 w-10 rounded-full bg-white/25" />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Tab indicators                                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="absolute -bottom-1 right-3 z-30 flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg/80 px-3 py-2 backdrop-blur">
        {APPS.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setApp(i)}
            aria-label={`Show ${a.label}`}
            className="group flex items-center"
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === app
                  ? "w-5 bg-brand-red"
                  : "w-1.5 bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroShowcase;
