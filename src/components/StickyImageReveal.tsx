import type { LucideIcon } from "lucide-react";

export type StickyPanel = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent?: string;
};

type StickyImageRevealProps = {
  panels: StickyPanel[];
};

const StickyImageReveal = ({ panels }: StickyImageRevealProps) => {
  return (
    <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
      {panels.map((panel, index) => {
        const Icon = panel.icon;

        return (
          <article
            key={panel.id}
            className="group relative isolate overflow-hidden rounded-xl border border-brand-border bg-brand-panel/70 p-4 shadow-panel transition-colors duration-300 hover:border-brand-red/50 sm:rounded-2xl sm:p-8"
          >
            <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-15 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
            <div
              className="absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: panel.accent ?? "rgba(225,29,42,0.22)",
                opacity: index === 0 ? 0.9 : 0.55,
              }}
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-red/35 bg-brand-red/10 text-brand-red shadow-red-glow-sm sm:h-14 sm:w-14 sm:rounded-xl">
                  <Icon size={20} strokeWidth={1.6} className="sm:size-6" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.18em] text-brand-red sm:text-xs sm:tracking-[0.22em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <span className="mt-5 block text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red sm:mt-8 sm:text-xs sm:tracking-[0.22em]">
                {panel.eyebrow}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-white sm:mt-3 sm:text-3xl">
                {panel.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-muted sm:mt-4 sm:text-base">
                {panel.body}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default StickyImageReveal;
