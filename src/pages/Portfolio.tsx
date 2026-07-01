import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

const Portfolio = () => {
  return (
    <div>
      <section className="relative overflow-hidden pb-12 pt-24 sm:pb-20 sm:pt-40">
        <div className="absolute inset-0 bg-grid-dark bg-grid-32 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute inset-0 bg-radial-red" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected work, across industries"
            description="A look at recent product work across SaaS platforms, clinic operations, education, jewelry retail, fitness center management, and premium e-commerce websites."
          />
        </div>
      </section>

      <section className="relative pb-16 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>

          <div className="relative mt-10 overflow-hidden rounded-xl border border-brand-border bg-brand-panel/70 p-5 text-center sm:mt-16 sm:rounded-2xl sm:p-12">
            <div className="absolute -top-32 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-brand-red/15 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-3xl">
                Have a project like one of these?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-brand-muted">
                We can adapt our approach to your industry, scale, and budget.
                Let's talk specifics.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button as="link" to="/contact" size="lg">
                  Start Your Project
                  <ArrowRight size={18} />
                </Button>
                <Button as="link" to="/services" size="lg" variant="secondary">
                  See our services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
