import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Button from "../components/Button";
import { getProjectBySlug } from "../data/projects";
import NotFound from "./NotFound";

/**
 * Generic project detail page.
 *
 * The router (App.tsx) renders a project's `customLandingPage` component when
 * one is defined on the project. This page is the fallback for any project
 * that does not yet have a custom landing page.
 */
const ProjectDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFound />;
  }

  const accent = project.accentColor ?? "#E11D2A";
  const gallery = project.gallery ?? [];

  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-grid-dark bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] opacity-60" />
        <div className="absolute inset-0 bg-radial-red" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className="mt-8">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-red">
              {project.category}
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              {project.name}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-brand-muted leading-relaxed">
              {project.shortDescription}
            </p>
            {project.previewUrl && (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-bg transition-colors hover:bg-brand-red hover:text-white"
              >
                Preview live site
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          {project.image && (
            <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 shadow-panel">
              <div className="flex items-center gap-3 border-b border-brand-border bg-brand-bg/70 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="min-w-0 flex-1 rounded-full border border-brand-border bg-brand-panel px-3 py-1.5 text-[11px] font-medium text-brand-muted">
                  {project.previewUrl ?? `/projects/${project.slug}`}
                </div>
                <span
                  className="hidden rounded-full px-3 py-1 text-[11px] font-semibold text-white sm:inline-flex"
                  style={{ backgroundColor: accent }}
                >
                  Case study
                </span>
              </div>
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.imageAlt ?? project.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-[260px] w-full object-cover object-top sm:h-[420px] lg:h-[520px]"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
                  style={{ backgroundColor: accent }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-bg to-transparent" />
              </div>
            </div>
          )}

          {gallery.length > 1 && (
            <div className="grid gap-5 md:grid-cols-2">
              {gallery.map((shot) => (
                <div
                  key={shot.src}
                  className="overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 p-2"
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-56 w-full rounded-xl object-cover object-top sm:h-72"
                  />
                  <p className="px-2 pt-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-muted">
                    {shot.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="rounded-2xl border border-brand-border bg-brand-panel/70 p-7 sm:p-9">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
              Overview
            </h2>
            <p className="mt-4 text-brand-muted leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Features */}
          <div className="rounded-2xl border border-brand-border bg-brand-panel/70 p-7 sm:p-9">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
              Key features
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-brand-red/40 bg-brand-red/10 text-brand-red">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-brand-text leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="rounded-2xl border border-brand-border bg-brand-panel/70 p-7 sm:p-9">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
              Technologies
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-brand-border bg-brand-bg/60 px-3 py-1.5 text-sm text-brand-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 p-8 sm:p-10 text-center">
            <div className="absolute -top-32 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-brand-red/15 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Want something like {project.name}?
              </h3>
              <p className="mt-3 text-brand-muted max-w-2xl mx-auto">
                Tell us about your business and goals. We'll come back with a
                clear plan tailored to your scope.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button as="link" to="/contact" size="lg">
                  Start a similar project
                  <ArrowRight size={18} />
                </Button>
                <Button as="link" to="/portfolio" size="lg" variant="secondary">
                  <ArrowLeft size={16} />
                  Back to portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
