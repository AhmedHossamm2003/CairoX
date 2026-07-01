import { Link } from "react-router-dom";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import Logo from "./Logo";
import { siteConfig, whatsappUrl, mailtoUrl } from "../data/siteConfig";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-brand-border bg-brand-bg">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 max-w-md">
            <Logo size={36} />
            <p className="mt-5 text-sm leading-relaxed text-brand-muted">
              {siteConfig.shortDescription} {" "}
              <span className="text-brand-text">Beyond limits.</span>
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-brand-muted hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-muted hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-brand-muted hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-muted hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={mailtoUrl()}
                  className="inline-flex items-center gap-2 text-brand-muted hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-brand-red" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-muted hover:text-white transition-colors"
                >
                  <MessageCircle size={16} className="text-brand-red" />
                  WhatsApp · {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-brand-muted">
                <MapPin size={16} className="text-brand-red" />
                {siteConfig.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-brand-border pt-6">
          <p className="text-xs text-brand-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-brand-muted">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
