import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) => {
  const alignment =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow ? (
        <div
          className={`inline-flex items-center gap-2 mb-4 text-xs font-medium uppercase tracking-[0.18em] text-brand-red ${
            align === "center" ? "" : ""
          }`}
        >
          <span className="h-px w-6 bg-brand-red/60" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
