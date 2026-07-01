import { Link } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  Code2,
  Compass,
  Database,
  FileText,
  LayoutTemplate,
  PenTool,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import WordReveal from "../components/WordReveal";
import RotatingWord from "../components/RotatingWord";
import Marquee from "../components/Marquee";
import StickyImageReveal from "../components/StickyImageReveal";
import HorizontalProcess from "../components/HorizontalProcess";

const rotatingFor = ["Startups", "Clinics", "Stores", "Founders", "Operators"];

const capabilityTicker = [
  "Web Applications",
  "Mobile Apps",
  "AI Automation",
  "Business Systems",
  "E-commerce",
  "Landing Pages",
];

const heroProof = [
  "Custom-built systems",
  "Fast iteration cycles",
  "Launch-ready handoff",
];

type BuildItem = {
  icon: LucideIcon;
  title: string;
  label: string;
  body: string;
  examples: string[];
  featured?: boolean;
};

const buildItems: BuildItem[] = [
  {
    icon: Code2,
    title: "Web & Business Systems",
    label: "Core product build",
    body: "Dashboards, portals, admin tools, booking systems, and custom workflows built around how your team actually operates.",
    examples: ["SaaS platforms", "CRM systems", "Operations dashboards"],
    featured: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    label: "iOS + Android",
    body: "Clean mobile experiences for customers, field teams, and internal operations.",
    examples: ["Customer apps", "Internal apps", "Flutter apps"],
  },
  {
    icon: Brain,
    title: "AI Automation",
    label: "Assistants + workflows",
    body: "Practical AI tools that answer questions, summarize work, and automate repetitive tasks.",
    examples: ["AI chatbots", "Internal copilots", "Smart workflows"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    label: "Stores that convert",
    body: "Product pages, checkout flows, and store setups tuned for speed, trust, and conversion.",
    examples: ["Shopify", "EasyOrders", "Custom stores"],
  },
];

const reasons = [
  {
    id: "business-first",
    icon: Zap,
    eyebrow: "01 - Strategy",
    title: "Business-first scope",
    body: "We start with the workflow, users, constraints, and success criteria before deciding what should be built.",
    accent: "rgba(225,29,42,0.28)",
  },
  {
    id: "clean-code",
    icon: Code2,
    eyebrow: "02 - Engineering",
    title: "Clean scalable code",
    body: "Typed architecture, maintainable structure, and foundations that can grow without a rewrite.",
    accent: "rgba(255,86,99,0.24)",
  },
  {
    id: "premium-ux",
    icon: PenTool,
    eyebrow: "03 - Product design",
    title: "Premium UI/UX",
    body: "Interfaces designed for real usage: clear, calm, fast to understand, and easy to operate repeatedly.",
    accent: "rgba(225,29,42,0.22)",
  },
  {
    id: "partnership",
    icon: ShieldCheck,
    eyebrow: "04 - Delivery",
    title: "Long-term support",
    body: "Clear communication, reliable releases, documentation, and support after launch.",
    accent: "rgba(255,86,99,0.20)",
  },
];

const processSteps = [
  {
    icon: Compass,
    title: "Discover",
    body: "Clarify users, goals, constraints, and what success should look like before scope is locked.",
  },
  {
    icon: Sparkles,
    title: "Plan",
    body: "Define milestones, product direction, stack, and the fastest path to a useful first release.",
  },
  {
    icon: PenTool,
    title: "Design",
    body: "Map flows, screens, and visual systems so the product feels obvious before development starts.",
  },
  {
    icon: Code2,
    title: "Build",
    body: "Ship typed, tested iterations with previews you can click through throughout the project.",
  },
  {
    icon: Rocket,
    title: "Launch",
    body: "Deploy, hand off, document, and support the product so it keeps improving after go-live.",
  },
];

const deliverables = [
  {
    icon: LayoutTemplate,
    title: "Clickable previews",
    body: "Review the product while it is being built, not only when it is finished.",
  },
  {
    icon: FileText,
    title: "Clean documentation",
    body: "The important decisions, flows, and handoff notes stay understandable.",
  },
  {
    icon: Workflow,
    title: "Transparent communication",
    body: "Clear next steps, trade-offs, priorities, and release expectations.",
  },
  {
    icon: ShieldCheck,
    title: "Launch support",
    body: "Deployment, QA, and post-launch care are part of the delivery mindset.",
  },
];

const MobileBuildCards = () => (
  <div className="mt-9 sm:hidden">
    <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/55 p-4 shadow-panel">
      <div className="absolute inset-y-6 left-[31px] w-px bg-gradient-to-b from-brand-red via-brand-border to-transparent" />
      <div className="absolute -right-24 top-6 h-56 w-56 rounded-full bg-brand-red/15 blur-3xl" />
      <div className="relative space-y-4">
        {buildItems.map(({ icon: Icon, title, label, body }, index) => (
          <div key={title} className="grid grid-cols-[36px_1fr] gap-3">
            <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-red/40 bg-brand-bg text-brand-red shadow-red-glow-sm">
              <Icon size={17} strokeWidth={1.7} />
            </span>
            <div className="border-b border-brand-border/70 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">
                  {label}
                </p>
                <span className="font-mono text-[10px] tracking-[0.18em] text-brand-muted">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-1 font-display text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const mobileWorkItems = [
  {
    title: "Clasrio",
    body: "Smart educational SaaS platform for learning journeys and instructor workflows.",
    accent: "#31579f",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=520&q=80",
    alt: "Students collaborating around a laptop",
  },
  {
    title: "Dentamize",
    body: "Dental clinic management SaaS for reception, visits, payments, and reports.",
    accent: "#16a9e6",
    image: "/assets/dentamize-landing-gaioa.png",
    alt: "Dentamize clinic landing page",
  },
  {
    title: "Gawahergy",
    body: "Jewelry store management system for inventory, pricing, sales, and branches.",
    accent: "#e8c845",
    image: "/assets/gawahergy-landing.png",
    alt: "Gawahergy luxury gold store landing page",
  },
  {
    title: "Idea Wellness",
    body: "Fitness center management platform for members, attendance, packages, and finance.",
    accent: "#ff6a13",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=520&q=85",
    alt: "Premium gym interior",
  },
];

const MobileWorkList = () => (
  <div className="mt-9 grid gap-3 sm:hidden">
    {mobileWorkItems.map((item) => (
      <div key={item.title} className="relative grid grid-cols-[92px_1fr] overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 shadow-panel">
        <div className="relative min-h-[122px] overflow-hidden">
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundColor: item.accent }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-panel" />
        </div>
        <div className="relative p-4">
          <div
            className="absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl"
            style={{ backgroundColor: `${item.accent}33` }}
          />
          <div className="relative min-w-0">
            <span
              className="inline-flex rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: item.accent }}
            >
              Selected work
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.body}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MarqueeBand = () => {
  const items = capabilityTicker.map((item) => (
    <span
      key={item}
      className="inline-flex items-center gap-5 font-display text-sm font-semibold uppercase tracking-[0.22em] text-brand-muted"
    >
      <span>{item}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
    </span>
  ));

  return (
    <section className="relative overflow-hidden border-y border-brand-border bg-brand-panel/30 py-5">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 via-transparent to-brand-red/10" />
      <Marquee items={items} speed="normal" />
    </section>
  );
};

const CinematicXHero = () => {
  const [activated, setActivated] = useState(false);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x-light", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y-light", `${event.clientY - rect.top}px`);
  };

  const onLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--x-light", "50%");
    event.currentTarget.style.setProperty("--y-light", "50%");
  };

  const activate = () => {
    setActivated(true);
    window.setTimeout(() => setActivated(false), 1200);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  };

  const style = {
    "--x-light": "50%",
    "--y-light": "50%",
  } as CSSProperties;

  return (
    <div
      className={`cinematic-x-scene relative mx-auto mt-9 h-[330px] w-full max-w-[390px] select-none sm:mt-0 sm:h-[540px] sm:max-w-[640px] lg:mx-0 lg:max-w-[680px] ${
        activated ? "cinematic-x-activated" : ""
      }`}
      style={style}
      role="button"
      tabIndex={0}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={activate}
      onKeyDown={onKeyDown}
    >
      <div className="cinematic-x-cursor-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-full bg-brand-red/[0.11] blur-[90px] sm:bg-brand-red/[0.055] sm:blur-[120px]" />
      <div className="absolute left-1/2 top-[45%] h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-red/[0.16] bg-brand-red/[0.025] sm:border-brand-red/[0.08] sm:bg-brand-red/[0.008]" />
      <div className="absolute left-1/2 top-[45%] h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

      <div className="cinematic-x-orbit absolute left-1/2 top-[45%] h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-red/[0.10] sm:h-[470px] sm:w-[470px] sm:border-white/[0.045]">
        <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-red shadow-red-glow-sm" />
      </div>

      <div className="cinematic-x-object absolute left-1/2 top-[45%] h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2 sm:h-[430px] sm:w-[430px]">
        <svg
          className="cinematic-x-mark absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          role="img"
          aria-label="CairoX cinematic mark"
        >
          <defs>
            <linearGradient id="xGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
              <stop offset="20%" stopColor="#e11d2a" stopOpacity="0.72" />
              <stop offset="48%" stopColor="#3d080d" stopOpacity="0.68" />
              <stop offset="76%" stopColor="#b0121c" stopOpacity="0.64" />
              <stop offset="100%" stopColor="#ff7a84" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="xRedEdge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6872" stopOpacity="0.88" />
              <stop offset="45%" stopColor="#e11d2a" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#e11d2a" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="xCore" cx="50%" cy="45%" r="52%">
              <stop offset="0%" stopColor="#e11d2a" stopOpacity="0.34" />
              <stop offset="54%" stopColor="#e11d2a" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#e11d2a" stopOpacity="0" />
            </radialGradient>
            <filter id="xSoftShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#000000" floodOpacity="0.28" />
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#e11d2a" floodOpacity="0.12" />
            </filter>
          </defs>

          <circle cx="200" cy="200" r="118" fill="url(#xCore)" opacity="1" />
          <g filter="url(#xSoftShadow)">
            <g transform="rotate(42 200 200)">
              <rect x="171" y="34" width="58" height="332" rx="29" fill="url(#xGlass)" />
              <rect x="173.5" y="36.5" width="53" height="327" rx="26.5" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2" />
              <path d="M184 58 V338" stroke="url(#xRedEdge)" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
              <path d="M217 54 V168" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.22" />
            </g>
            <g transform="rotate(-42 200 200)">
              <rect x="171" y="34" width="58" height="332" rx="29" fill="url(#xGlass)" />
              <rect x="173.5" y="36.5" width="53" height="327" rx="26.5" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="2" />
              <path d="M216 62 V336" stroke="url(#xRedEdge)" strokeWidth="6" strokeLinecap="round" opacity="0.46" />
              <path d="M184 56 V172" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.20" />
            </g>
          </g>
          <circle cx="200" cy="200" r="42" fill="#e11d2a" opacity="0.16" />
        </svg>
        <div className="absolute inset-[30%] rounded-full bg-brand-red/[0.055] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/[0.065] blur-2xl sm:h-32 sm:w-32" />
      </div>

      <div className="cinematic-x-pulse pointer-events-none absolute left-1/2 top-[45%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-red/40 opacity-0" />

      <div className="absolute bottom-16 left-1/2 h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-10 left-1/2 h-8 w-[48%] -translate-x-1/2 rounded-[50%] bg-black/24 blur-2xl" />

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-brand-red/20 bg-brand-bg/75 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-brand-muted backdrop-blur sm:bottom-4 sm:gap-3 sm:px-4 sm:text-[10px] sm:tracking-[0.22em]">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
        {activated ? "Beyond limits" : "CairoX systems studio"}
      </div>
    </div>
  );
};

const ServicePreview = ({ active }: { active: number }) => {
  if (active === 1) {
    return (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-brand-border bg-brand-bg p-6">
        <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="relative mx-auto max-w-[210px] rounded-[2rem] border border-brand-red/25 bg-gradient-to-b from-[#34343b] to-[#09090b] p-2 shadow-red-glow-sm">
          <div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-brand-panel p-4">
            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-white/20" />
            <div className="flex items-center justify-between">
              <Smartphone size={20} className="text-brand-red" />
              <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-400">
                LIVE
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
              Field App
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-brand-muted">
              Tasks, customer records, notifications, and offline-ready workflows.
            </p>
            <div className="mt-6 space-y-3">
              {["Booking confirmed", "Route assigned", "Client updated"].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-bg/80 px-3 py-2"
                  style={{ animation: `hero-row-in 0.45s ease-out ${index * 0.08}s backwards` }}
                >
                  <span className="text-xs text-brand-text">{item}</span>
                  <Check size={14} className="text-brand-red" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (active === 2) {
    return (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-brand-border bg-brand-bg p-6">
        <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-20" />
        <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="relative flex h-full flex-col rounded-2xl border border-brand-border bg-brand-panel/80 p-5 shadow-panel">
          <div className="mb-5 flex items-center gap-3 border-b border-brand-border pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red text-white">
              <Brain size={22} />
            </div>
            <div>
              <p className="text-xs text-brand-muted">Automation console</p>
              <h3 className="font-display text-xl font-bold text-white">AI assistant</h3>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-3">
            <p className="ml-auto max-w-[72%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-3 text-sm text-brand-text">
              Summarize today's leads.
            </p>
            <p className="max-w-[84%] rounded-2xl rounded-bl-sm bg-brand-red px-4 py-3 text-sm leading-relaxed text-white">
              18 hot leads found. 4 are ready for calls. Draft follow-ups?
            </p>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {["Qualify", "Summarize", "Draft"].map((item) => (
              <span key={item} className="rounded-full border border-brand-border px-3 py-2 text-center text-xs text-brand-muted">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (active === 3) {
    return (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-brand-border bg-brand-bg p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-transparent" />
        <div className="relative rounded-2xl border border-brand-border bg-brand-panel/80 p-5 shadow-panel">
          <div className="mb-5 flex items-center justify-between border-b border-brand-border pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-muted">Checkout flow</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">NOVA Store</h3>
            </div>
            <ShoppingBag size={24} className="text-brand-red" />
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
            <div className="space-y-3">
              {["Premium product page", "Fast cart drawer", "Payment connected"].map((item) => (
                <div key={item} className="rounded-xl border border-brand-border bg-brand-bg/70 p-4">
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-brand-red" />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-brand-red/30 bg-brand-red/10 p-4">
              <p className="text-xs text-brand-muted">Cart total</p>
              <p className="mt-2 font-display text-4xl font-bold text-white">$428</p>
              <button className="mt-6 h-11 w-full rounded-lg bg-brand-red text-sm font-semibold text-white">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-brand-border bg-brand-bg p-6">
      <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="relative rounded-2xl border border-brand-border bg-brand-panel/80 p-5 shadow-panel">
        <div className="mb-5 flex items-center justify-between border-b border-brand-border pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-muted">Operations dashboard</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">CairoX OS</h3>
          </div>
          <Code2 size={24} className="text-brand-red" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-brand-border bg-brand-bg/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Workflow activity</p>
              <Database size={18} className="text-brand-red" />
            </div>
            <div className="flex h-36 items-end gap-2">
              {[48, 70, 56, 82, 64, 94, 76].map((height) => (
                <span
                  key={height}
                  className="flex-1 rounded-t bg-gradient-to-t from-brand-red/25 to-brand-red"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {["Admin dashboard", "Role permissions", "Reports"].map((item) => (
              <div key={item} className="rounded-xl border border-brand-border bg-brand-bg/70 p-4">
                <p className="text-sm font-semibold text-white">{item}</p>
                <p className="mt-1 text-xs text-brand-muted">Production-ready</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceConsole = () => {
  const [active, setActive] = useState(0);
  const activeItem = buildItems[active];
  const ActiveIcon = activeItem.icon;

  return (
    <div className="mt-14 overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/55 shadow-panel">
      <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
        <div className="border-b border-brand-border bg-brand-bg/35 p-4 lg:border-b-0 lg:border-r sm:p-5">
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">
              Service console
            </span>
            <span className="font-mono text-[11px] text-brand-muted">
              0{active + 1}/04
            </span>
          </div>

          <div className="space-y-2">
            {buildItems.map((item, index) => {
              const Icon = item.icon;
              const selected = index === active;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`group w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                    selected
                      ? "border-brand-red/50 bg-brand-red/10 shadow-red-glow-sm"
                      : "border-brand-border bg-brand-panel/55 hover:border-brand-red/30 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        selected
                          ? "border-brand-red/50 bg-brand-red text-white"
                          : "border-brand-border bg-brand-bg text-brand-red"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-lg font-bold tracking-tight text-white">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[11px] text-brand-muted">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative p-4 sm:p-5 lg:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg/70 px-3 py-1 text-xs text-brand-muted">
                <ActiveIcon size={14} className="text-brand-red" />
                Active preview
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {activeItem.title}
              </h3>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-red"
            >
              Explore services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <ServicePreview active={active} />

          <div className="mt-5 flex flex-wrap gap-2">
            {activeItem.examples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-brand-border bg-brand-bg/70 px-3 py-1.5 text-xs font-medium text-brand-text"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ClasrioCaseStudyCard = () => {
  const features = [
    "Student and teacher dashboards",
    "Smart course and lesson management",
    "Progress tracking and performance insights",
    "AI-assisted learning workflows",
  ];

  const stockImages = [
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      alt: "Students collaborating around a laptop",
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=520&q=80",
      alt: "Modern classroom with students learning",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=520&q=80",
      alt: "Online learning dashboard on a laptop",
    },
  ];

  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 shadow-panel transition-colors duration-300 hover:border-[#31579f]/80 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative min-h-[480px] overflow-hidden border-b border-brand-border bg-[#061226] lg:border-b-0 lg:border-r">
        <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_72%)]" />
        <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-[#31579f]/35 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#8fb0ff]/12 blur-3xl" />

        <div className="absolute left-6 top-6 z-10 overflow-hidden rounded-2xl border border-white/10 bg-[#31579f] p-4 shadow-panel">
          <img
            src="/assets/clasrio-logo.jpeg"
            alt="Clasrio logo"
            className="h-14 w-44 rounded-xl object-cover"
          />
        </div>

        <div className="absolute inset-x-5 bottom-5 top-28 overflow-hidden rounded-2xl border border-white/10 bg-[#eaf1ff] shadow-[0_26px_80px_-34px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1 sm:inset-x-6 sm:bottom-6">
          <div className="flex items-center justify-between border-b border-[#31579f]/15 bg-white px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="rounded-full bg-[#31579f]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#31579f]">
              clasrio.app
            </span>
          </div>

          <div className="relative h-full min-h-[345px] overflow-hidden">
            <img
              src={stockImages[0].src}
              alt={stockImages[0].alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#31579f]/58 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#061226]/20 via-[#31579f]/20 to-[#061226]/85" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#061226] to-transparent" />

            <div className="absolute left-4 top-4 rounded-2xl border border-white/20 bg-white/92 p-4 shadow-[0_24px_55px_-28px_rgba(6,18,38,0.9)] backdrop-blur sm:left-6 sm:top-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#31579f]">
                Smart education SaaS
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-[#071225]">
                Learning command center
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["Students", "12.4k"],
                  ["Courses", "86"],
                  ["Completion", "91%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[#31579f]/12 bg-[#f5f8ff] p-3">
                    <p className="text-[10px] font-medium text-[#64748b]">{label}</p>
                    <p className="mt-1 font-display text-lg font-bold text-[#071225]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-5 left-4 right-4 grid gap-3 sm:left-6 sm:right-6 sm:grid-cols-[1fr_0.9fr]">
              <div className="rounded-2xl border border-white/15 bg-[#071225]/84 p-4 shadow-panel backdrop-blur">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Weekly progress</p>
                  <Brain size={18} className="text-[#8fb0ff]" />
                </div>
                <div className="flex h-20 items-end gap-2">
                  {[42, 66, 58, 80, 72, 92, 84].map((height) => (
                    <span
                      key={height}
                      className="flex-1 rounded-t bg-gradient-to-t from-[#31579f]/60 to-[#d8e5ff]"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden grid-cols-2 gap-3 sm:grid">
                {stockImages.slice(1).map((image, index) => (
                  <div
                    key={image.src}
                    className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-panel"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full min-h-[128px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#31579f]/40 mix-blend-multiply" />
                    <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-[#071225]/78 px-3 py-2 backdrop-blur">
                      <p className="text-[11px] font-semibold text-white">
                        {index === 0 ? "Live classes" : "Online workspace"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-5 top-24 hidden w-52 rounded-2xl border border-white/18 bg-white/90 p-3 shadow-panel backdrop-blur md:block">
              {["AI quiz review", "Teacher feedback", "Parent report"].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-[#31579f]/10 py-2 last:border-b-0">
                  <span className="text-xs font-semibold text-[#071225]">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-[#31579f]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/10 bg-[#071225]/82 px-4 py-2 shadow-panel backdrop-blur sm:block">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#bcd0ff]">
            Real learning experience
          </span>
        </div>
      </div>

      <div className="relative p-7 sm:p-9">
        <span className="inline-flex rounded-full border border-[#31579f]/50 bg-[#31579f]/15 px-3 py-1 text-xs font-medium text-[#9bb7ff]">
          Case study concept
        </span>
        <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white">
          Clasrio
        </h3>
        <p className="mt-3 text-sm uppercase tracking-[0.18em] text-brand-muted">
          Smart educational SaaS platform
        </p>
        <p className="mt-5 text-base leading-relaxed text-brand-muted">
          A polished education platform concept built around learning journeys,
          instructor workflows, progress visibility, and AI-assisted study
          operations.
        </p>

        <div className="mt-7 grid gap-3">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-sm text-brand-text">
              <Check
                size={15}
                className="mt-0.5 flex-shrink-0 text-[#8fb0ff]"
                strokeWidth={2.4}
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {["SaaS", "Education", "AI workflows", "Dashboards"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-border bg-brand-bg/70 px-3 py-1.5 text-xs font-medium text-brand-text"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

const DentamizeProjectBrowser = () => {
  const features = [
    "Reception dashboard with queue and payments",
    "Doctor and branch-specific clinic workflows",
    "Financial reports, income tracking, and refunds",
    "Conversion-focused landing pages for clinics",
  ];

  return (
    <Link
      to="/projects/dentamize"
      className="group relative block overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-bg shadow-panel transition-colors duration-300 hover:border-[#16a9e6]/70"
    >
      <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_72%)]" />
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#0047ff]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#16c8e8]/14 blur-3xl" />

      <div className="relative grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_360px] lg:p-8">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#eef4ff] shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-500">
                app.dentamize.com/dashboard
              </div>
              <span className="hidden rounded-full bg-[#16a9e6]/10 px-3 py-1 text-[11px] font-semibold text-[#147fbd] sm:inline-flex">
                Clinic SaaS
              </span>
            </div>
            <div className="relative">
              <img
                src="/assets/dentamize-landing-gaioa.png"
                alt="Dentamize clinic landing page"
                className="h-[290px] w-full object-cover object-top sm:h-[390px] lg:h-[430px]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#eef4ff] to-transparent" />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Dashboard",
                src: "/assets/dentamize-dashboard.jpeg",
                alt: "Dentamize clinic management dashboard",
              },
              {
                label: "Reports",
                src: "/assets/dentamize-reports.jpeg",
                alt: "Dentamize financial reports dashboard",
              },
              {
                label: "Clinic website",
                src: "/assets/dentamize-landing-crown.png",
                alt: "Dentamize clinic website preview",
              },
            ].map((shot) => (
              <div
                key={shot.label}
                className="overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 p-2 transition-colors duration-300 group-hover:border-[#16a9e6]/35"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="h-24 w-full rounded-xl object-cover object-top"
                />
                <p className="px-1 pt-2 text-xs font-medium text-brand-muted">
                  {shot.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative lg:-ml-16 lg:self-center">
          <div className="rounded-2xl border border-brand-border bg-brand-panel/90 p-6 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-7">
            <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white p-3">
              <img
                src="/assets/dentamize-logo.png"
                alt="Dentamize logo"
                className="h-11 w-56 rounded-lg object-contain"
              />
            </div>

            <span className="inline-flex rounded-full border border-[#16a9e6]/40 bg-[#16a9e6]/10 px-3 py-1 text-xs font-medium text-[#8ce7ff]">
              Clinic management SaaS
            </span>

            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white">
              Dentamize
            </h3>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-brand-muted">
              Dental clinic operations platform
            </p>

            <p className="mt-5 text-sm leading-relaxed text-brand-muted">
              A complete SaaS platform for dental clinics, covering reception,
              patients, visits, payments, refunds, reports, lab requests, and
              conversion-focused clinic landing pages.
            </p>

            <div className="mt-7 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-sm text-brand-text">
                  <Check
                    size={15}
                    className="mt-0.5 flex-shrink-0 text-[#16c8e8]"
                    strokeWidth={2.4}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["React", "TypeScript", "Clinic SaaS", "Reports", "Landing pages"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-border bg-brand-bg/70 px-3 py-1.5 text-xs font-medium text-brand-text"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#8ce7ff]">
              View case study
              <ArrowUpRight size={16} />
            </div>
          </div>
        </aside>
      </div>
    </Link>
  );
};

const GawahergyProjectBrowser = () => {
  const features = [
    "Jewelry inventory and metal weight tracking",
    "Live prices, selected-day sales, and revenue reports",
    "Custom orders, customers, employers, and branch operations",
    "Luxury landing page for a premium gold store SaaS",
  ];

  const metrics = [
    ["Selected sales", "$311,860"],
    ["Monthly revenue", "$659,997"],
    ["Metal inventory", "178g"],
  ];

  return (
    <Link
      to="/projects/gawahergy"
      className="group relative block overflow-hidden rounded-[1.75rem] border border-[#d7b52d]/25 bg-[#070604] shadow-panel transition-colors duration-300 hover:border-[#e8c845]/70"
    >
      <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_72%)]" />
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#e3bf35]/18 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#8a6518]/24 blur-3xl" />

      <div className="relative grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_360px] lg:p-8">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-[#e8c845]/20 bg-[#11100c] shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-3 border-b border-[#e8c845]/20 bg-[#050504] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e8c845]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex flex-1 items-center rounded-full border border-[#e8c845]/20 bg-[#16130a] px-3 py-1.5 text-[11px] font-medium text-[#d9c46a]">
                app.gawahergy.com/dashboard
              </div>
              <span className="hidden rounded-full bg-[#e8c845]/12 px-3 py-1 text-[11px] font-semibold text-[#f2d85a] sm:inline-flex">
                Jewelry SaaS
              </span>
            </div>

            <div className="relative">
              <img
                src="/assets/gawahergy-landing.png"
                alt="Gawahergy luxury gold store landing page"
                className="h-[290px] w-full object-cover object-top sm:h-[390px] lg:h-[430px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#050504]/50 via-transparent to-[#e8c845]/10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#11100c] to-transparent" />
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-2xl border border-[#e8c845]/20 bg-[#11100c] p-2 transition-colors duration-300 group-hover:border-[#e8c845]/45">
              <img
                src="/assets/gawahergy-dashboard.png"
                alt="Gawahergy jewelry store management dashboard"
                className="h-32 w-full rounded-xl object-cover object-top sm:h-40"
              />
              <p className="px-1 pt-2 text-xs font-medium text-[#d9c46a]">
                Store operations dashboard
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {metrics.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#e8c845]/18 bg-[#11100c]/90 p-4"
                >
                  <p className="text-[11px] font-medium text-[#9c8b50]">{label}</p>
                  <p className="mt-2 font-display text-xl font-bold text-[#f3dc62]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="relative lg:-ml-16 lg:self-center">
          <div className="rounded-2xl border border-[#e8c845]/22 bg-[#0b0a07]/92 p-6 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7">
            <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-[#e8c845]/25 bg-[#11100c] px-4 py-3">
              <span className="h-9 w-9 rotate-45 rounded-md bg-gradient-to-br from-[#fff2a1] to-[#d4ad24] shadow-[0_0_24px_rgba(232,200,69,0.34)]" />
              <span className="font-display text-2xl font-bold text-[#f3dc62]">
                Gawahergy
              </span>
            </div>

            <span className="inline-flex rounded-full border border-[#e8c845]/40 bg-[#e8c845]/10 px-3 py-1 text-xs font-medium text-[#f2d85a]">
              Jewelry store management SaaS
            </span>

            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white">
              Gawahergy
            </h3>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#9c8b50]">
              Smart SaaS for gold and jewelry stores
            </p>

            <p className="mt-5 text-sm leading-relaxed text-brand-muted">
              A premium management system for jewelry stores, bringing sales,
              metal inventory, live pricing, customers, orders, expenses, and
              branches into one sharp operational dashboard.
            </p>

            <div className="mt-7 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-sm text-brand-text">
                  <Check
                    size={15}
                    className="mt-0.5 flex-shrink-0 text-[#f2d85a]"
                    strokeWidth={2.4}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["SaaS", "Jewelry", "Inventory", "Live prices", "Dashboard"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#e8c845]/18 bg-[#16130a] px-3 py-1.5 text-xs font-medium text-[#d9c46a]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#f2d85a]">
              View case study
              <ArrowUpRight size={16} />
            </div>
          </div>
        </aside>
      </div>
    </Link>
  );
};

const IdeaWellnessProjectBrowser = () => {
  const features = [
    "Member management, live reception, and check-ins",
    "Attendance logs, package catalogs, and partnerships",
    "Branch summaries, users, invitations, and operations",
    "Income, expenses, net profit, and performance reports",
  ];

  const metrics = [
    ["Active members", "17"],
    ["Check-ins", "21"],
    ["Profit margin", "100%"],
  ];

  return (
    <Link
      to="/projects/idea-wellness"
      className="group relative block overflow-hidden rounded-[1.75rem] border border-[#ff6a13]/25 bg-[#090807] shadow-panel transition-colors duration-300 hover:border-[#ff6a13]/70"
    >
      <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-12 [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_72%)]" />
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#ff6a13]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#42a5ff]/12 blur-3xl" />

      <div className="relative grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_360px] lg:p-8">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#f6f7fb] shadow-[0_24px_70px_-30px_rgba(0,0,0,0.92)] transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-500">
                app.ideawellness.com/dashboard
              </div>
              <span className="hidden rounded-full bg-[#ff6a13]/10 px-3 py-1 text-[11px] font-semibold text-[#ff6a13] sm:inline-flex">
                Fitness SaaS
              </span>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85"
                alt="Premium gym interior with orange accent lighting"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-[290px] w-full object-cover object-top sm:h-[390px] lg:h-[430px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#ff6a13]/24 mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#090807]/50 via-transparent to-[#ff6a13]/18" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f6f7fb] to-transparent" />
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-2xl border border-[#ff6a13]/22 bg-brand-panel/70 p-2 transition-colors duration-300 group-hover:border-[#ff6a13]/45">
              <img
                src="/assets/idea-wellness-dashboard.png"
                alt="Idea Wellness fitness center dashboard"
                className="h-32 w-full rounded-xl object-cover object-top sm:h-40"
              />
              <p className="px-1 pt-2 text-xs font-medium text-[#ffb27c]">
                Management dashboard
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {metrics.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#ff6a13]/18 bg-brand-panel/90 p-4"
                >
                  <p className="text-[11px] font-medium text-brand-muted">{label}</p>
                  <p className="mt-2 font-display text-xl font-bold text-[#ff8a3d]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="relative lg:-ml-16 lg:self-center">
          <div className="rounded-2xl border border-[#ff6a13]/22 bg-brand-panel/92 p-6 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-7">
            <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff7a1a] to-[#8e8a7e] p-3">
              <img
                src="/assets/idea-wellness-logo.png"
                alt="Idea Wellness logo"
                className="h-16 w-36 rounded-lg object-cover"
              />
            </div>

            <span className="inline-flex rounded-full border border-[#ff6a13]/40 bg-[#ff6a13]/10 px-3 py-1 text-xs font-medium text-[#ffb27c]">
              Fitness center management SaaS
            </span>

            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white">
              Idea Wellness
            </h3>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-brand-muted">
              Smart operations for gyms and wellness centers
            </p>

            <p className="mt-5 text-sm leading-relaxed text-brand-muted">
              A management system for fitness centers that brings members,
              reception, attendance, packages, branches, users, and financial
              performance into one clear operating dashboard.
            </p>

            <div className="mt-7 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-sm text-brand-text">
                  <Check
                    size={15}
                    className="mt-0.5 flex-shrink-0 text-[#ff8a3d]"
                    strokeWidth={2.4}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Fitness SaaS", "Members", "Reception", "Reports", "Branches"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-border bg-brand-bg/70 px-3 py-1.5 text-xs font-medium text-brand-text"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#ffb27c]">
              View case study
              <ArrowUpRight size={16} />
            </div>
          </div>
        </aside>
      </div>
    </Link>
  );
};

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate flex min-h-[auto] items-center overflow-hidden border-b border-brand-border sm:min-h-[82vh]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 45% at 75% 48%, rgba(225,29,42,0.24) 0%, rgba(225,29,42,0.06) 42%, transparent 72%), linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 34%)",
            }}
          />
          <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_68%)]" />
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-red/30 to-transparent" />
          <div className="absolute right-[12%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-brand-bg" />
        </div>

        <div className="relative w-full pb-14 pt-24 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
              <div className="text-center lg:text-left">
                <Reveal>
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-border bg-brand-panel/60 px-3.5 py-1.5 text-[12px] backdrop-blur-sm sm:text-[13px]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                    </span>
                    <span className="text-brand-muted">CairoX Digital Product Studio</span>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <h1 className="mt-6 font-display text-[clamp(2.35rem,12vw,3.35rem)] font-bold leading-[0.98] tracking-tight text-white sm:mt-9 sm:text-[clamp(2.65rem,6vw,5.8rem)]">
                    Digital products
                    <br className="hidden sm:block" /> with{" "}
                    <span
                      className="animate-gradient-shift bg-clip-text text-transparent bg-[length:200%_auto]"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #E11D2A 0%, #FF5663 35%, #E11D2A 70%, #B0121C 100%)",
                      }}
                    >
                      sharper systems.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={140}>
                  <p className="mt-6 flex flex-wrap items-baseline justify-center gap-x-2 text-base font-medium text-brand-muted sm:text-lg lg:justify-start">
                    <span>Built for</span>
                    <RotatingWord
                      words={rotatingFor}
                      className="font-display font-semibold uppercase tracking-[0.04em] text-brand-red"
                    />
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-muted sm:mt-5 sm:text-base lg:mx-0">
                    CairoX creates premium web apps, mobile apps, AI workflows,
                    and business systems for teams that need software to feel
                    clear, fast, and built to last.
                  </p>
                </Reveal>

                <Reveal delay={280}>
                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row lg:justify-start">
                    <Button as="link" to="/contact" size="lg" className="group/cta w-full sm:w-auto">
                      Start Your Project
                      <ArrowRight size={18} className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                    </Button>
                    <Button as="link" to="/portfolio" size="lg" variant="secondary" className="w-full sm:w-auto">
                      View Our Work
                    </Button>
                  </div>
                </Reveal>

                <Reveal delay={360}>
                  <div className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:max-w-xl">
                    {heroProof.map((item) => (
                      <div
                        key={item}
                        className="rounded-lg border border-brand-border bg-brand-panel/45 px-3 py-2.5 text-xs font-medium text-brand-text backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-3"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <CinematicXHero />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand />

      <section className="relative py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-red">
                  <span className="h-px w-6 bg-brand-red/60" />
                  What we build
                </div>
              </Reveal>
              <WordReveal
                as="h2"
                text="Software that replaces friction with flow."
                className="mt-3 font-display text-2xl font-bold leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl"
              />
            </div>
            <Reveal delay={100}>
              <p className="max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-lg lg:justify-self-end">
                We focus on the product surfaces clients actually need: systems
                that organize work, mobile experiences users keep, AI that saves
                time, and stores that sell.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <MobileBuildCards />
            <div className="hidden sm:block">
              <ServiceConsole />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-brand-border py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-red">
                  <span className="h-px w-6 bg-brand-red/60" />
                  Selected work
                </div>
              </Reveal>
              <WordReveal
                as="h2"
                text="Proof through product work."
                className="mt-3 font-display text-2xl font-bold leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl"
              />
            </div>
            <Reveal>
              <Link
                to="/portfolio"
                className="hidden items-center gap-1.5 text-sm font-medium text-brand-muted transition-colors hover:text-white md:inline-flex"
              >
                View all projects
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <MobileWorkList />

          <div className="mt-14 hidden sm:block">
            <Reveal>
              <ClasrioCaseStudyCard />
            </Reveal>
          </div>

          <div className="mt-6 hidden sm:block">
            <Reveal>
              <DentamizeProjectBrowser />
            </Reveal>
          </div>

          <div className="mt-6 hidden sm:block">
            <Reveal>
              <GawahergyProjectBrowser />
            </Reveal>
          </div>

          <div className="mt-6 hidden sm:block">
            <Reveal>
              <IdeaWellnessProjectBrowser />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-t border-brand-border py-16 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-red">
                <span className="h-px w-6 bg-brand-red/60" />
                Why CairoX
              </div>
            </Reveal>
            <WordReveal
              as="h2"
              text="Built like a product team, not a template shop."
              className="mt-3 font-display text-2xl font-bold leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl"
            />
            <Reveal delay={100}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted">
                The work is structured around outcomes, clean implementation,
                and long-term maintainability.
              </p>
            </Reveal>
          </div>
          <StickyImageReveal panels={reasons} />
        </div>
      </section>

      <section className="relative border-t border-brand-border bg-brand-bg">
        <HorizontalProcess steps={processSteps} />
      </section>

      <section className="relative overflow-hidden border-t border-brand-border py-16 sm:py-32">
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-red">
                  <span className="h-px w-6 bg-brand-red/60" />
                  What you get
                </div>
              </Reveal>
              <WordReveal
                as="h2"
                text="A clearer build from first call to launch."
                className="mt-3 font-display text-2xl font-bold leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl"
              />
              <Reveal delay={100}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted">
                  The deliverables are designed to keep the project visible,
                  understandable, and useful before and after launch.
                </p>
              </Reveal>
            </div>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {deliverables.map(({ icon: Icon, title, body }, index) => (
                <Reveal key={title} delay={index * 70}>
                  <div className="rounded-xl border border-brand-border bg-brand-panel/70 p-4 shadow-panel transition-colors hover:border-brand-red/50 sm:rounded-2xl sm:p-6">
                    <Icon size={22} className="text-brand-red" strokeWidth={1.7} />
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-brand-border py-20 sm:py-36">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 100%, rgba(225,29,42,0.18) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-grid-dark bg-grid-32 opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]" />
          <div className="absolute -bottom-20 left-1/2 h-[280px] w-[820px] -translate-x-1/2 rounded-full bg-brand-red/20 blur-[120px] animate-pulse-slow" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <WordReveal
            as="h2"
            text="Have a product idea? Let's turn it into a working system."
            className="font-display text-[clamp(2rem,10vw,3rem)] font-bold leading-[1.04] tracking-tight text-white sm:text-[clamp(2.25rem,6vw,4.5rem)]"
          />
          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              Tell us what you are building. We will respond with a clear next
              step, a practical direction, and an honest path to launch.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button as="link" to="/contact" size="lg" className="group/cta w-full sm:w-auto">
                Start Your Project
                <ArrowRight size={18} className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Button>
              <Button as="link" to="/services" size="lg" variant="secondary" className="w-full sm:w-auto">
                View Services
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
