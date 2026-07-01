import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CursorFollower from "./components/CursorFollower";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

import { projects } from "./data/projects";

/**
 * Routing strategy for project pages
 * ------------------------------------------------------------------
 * Each project lives in src/data/projects.ts. To give a project a
 * custom landing page:
 *   1. Create a component in src/projectPages/, e.g. DentamizeLanding.tsx
 *   2. Import it in src/data/projects.ts
 *   3. Set `customLandingPage: DentamizeLanding` on that project entry
 *
 * The loop below renders the custom component for each project that
 * defines one. Any project without a custom landing page falls
 * through to the generic /projects/:slug route handled by ProjectDetail.
 */
const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-brand-bg text-brand-text">
      <ScrollToTop />
      <CursorFollower />
      <PageTransition />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />

          {/* Custom landing pages (per-project) take precedence */}
          {projects
            .filter((p) => p.customLandingPage)
            .map((p) => {
              const Custom = p.customLandingPage!;
              return (
                <Route
                  key={p.slug}
                  path={`/projects/${p.slug}`}
                  element={<Custom />}
                />
              );
            })}

          {/* Generic detail page — fallback for any project slug */}
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
