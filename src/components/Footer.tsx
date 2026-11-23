import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import Logo from "./Logo";

const Footer = () => (
  <footer className="cx-footer">
    <div className="cx-footer-orbit" />
    <div className="cx-shell">
      <div className="cx-footer-grid">
        <div className="cx-footer-brand"><Logo size={38} /><p>Product studio</p></div>
        <div><h4>Company</h4><Link to="/#about">About</Link><Link to="/portfolio">Work</Link><Link to="/contact">Contact</Link></div>
        <div><h4>Services</h4><Link to="/services">Web Systems</Link><Link to="/services">Mobile Apps</Link><Link to="/services">AI Automation</Link><Link to="/services">E-commerce</Link></div>
        <div><h4>Follow Us</h4><div className="cx-socials"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a><a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={17} /></a></div></div>
      </div>
      <div className="cx-footer-bottom"><p>© {new Date().getFullYear()} CairoX. All rights reserved.</p><div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div></div>
    </div>
  </footer>
);

export default Footer;
