import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers3,
  PenTool,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import Waves from "../components/Waves";

const services = [
  { icon: Code2, title: "Web & Business Systems", body: "Custom platforms, portals, and operational systems.", tone: "red" },
  { icon: Smartphone, title: "Mobile Apps", body: "iOS & Android experiences that users keep.", tone: "blue" },
  { icon: Sparkles, title: "AI Automation", body: "Practical AI tools that save time and remove manual work.", tone: "violet" },
  { icon: ShoppingBag, title: "E-commerce", body: "High-performance stores that convert.", tone: "green" },
];

const work = [
  { slug: "louve-store", name: "Louve Store", type: "Fashion", description: "Refined fashion commerce.", image: "/assets/louve-hero.png", accent: "#b58a63" },
  { slug: "clasrio", name: "Clasrio", type: "Education", description: "Smart educational SaaS platform.", image: "/assets/clasrio-logo.jpeg", accent: "#326ed0" },
  { slug: "dentamize", name: "Dentamize", type: "Dental clinic", description: "All-in-one dental clinic management platform.", image: "/assets/dentamize-dashboard.jpeg", accent: "#1e8cff" },
  { slug: "gawahergy", name: "Gawahergy", type: "Jewelry store", description: "Elite gold store management system.", image: "/assets/gawahergy-landing.png", accent: "#d9a72f" },
  { slug: "nutri-boost", name: "Nutri Boost", type: "Supplements", description: "Performance-focused e-commerce.", image: "/assets/nutri-boost-hero.png", accent: "#2ab56f" },
  { slug: "el-banan-coffee", name: "El Banan Coffee", type: "Coffee", description: "Premium coffee storefront.", image: "/assets/el-banan-hero.png", accent: "#9b5e47" },
];

const process = [
  { icon: Search, number: "01", title: "Discover", body: "Understand goals, users, and challenges." },
  { icon: Layers3, number: "02", title: "Plan", body: "Define scope, stack, and product roadmap." },
  { icon: PenTool, number: "03", title: "Design", body: "Turn ideas into clear, user-focused experiences." },
  { icon: Code2, number: "04", title: "Build", body: "Develop, test, and iterate with visibility." },
  { icon: Rocket, number: "05", title: "Launch", body: "Deploy, handoff, and provide ongoing support." },
];

const reasons = [
  { icon: ShieldCheck, title: "Product Thinking", body: "Business-first, user-focused decisions." },
  { icon: Layers3, title: "Technical Excellence", body: "Clean, scalable, and maintainable code." },
  { icon: Users, title: "Long-Term Partnership", body: "Ongoing support and product growth." },
];

const marqueeItems = [
  "Web Development",
  "Mobile Apps",
  "AI Automation",
  "E-Commerce Stores",
  "SaaS Platforms",
  "UI/UX Design",
  "Custom Dashboards",
  "API Integrations",
  "Cloud Deployment",
  "CRM Systems",
  "Landing Pages",
  "Product Strategy",
];

const SectionLabel = ({ children }: { children: string }) => (
  <p className="cx-section-label"><span />{children}</p>
);

