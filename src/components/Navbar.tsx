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
          className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border text-white transition-all duration-300 sm:h-10 sm:w-10 sm:rounded-xl md:hidden ${
            open
              ? "border-brand-red/60 bg-brand-red/15 shadow-red-glow-sm"
              : "border-brand-border bg-brand-panel/70 hover:border-brand-red/60"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu
            size={20}
            className={`absolute transition-all duration-300 ${
              open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            size={20}
            className={`absolute transition-all duration-300 ${
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`pointer-events-none md:hidden overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto mt-2 max-w-7xl origin-top overflow-hidden rounded-xl border border-brand-border bg-brand-bg/95 p-1.5 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-2xl sm:p-2 ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-3 scale-[0.985] opacity-0"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.045] via-transparent to-brand-red/[0.035]" />
          <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />

          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative block rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base ${
                  isActive
                    ? "bg-brand-red/10 text-white"
                    : "text-brand-muted hover:bg-white/5 hover:text-white"
                } ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`
              }
              style={{ transitionDelay: open ? `${90 + index * 45}ms` : "0ms" }}
            >
              {({ isActive }) => (
                <span className="flex items-center justify-between gap-3">
                  <span>{item.label}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-brand-red transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
          <div
            className={`px-1.5 pb-1.5 pt-2 transition-all duration-300 sm:px-2 sm:pb-2 sm:pt-3 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${120 + navItems.length * 45}ms` : "0ms" }}
          >
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
