import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";

type NavItem = { label: string; to: string };

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-4 sm:pt-3 lg:pt-5"
    >
      <div
        className={`relative mx-auto flex h-14 max-w-7xl items-center justify-between overflow-hidden rounded-xl border px-3 transition-all duration-300 sm:h-16 sm:rounded-2xl sm:px-5 md:h-[76px] lg:h-[88px] lg:rounded-[1.35rem] lg:px-8 ${
          scrolled || open
            ? "border-brand-border bg-brand-bg/86 shadow-[0_18px_70px_-34px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-white/[0.08] bg-brand-bg/42 shadow-[0_16px_60px_-42px_rgba(225,29,42,0.45)] backdrop-blur-md"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.035] via-transparent to-brand-red/[0.045]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 hidden h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent md:block" />

        <NavLink
          to="/"
          className="group relative flex items-center gap-3 lg:gap-4"
          aria-label="CairoX home"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-brand-red/25 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-1 sm:rounded-xl sm:p-1.5 lg:rounded-2xl lg:p-2">
              <Logo size={28} className="sm:!h-8 lg:!h-11" />
            </div>
          </div>
          <span className="hidden h-8 w-px bg-gradient-to-b from-transparent via-brand-border to-transparent sm:block lg:h-11" />
          <span className="hidden lg:block">
            <span className="block font-display text-lg font-bold leading-none tracking-tight text-white">
              CairoX
            </span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-muted">
              Product studio
            </span>
          </span>
        </NavLink>

        <nav className="relative hidden items-center gap-1.5 rounded-full border border-brand-border bg-brand-panel/62 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] md:flex lg:gap-2 lg:p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group relative rounded-full px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 lg:px-5 lg:py-3 lg:text-[15px] ${
                  isActive
                    ? "bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_10px_26px_-20px_rgba(225,29,42,0.8)]"
                    : "text-brand-muted hover:bg-white/[0.04] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-1.5 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-brand-red transition-all duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="relative hidden md:block">
          <Button as="link" to="/contact" size="lg" className="group/cta h-12 px-5 lg:h-14 lg:px-6">
            Start a Project
            <ArrowUpRight
              size={17}
              className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
            />
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border bg-brand-panel/70 text-white transition-colors hover:border-brand-red/60 sm:h-10 sm:w-10 sm:rounded-xl md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto mt-2 max-w-7xl rounded-xl border border-brand-border bg-brand-bg/95 p-1.5 shadow-panel backdrop-blur-xl sm:rounded-2xl sm:p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:rounded-xl sm:px-4 sm:py-3 sm:text-base ${
                  isActive
                    ? "bg-brand-red/10 text-white"
                    : "text-brand-muted hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="px-1.5 pb-1.5 pt-2 sm:px-2 sm:pb-2 sm:pt-3">
            <Button as="link" to="/contact" size="md" className="w-full">
              Start a Project
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