const Home = () => {
  const [activeProject, setActiveProject] = useState(2);

  const moveProject = (direction: number) => {
    setActiveProject((current) => (current + direction + work.length) % work.length);
  };

  const projectOffset = (index: number) => {
    let offset = index - activeProject;
    if (offset > work.length / 2) offset -= work.length;
    if (offset < -work.length / 2) offset += work.length;
    return offset;
  };

  return (
    <div className="cx-home">
      <section className="cx-hero">
        <div className="cx-hero-haze" />
        <div className="cx-shell cx-hero-grid">
          <div className="cx-hero-copy">
            <p className="cx-eyebrow"><span />Digital product studio</p>
            <h1>Digital Products<br />Built for<br />Real <em>Impact.</em></h1>
            <p className="cx-hero-summary">
              We design, build, and scale web, mobile, and AI products<br className="hidden sm:block" />
              that solve real business problems and create measurable growth.
            </p>
            <div className="cx-hero-actions">
              <Link to="/contact" className="cx-button cx-button-primary">Start a Project <ArrowRight size={16} /></Link>
              <Link to="/portfolio" className="cx-button cx-button-ghost">See Our Work <Play size={13} /></Link>
            </div>
            <div className="cx-stats">
              <div><strong>50+</strong><span>Projects Delivered</span></div>
              <div><strong>20+</strong><span>Products Launched</span></div>
              <div><strong>98%</strong><span>Client Satisfaction</span></div>
            </div>
          </div>
          <div className="cx-hero-visual" aria-label="CairoX product studio laptop artwork">
            <img src="/assets/cairox-hero-laptop.png" alt="Laptop displaying the CairoX red X above dark rocks" />
          </div>
        </div>
      </section>

      <section className="cx-trust" aria-label="What we provide">
        <div className="cx-marquee">
          <div className="cx-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span className="cx-marquee-item" key={`${item}-${index}`}>
                {item}
                <i aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="cx-section cx-services-section" id="services">
        <div className="cx-shell cx-services-layout">
          <div className="cx-section-copy">
            <SectionLabel>What we do</SectionLabel>
            <h2>End-to-End<br />Product Development.</h2>
            <p>From idea to launch, we combine product thinking, design, and engineering to deliver solutions that work in the real world.</p>
            <Link to="/services" className="cx-button cx-button-ghost">Explore Services <ArrowRight size={15} /></Link>
          </div>
          <div className="cx-service-grid">
            {services.map(({ icon: Icon, title, body, tone }) => (
              <Link to="/services" key={title} className={`cx-service-card cx-service-${tone}`}>
                <Icon size={25} />
                <ArrowUpRight className="cx-service-arrow" size={15} />
                <h3>{title}</h3>
                <p>{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cx-work-section" id="work">
        <div className="cx-shell">
          <div className="cx-work-heading">
            <div><SectionLabel>Selected work</SectionLabel><h2>Proof through<br />product work.</h2></div>
            <Link to="/portfolio">View All Projects <ArrowRight size={16} /></Link>
          </div>
          <div className="cx-project-stage">
            <div className="cx-project-ring" />
            {work.map((project, index) => {
              const offset = projectOffset(index);
              const isActive = offset === 0;
              return (
                <div
                  key={project.slug}
                  className={`cx-project-card ${isActive ? "is-active" : ""}`}
                  style={{
                    "--project-offset": offset,
                    "--project-distance": Math.abs(offset),
                    "--project-accent": project.accent,
                    zIndex: 20 - Math.abs(offset),
                  } as CSSProperties}
                  onClick={() => !isActive && setActiveProject(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && !isActive) setActiveProject(index); }}
                  aria-label={`Show ${project.name}`}
                >
                  <div className="cx-project-media"><img src={project.image} alt="" /><span>{project.type}</span></div>
                  <div className="cx-project-info">
                    <h3>{project.name}</h3><p>{project.description}</p>
                    {isActive && <Link to={`/projects/${project.slug}`} className="cx-project-open" aria-label={`Open ${project.name}`}><ArrowUpRight size={20} /></Link>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cx-carousel-controls">
            <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project"><ChevronLeft size={20} /></button>
            <div>{work.map((project, index) => <button type="button" key={project.slug} onClick={() => setActiveProject(index)} className={index === activeProject ? "is-active" : ""} aria-label={`Show ${project.name}`} />)}</div>
            <button type="button" onClick={() => moveProject(1)} aria-label="Next project"><ChevronRight size={20} /></button>
          </div>
        </div>
      </section>

      <section className="cx-process-section" id="process">
        <div className="cx-shell cx-process-layout">
          <div className="cx-process-intro"><SectionLabel>Our process</SectionLabel><h2>A Focused,<br />Transparent Process.</h2><p>A clear path from first conversation to a successful launch.</p></div>
          <div className="cx-process-steps">
            {process.map(({ icon: Icon, number, title, body }) => (
              <div className="cx-process-step" key={title}><div className="cx-process-icon"><Icon size={22} /></div><strong>{number}<br />{title}</strong><p>{body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="cx-why-section" id="about">
        <div className="cx-why-art"><Waves /></div>
        <div className="cx-shell cx-why-layout"><div /><div className="cx-why-copy">
          <SectionLabel>Why CairoX</SectionLabel><h2>A Product Team<br />for Long-Term Growth.</h2>
          <p>We think beyond delivery. We build products that are usable, scalable, and aligned with your business goals.</p>
          <div className="cx-reasons">{reasons.map(({ icon: Icon, title, body }) => <div key={title}><span><Icon size={19} /></span><div><strong>{title}</strong><p>{body}</p></div></div>)}</div>
        </div></div>
      </section>

      <section className="cx-cta-wrap"><div className="cx-shell"><div className="cx-cta">
        <div><p><span />Ready to build?</p><h2>Let’s Turn Your Idea Into a Product.</h2></div>
        <div className="cx-cta-actions"><Link to="/contact" className="cx-button cx-button-primary">Start a Project <ArrowRight size={16} /></Link><a href="mailto:cairoxagency@gmail.com" className="cx-button cx-button-ghost"><CalendarDays size={16} /> Schedule a Call</a></div>
      </div></div></section>
    </div>
  );
};

export default Home;
