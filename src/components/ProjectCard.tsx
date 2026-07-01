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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 transition-all duration-500 hover:shadow-red-glow-sm">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.name}`}
        className="flex flex-1 flex-col"
      >
        {/* Visual */}
        <div className="relative aspect-[16/10] overflow-hidden">
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
          <div className="absolute left-5 top-5">
            <span className="rounded-full border border-white/15 bg-brand-bg/65 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm">
              {project.category.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
          {project.logo && (
            <div className="absolute right-5 top-5 overflow-hidden rounded-xl border border-white/15 bg-white p-2 shadow-panel">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                loading="lazy"
                className="h-9 w-28 object-contain"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-5 bottom-5 flex translate-y-3 flex-wrap gap-1.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
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

        <div className="relative flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-muted">
                {project.category}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {project.name}
              </h3>
            </div>
            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-border bg-brand-bg text-brand-text transition-all duration-300 group-hover:border-brand-red/60 group-hover:bg-brand-red/10 group-hover:text-brand-red">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            {project.shortDescription}
          </p>
        </div>
      </Link>

      {project.previewUrl && (
        <div className="border-t border-brand-border px-6 pb-6 pt-0">
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
