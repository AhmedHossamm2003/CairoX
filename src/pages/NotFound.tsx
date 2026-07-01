import { ArrowLeft, Home } from "lucide-react";
import Button from "../components/Button";

const NotFound = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 bg-grid-dark bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] opacity-60" />
      <div className="absolute inset-0 bg-radial-red" />

      <div className="relative mx-auto max-w-xl text-center px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-sm tracking-widest text-brand-red uppercase">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
          Page not found
        </h1>
        <p className="mt-5 text-brand-muted">
          The page you're looking for doesn't exist, or has been moved. Let's
          get you back on track.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button as="link" to="/" size="lg">
            <Home size={18} />
            Back to home
          </Button>
          <Button as="link" to="/portfolio" size="lg" variant="secondary">
            <ArrowLeft size={16} />
            View our work
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
