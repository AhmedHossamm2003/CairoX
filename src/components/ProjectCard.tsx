import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

/**
 * Deterministic accent angle per project so each tile feels distinct without
 * needing real screenshots. Replace the "visual" block with a real <img>
 * when you have one — the rest of the card layout stays the same.
 */
const hashSlug = (slug: string): number => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const hash = hashSlug(project.slug);
  const angle = hash % 360;
  const initial = project.name.charAt(0).toUpperCase();
  const accent = project.accentColor ?? "#E11D2A";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-panel/70 transition-all duration-500 hover:shadow-red-glow-sm sm:rounded-2xl">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.name}`}
        className="flex flex-1 flex-col"
      >
        {/* Visual */}
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt ?? project.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.07]"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.07]"
              style={{
                background: `linear-gradient(${angle}deg, rgba(225,29,42,0.45) 0%, rgba(176,18,28,0.15) 45%, rgba(8,8,10,0.9) 100%)`,
              }}
            />
          )}
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          {!project.image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[120px] sm:text-[150px] font-bold leading-none tracking-tighter text-white/15 transition-transform duration-700 group-hover:scale-110">
                {initial}
              </span>
            </div>
          )}
          <div
            className="absolute inset-0 opacity-55 mix-blend-multiply"
            style={{ backgroundColor: accent }}
          />
          <div className="absolute left-3 top-3 sm:left-5 sm:top-5">
            <span className="rounded-full border border-white/15 bg-brand-bg/65 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:px-3 sm:text-[11px] sm:tracking-[0.22em]">
              {project.category.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
          {project.logo && (
            <div className="absolute right-3 top-3 overflow-hidden rounded-lg border border-white/15 bg-white p-1.5 shadow-panel sm:right-5 sm:top-5 sm:rounded-xl sm:p-2">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                loading="lazy"
                className="h-7 w-20 object-contain sm:h-9 sm:w-28"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 flex-wrap gap-1.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:inset-x-5 sm:bottom-5 sm:flex">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-brand-border bg-brand-bg/80 px-2 py-0.5 text-[11px] text-brand-text backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-muted sm:text-xs sm:tracking-[0.22em]">
                {project.category}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white sm:mt-2 sm:text-2xl">
                {project.name}
              </h3>
            </div>
            <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-brand-border bg-brand-bg text-brand-text transition-all duration-300 group-hover:border-brand-red/60 group-hover:bg-brand-red/10 group-hover:text-brand-red sm:h-10 sm:w-10">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:mt-3">
            {project.shortDescription}
          </p>
        </div>
      </Link>

      {project.previewUrl && (
        <div className="border-t border-brand-border px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
          <a
            href={project.previewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-brand-bg transition-colors hover:bg-brand-red hover:text-white"
          >
            Preview site
            <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
