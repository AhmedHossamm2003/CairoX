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
          className={`mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-red sm:mb-4 sm:text-xs sm:tracking-[0.18em] ${
            align === "center" ? "" : ""
          }`}
        >
          <span className="h-px w-6 bg-brand-red/60" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
