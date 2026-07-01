import type { ComponentType } from "react";

export type Project = {
  /** URL-safe slug, also the route segment under /projects/:slug */
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  overview: string;
  features: string[];
  technologies: string[];
  image?: string;
  imageAlt?: string;
  gallery?: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  logo?: string;
  accentColor?: string;
  previewUrl?: string;
  customLandingPage?: ComponentType;
};

export const projects: Project[] = [
  {
    slug: "dentamize",
    name: "Dentamize",
    category: "Dental Clinic Management SaaS",
    shortDescription:
      "A full clinic management SaaS for dental practices, covering reception, patients, visits, payments, refunds, reports, and landing pages.",
    overview:
      "Dentamize is a clinic management platform designed specifically for dental practices. It unifies reception workflows, patient records, visits, payments, refunds, reports, lab requests, and conversion-focused clinic landing pages.",
    features: [
      "Reception dashboard with queue and payments",
      "Doctor and branch-specific clinic workflows",
      "Financial reports, income tracking, and refunds",
      "Patient records, visits, and lab requests",
      "Conversion-focused landing pages for clinics",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/assets/dentamize-landing-gaioa.png",
    imageAlt: "Dentamize clinic landing page",
    gallery: [
      {
        src: "/assets/dentamize-landing-gaioa.png",
        alt: "Dentamize clinic landing page",
        label: "Landing page",
      },
      {
        src: "/assets/dentamize-dashboard.jpeg",
        alt: "Dentamize clinic management dashboard",
        label: "Dashboard",
      },
      {
        src: "/assets/dentamize-reports.jpeg",
        alt: "Dentamize financial reports dashboard",
        label: "Reports",
      },
    ],
    logo: "/assets/dentamize-logo.png",
    accentColor: "#16a9e6",
  },
  {
    slug: "clasrio",
    name: "Clasrio",
    category: "Smart Educational SaaS Platform",
    shortDescription:
      "A polished education SaaS concept for learning journeys, instructor workflows, progress visibility, and AI-assisted study operations.",
    overview:
      "Clasrio is a smart educational SaaS platform built around clear learning journeys, teacher and student dashboards, lesson management, progress visibility, and AI-assisted learning workflows.",
    features: [
      "Student and teacher dashboards",
      "Smart course and lesson management",
      "Progress tracking and performance insights",
      "AI-assisted learning workflows",
      "Parent and instructor reporting flows",
    ],
    technologies: ["React", "TypeScript", "AI Workflows", "Dashboards", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=80",
    imageAlt: "Students collaborating around a laptop",
    logo: "/assets/clasrio-logo.jpeg",
    accentColor: "#31579f",
  },
  {
    slug: "gawahergy",
    name: "Gawahergy",
    category: "Jewelry Store Management SaaS",
    shortDescription:
      "A premium SaaS management system for jewelry stores, live prices, inventory, sales, customers, orders, branches, and reports.",
    overview:
      "Gawahergy is a smart SaaS management system for gold and jewelry stores. It brings metal inventory, live pricing, selected-day sales, monthly revenue, customers, custom orders, expenses, branches, and owners into one focused dashboard.",
    features: [
      "Jewelry inventory and metal weight tracking",
      "Live prices and selected-day sales reporting",
      "Custom orders, customers, expenses, and branches",
      "Monthly revenue and inventory status dashboards",
      "Luxury landing page for store positioning",
    ],
    technologies: ["React", "TypeScript", "SaaS", "Inventory", "Dashboards"],
    image: "/assets/gawahergy-landing.png",
    imageAlt: "Gawahergy luxury gold store landing page",
    gallery: [
      {
        src: "/assets/gawahergy-landing.png",
        alt: "Gawahergy luxury gold store landing page",
        label: "Luxury landing",
      },
      {
        src: "/assets/gawahergy-dashboard.png",
        alt: "Gawahergy jewelry store management dashboard",
        label: "Dashboard",
      },
    ],
    accentColor: "#e8c845",
  },
  {
    slug: "louve-store",
    name: "Louve Store",
    category: "Fashion E-commerce Website",
    shortDescription:
      "A refined e-commerce storefront for a handbag brand, built around elegant product storytelling, clean navigation, and a direct shopping flow.",
    overview:
      "Louve Store is a fashion e-commerce website for a handbag brand. The experience focuses on editorial product presentation, a minimal catalog structure, clear shopping actions, and a polished luxury feel across desktop and mobile.",
    features: [
      "Editorial hero section for brand storytelling",
      "Signature product presentation and product detail flow",
      "Minimal navigation for Home, Catalog, and Contact",
      "Responsive storefront layout for mobile shopping",
      "Live store preview connected to the production website",
    ],
    technologies: ["E-commerce", "Responsive Design", "Storefront", "Product Pages"],
    image: "/assets/louve-hero.png",
    imageAlt: "Louve fashion e-commerce homepage",
    gallery: [
      {
        src: "/assets/louve-hero.png",
        alt: "Louve fashion e-commerce hero section",
        label: "Editorial hero",
      },
      {
        src: "/assets/louve-product.png",
        alt: "Louve signature handbag product section",
        label: "Product story",
      },
    ],
    accentColor: "#b58a63",
    previewUrl: "https://xn--louv-epa.store/",
  },
  {
    slug: "frag",
    name: "Frag.",
    category: "Luxury Fragrance Website",
    shortDescription:
      "A cinematic perfume website built around dark luxury, gold accents, atmospheric storytelling, and a curated fragrance collection.",
    overview:
      "Frag. is a luxury fragrance website with a moody editorial direction. The experience uses cinematic imagery, gold typography, atmospheric visual language, and product-focused collection sections to make the brand feel mysterious, premium, and memorable.",
    features: [
      "Cinematic fragrance hero section",
      "Dark luxury visual system with gold accents",
      "Featured scents collection layout",
      "Story-led brand positioning and navigation",
      "Live preview connected to the production website",
    ],
    technologies: ["Brand Website", "Responsive Design", "Product Showcase", "Luxury UI"],
    image: "/assets/frag-hero.png",
    imageAlt: "Frag luxury fragrance website hero section",
    gallery: [
      {
        src: "/assets/frag-hero.png",
        alt: "Frag luxury perfume hero section",
        label: "Cinematic hero",
      },
      {
        src: "/assets/frag-products.png",
        alt: "Frag featured scents product collection",
        label: "Featured scents",
      },
    ],
    accentColor: "#d7b457",
    previewUrl: "https://myfrag.lovable.app/",
  },
  {
    slug: "nutri-boost",
    name: "Nutri Boost",
    category: "Supplements E-commerce Website",
    shortDescription:
      "A performance-focused supplements storefront with a bold fitness hero, product shopping flow, coach-led content, and WhatsApp conversion paths.",
    overview:
      "Nutri Boost is a supplements e-commerce website designed for athletes and active customers. The experience combines a strong performance-focused hero, clear shopping navigation, bestsellers and new-arrivals pathways, coach-led educational content, and fast conversion through shop and WhatsApp actions.",
    features: [
      "High-impact supplements hero section",
      "Shop, new arrivals, and bestsellers navigation",
      "Coach-led educational content and booking CTAs",
      "Performance-focused green and dark visual system",
      "Live storefront preview connected to production",
    ],
    technologies: ["E-commerce", "Responsive Design", "Storefront", "Content Sections"],
    image: "/assets/nutri-boost-hero.png",
    imageAlt: "Nutri Boost supplements e-commerce homepage",
    gallery: [
      {
        src: "/assets/nutri-boost-hero.png",
        alt: "Nutri Boost performance supplements hero section",
        label: "Storefront hero",
      },
      {
        src: "/assets/nutri-boost-coaches.png",
        alt: "Nutri Boost coaches explain supplements section",
        label: "Coach content",
      },
    ],
    accentColor: "#35df95",
    previewUrl: "https://nutriboosteg.com/",
  },
  {
    slug: "el-banan-coffee",
    name: "El Banan Coffee",
    category: "Coffee E-commerce Website",
    shortDescription:
      "A premium coffee storefront with a dark roasted visual system, product collections, origin storytelling, and a warm boutique shopping feel.",
    overview:
      "El Banan Coffee is a premium coffee e-commerce website built around rich product photography, editorial storytelling, and a dark brown and gold visual identity. The experience gives the brand a crafted, boutique feel while keeping shopping paths clear through Home, Shop, Collections, and Story sections.",
    features: [
      "Premium coffee hero section with warm roast atmosphere",
      "Product collection cards for signature blends and espresso beans",
      "Origin and roasting story section",
      "Dark brown and gold luxury visual system",
      "Live storefront preview connected to production",
    ],
    technologies: ["E-commerce", "Responsive Design", "Product Catalog", "Brand Story"],
    image: "/assets/el-banan-hero.png",
    imageAlt: "El Banan Coffee e-commerce homepage hero",
    gallery: [
      {
        src: "/assets/el-banan-hero.png",
        alt: "El Banan Coffee homepage hero section",
        label: "Coffee hero",
      },
      {
        src: "/assets/el-banan-products.png",
        alt: "El Banan Coffee product collection cards",
        label: "Product collection",
      },
      {
        src: "/assets/el-banan-story.png",
        alt: "El Banan Coffee crafted with devotion story section",
        label: "Brand story",
      },
    ],
    accentColor: "#d79a2b",
    previewUrl: "https://elbanan-coffee.lovable.app/",
  },
  {
    slug: "idea-wellness",
    name: "Idea Wellness",
    category: "Fitness Center Management SaaS",
    shortDescription:
      "A fitness center management system for members, reception, attendance logs, packages, branches, reports, and performance tracking.",
    overview:
      "Idea Wellness is a fitness center management platform for gym and wellness operations. It centralizes member management, live reception, attendance logs, package catalogs, branches, users, check-ins, financial reports, and performance dashboards.",
    features: [
      "Member management and live reception",
      "Attendance logs, check-ins, and active-inside tracking",
      "Package catalog, invitations, and partnerships",
      "Branch summaries and user management",
      "Income, expense, profit, and performance reports",
    ],
    technologies: ["React", "TypeScript", "SaaS", "Reports", "Dashboards"],
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Premium gym interior with orange accent lighting",
    gallery: [
      {
        src: "/assets/idea-wellness-dashboard.png",
        alt: "Idea Wellness fitness center dashboard",
        label: "Dashboard",
      },
      {
        src: "/assets/idea-wellness-reports.png",
        alt: "Idea Wellness performance reports",
        label: "Reports",
      },
    ],
    logo: "/assets/idea-wellness-logo.png",
    accentColor: "#ff6a13",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
