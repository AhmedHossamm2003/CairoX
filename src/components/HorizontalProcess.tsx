import type { LucideIcon } from "lucide-react";

export type ProcessStep = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type HorizontalProcessProps = {
  steps: ProcessStep[];
};

const HorizontalProcess = ({ steps }: HorizontalProcessProps) => {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-20 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand-red/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-red">
              <span className="h-px w-6 bg-brand-red/60" />
              How we work
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white leading-[1.05] sm:text-4xl lg:text-5xl">
              A focused, transparent process.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base lg:justify-self-end">
            Five clear stages from first conversation to launch, with previews,
            scope decisions, and communication built into the work.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.title}
                className="group relative isolate overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 p-6 shadow-panel transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-red/50"
              >
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-red/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-red/35 bg-brand-red/10 text-brand-red">
                      <Icon size={22} strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.22em] text-brand-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <span className="mt-8 block font-mono text-[11px] tracking-[0.22em] text-brand-red">
                    STEP 0{index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default HorizontalProcess;
