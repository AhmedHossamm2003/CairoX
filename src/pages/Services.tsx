import { useMemo, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Layers3,
  MousePointer2,
  Sparkles,
  Workflow,
} from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import { services } from "../data/services";

const serviceSignals = [
  ["Product strategy", "User flows", "Design system"],
  ["App UX", "Push flows", "Offline states"],
  ["Roles", "Reports", "Integrations"],
  ["Prompts", "Knowledge base", "Automation"],
  ["Catalog", "Checkout", "Retention"],
  ["Copy", "Creative", "Conversion"],
];

const serviceOutcomes = [
  "Clickable product direction",
  "Premium interface design",
  "Production-ready build",
  "Launch and handoff support",
];

const processMoments = [
  {
    label: "01",
    title: "Map the business",
    body: "We turn the messy goal into clear users, workflows, screens, and priorities.",
  },
  {
    label: "02",
    title: "Design the product surface",
    body: "The experience becomes tangible fast: navigation, states, interactions, and visual direction.",
  },
  {
    label: "03",
    title: "Build the core system",
    body: "We ship the important flows first, connect data, and harden the product for real use.",
  },
  {
    label: "04",
    title: "Launch with clarity",
    body: "Deployment, QA, documentation, and next-step recommendations arrive with the build.",
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: "72%", y: "28%" });
  const active = services[activeService];
  const ActiveIcon = active.icon;
  const activeSignals = serviceSignals[activeService] ?? serviceSignals[0];

  const featuredBuilds = useMemo(
    () => active.whatWeBuild.slice(0, 5),
    [active.whatWeBuild],
  );

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: `${event.clientX - rect.left}px`,
      y: `${event.clientY - rect.top}px`,
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setActiveService((index + 1) % services.length);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveService((index - 1 + services.length) % services.length);
    }
  };

  const spotlightStyle = {
    "--service-x": spotlight.x,
    "--service-y": spotlight.y,
  } as CSSProperties;

  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-brand-border pb-12 pt-24 sm:pb-24 sm:pt-40">
        <div className="absolute inset-0 -z-10 bg-grid-dark bg-grid-32 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_top,black_28%,transparent_72%)]" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(48% 52% at 50% 8%, rgba(225,29,42,0.22) 0%, rgba(225,29,42,0.05) 48%, transparent 78%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Services"
            title="Choose the product system your business needs next."
            description="Web apps, mobile apps, AI workflows, stores, and digital presence designed as premium operating surfaces, not template boxes."
          />

          <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-3">
            {serviceOutcomes.map((outcome) => (
              <span
                key={outcome}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-panel/70 px-3 py-1.5 text-[11px] font-medium text-brand-text backdrop-blur sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
              >
                <Check size={14} className="text-brand-red" />
                {outcome}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-28">
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-xl border border-brand-border bg-brand-panel/55 shadow-panel sm:rounded-2xl"
            style={spotlightStyle}
            onMouseMove={onMove}
          >
            <div className="pointer-events-none absolute inset-0 bg-grid-dark bg-grid-32 opacity-[0.07]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--service-x)_var(--service-y),rgba(225,29,42,0.18),transparent_68%)]" />
            <div className="relative grid lg:min-h-[720px] lg:grid-cols-[380px_1fr]">
              <aside className="border-b border-brand-border bg-brand-bg/45 p-3 backdrop-blur sm:p-4 lg:border-b-0 lg:border-r lg:p-5">
                <div className="mb-3 flex items-center justify-between px-1 sm:mb-5">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red sm:text-xs sm:tracking-[0.22em]">
                      Service menu
                    </p>
                    <h2 className="mt-1.5 font-display text-xl font-bold text-white sm:mt-2 sm:text-2xl">
                      What are we building?
                    </h2>
                  </div>
                  <MousePointer2 size={18} className="text-brand-muted sm:size-5" />
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Services">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    const selected = index === activeService;
                    return (
                      <button
                        key={service.slug}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls="service-detail"
                        onClick={() => setActiveService(index)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={`group flex min-h-[70px] w-full items-center gap-3 rounded-lg border p-3 text-left transition-all duration-300 sm:min-h-[82px] sm:rounded-xl sm:p-4 lg:min-h-[88px] lg:gap-4 ${
                          selected
                            ? "border-brand-red/60 bg-brand-red/[0.12] shadow-red-glow-sm"
                            : "border-transparent bg-white/[0.025] hover:border-brand-border hover:bg-white/[0.04]"
                        }`}
                      >
                        <span
                          className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 sm:h-12 sm:w-12 ${
                            selected
                              ? "border-brand-red bg-brand-red text-white"
                              : "border-brand-border bg-brand-panel text-brand-red group-hover:border-brand-red/50"
                          }`}
                        >
                          <Icon size={21} strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2 sm:gap-3">
                            <span className="font-display text-sm font-semibold text-white sm:text-base">
                              {service.title}
                            </span>
                            <ChevronRight
                              size={16}
                              className={`flex-shrink-0 transition-transform duration-300 ${
                                selected
                                  ? "translate-x-0.5 text-brand-red"
                                  : "text-brand-muted group-hover:translate-x-0.5"
                              }`}
                            />
                          </span>
                          <span className="mt-1 line-clamp-1 block text-[11px] leading-relaxed text-brand-muted sm:line-clamp-2 sm:text-xs">
                            {service.shortDescription}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div id="service-detail" role="tabpanel" className="relative min-w-0 p-4 sm:p-8 lg:p-10">
                <div className="grid gap-6 sm:gap-8 xl:grid-cols-[1fr_360px]">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/35 bg-brand-red/10 px-3 py-1.5 text-[11px] font-medium text-brand-red sm:text-xs">
                      <Sparkles size={14} />
                      Premium service blueprint
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4 sm:mt-6">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-muted sm:text-xs sm:tracking-[0.24em]">
                          0{activeService + 1} / 0{services.length}
                        </p>
                        <h1 className="mt-2 max-w-3xl font-display text-2xl font-bold leading-[1.06] text-white sm:mt-3 sm:text-5xl">
                          {active.title}
                        </h1>
                      </div>
                      <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-brand-red/35 bg-brand-red text-white shadow-red-glow-sm sm:h-16 sm:w-16 sm:rounded-2xl">
                        <ActiveIcon size={22} strokeWidth={1.7} className="sm:size-7" />
                      </div>
                    </div>

                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-muted sm:mt-6 sm:text-lg">
                      {active.longDescription}
                    </p>

                    <div className="mt-5 grid gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                      {activeSignals.map((signal) => (
                        <div
                          key={signal}
                          className="rounded-lg border border-brand-border bg-brand-bg/60 px-3 py-3 sm:rounded-xl sm:px-4 sm:py-4"
                        >
                          <Layers3 size={17} className="text-brand-red" />
                          <p className="mt-2 text-sm font-semibold text-white sm:mt-3">{signal}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-9">
                      <div className="mb-4 flex items-center gap-2">
                        <Workflow size={18} className="text-brand-red" />
                        <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                          What this can include
                        </h2>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {featuredBuilds.map((item) => (
                          <div
                            key={item}
                            className="group/build flex items-center justify-between gap-3 rounded-lg border border-brand-border bg-brand-bg/55 px-3 py-3 transition-colors duration-300 hover:border-brand-red/45 sm:rounded-xl sm:px-4"
                          >
                            <span className="flex items-center gap-3 text-sm text-brand-text">
                              <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-red/[0.12] text-brand-red">
                                <Check size={13} strokeWidth={2.4} />
                              </span>
                              {item}
                            </span>
                            <ArrowUpRight
                              size={15}
                              className="text-brand-muted transition-colors duration-300 group-hover/build:text-brand-red"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="overflow-hidden rounded-xl border border-brand-border bg-brand-bg/78 p-4 shadow-panel backdrop-blur sm:rounded-2xl sm:p-5 xl:sticky xl:top-24">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/70 to-transparent" />
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-muted">
                          Live shape
                        </p>
                        <span className="h-2 w-2 rounded-full bg-brand-red shadow-red-glow-sm" />
                      </div>

                      <div className="mt-4 rounded-xl border border-brand-border bg-brand-panel/80 p-3 sm:mt-6 sm:p-4">
                        <div className="mb-3 flex items-center justify-between border-b border-brand-border pb-3 sm:mb-4 sm:pb-4">
                          <div>
                            <p className="text-xs text-brand-muted">Project surface</p>
                            <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                              {active.title.split(" ")[0]} OS
                            </h3>
                          </div>
                          <ActiveIcon size={24} className="text-brand-red" />
                        </div>

                        <div className="space-y-3">
                          {activeSignals.map((signal, index) => (
                            <div key={signal} className="rounded-lg border border-brand-border bg-brand-bg/70 p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-white">{signal}</span>
                                <span className="text-xs text-brand-red">{92 - index * 7}%</span>
                              </div>
                              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full bg-brand-red"
                                  style={{ width: `${92 - index * 7}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
                        <div className="rounded-xl border border-brand-border bg-brand-panel/55 p-4">
                          <p className="text-xs text-brand-muted">Scope</p>
                          <p className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                            Focused
                          </p>
                        </div>
                        <div className="rounded-xl border border-brand-border bg-brand-panel/55 p-4">
                          <p className="text-xs text-brand-muted">Delivery</p>
                          <p className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                            Iterative
                          </p>
                        </div>
                      </div>

                      <Button as="link" to="/contact" className="mt-5 w-full group/cta">
                        Plan this service
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-brand-border bg-brand-panel/25 py-14 sm:py-24">
        <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-red">
                <span className="h-px w-6 bg-brand-red/60" />
                Build rhythm
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold leading-[1.08] text-white sm:mt-4 sm:text-4xl">
                The service feels premium because the process is controlled.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-muted sm:mt-5 sm:text-base">
                Each engagement is shaped around decisions, screens, and releases, so you see meaningful product progress instead of vague development updates.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {processMoments.map((moment) => (
                <div
                  key={moment.label}
                  className="rounded-xl border border-brand-border bg-brand-bg/70 p-4 transition-colors duration-300 hover:border-brand-red/45 sm:rounded-2xl sm:p-6"
                >
                  <p className="font-mono text-xs text-brand-red">{moment.label}</p>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {moment.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {moment.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-32">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 75% at 50% 100%, rgba(225,29,42,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-grid-dark bg-grid-32 opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Not sure which service fits your idea?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
            Tell us what you are trying to achieve. We will recommend the right scope, stack, and launch path.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as="link" to="/contact" size="lg" className="group/cta w-full sm:w-auto">
              Start Your Project
              <ArrowRight size={18} className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </Button>
            <Button as="link" to="/portfolio" size="lg" variant="secondary" className="w-full sm:w-auto">
              See our work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
