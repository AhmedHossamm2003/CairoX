import type { Service } from "../data/services";

type ServiceCardProps = {
  service: Service;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;
  return (
    <div className="group relative rounded-xl border border-brand-border bg-brand-panel/70 p-6 sm:p-7 transition-all duration-300 hover:border-brand-red/60 hover:shadow-red-glow-sm hover:-translate-y-0.5">
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent" />
      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-brand-border bg-brand-bg text-brand-red transition-colors duration-300 group-hover:border-brand-red/60 group-hover:text-white">
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold text-white tracking-tight">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted">
          {service.shortDescription}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
