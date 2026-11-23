import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Menu, MoreHorizontal, X } from "lucide-react";
import Logo from "./Logo";

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

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`cx-navbar ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="cx-nav-shell">
        <Link to="/" className="cx-nav-brand" aria-label="CairoX home">
          <Logo size={29} />
          <span>Product studio</span>
        </Link>

        <nav className="cx-desktop-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <a href="/#process">Process</a>
          <a href="/#about">About</a>
        </nav>

        <div className="cx-nav-actions">
          <Link to="/contact" className="cx-nav-cta">Start a Project <ArrowRight size={15} /></Link>
          <button type="button" className="cx-nav-more" aria-label="More options"><MoreHorizontal size={19} /></button>
        </div>

        <button type="button" className="cx-mobile-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          <Menu size={21} className={open ? "is-hidden" : ""} />
          <X size={21} className={open ? "" : "is-hidden"} />
        </button>
      </div>

      <div className={`cx-mobile-menu ${open ? "is-open" : ""}`}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <a href="/#process" onClick={() => setOpen(false)}>Process</a>
        <a href="/#about" onClick={() => setOpen(false)}>About</a>
        <Link to="/contact" className="cx-nav-cta">Start a Project <ArrowRight size={15} /></Link>
      </div>
    </header>
  );
};

export default Navbar;
