import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Smartphone,
  Database,
  Sparkles,
  ShoppingBag,
  LayoutTemplate,
} from "lucide-react";

export type Service = {
  /** URL-safe slug - used for anchors and future routing. */
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  /** Concrete things we build inside this service. */
  whatWeBuild: string[];
};

export const services: Service[] = [
  {
    slug: "web-applications",
    title: "Web Applications",
    icon: Code2,
    shortDescription:
      "Robust, scalable web apps engineered for real business workflows - from internal tools to full SaaS platforms.",
    longDescription:
      "We build production-grade web applications with modern frameworks, clean architecture, and an emphasis on performance, security, and maintainability. Whether you need an internal operations tool or a customer-facing SaaS, we deliver software your team can rely on.",
    whatWeBuild: [
      "Admin dashboards",
      "SaaS platforms",
      "Booking systems",
      "CRM systems",
      "Business portals",
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    icon: Smartphone,
    shortDescription:
      "Native and cross-platform mobile apps that feel fast, look premium, and serve real business goals.",
    longDescription:
      "From customer-facing apps to internal field tools, we craft mobile experiences with attention to performance, offline behavior, and platform conventions - so your users keep coming back.",
    whatWeBuild: [
      "iOS apps",
      "Android apps",
      "Flutter apps",
      "Customer apps",
      "Internal business apps",
    ],
  },
  {
    slug: "business-systems",
    title: "Custom Business Systems",
    icon: Database,
    shortDescription:
      "Tailored systems that replace spreadsheets and chaos with reliable, role-based operations software.",
    longDescription:
      "Every business has unique processes. We design and build custom systems that mirror how your team actually works - with the right roles, workflows, reports, and integrations to keep operations running cleanly.",
    whatWeBuild: [
      "Clinic systems",
      "Inventory systems",
      "Finance systems",
      "POS integrations",
      "Operations dashboards",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    icon: Sparkles,
    shortDescription:
      "Practical AI tools that automate repetitive work, answer customer questions, and unlock data inside your business.",
    longDescription:
      "AI is only useful when it removes friction. We integrate language models, vector search, and automation into focused tools - chat assistants, internal copilots, smart workflows - that produce measurable time savings.",
    whatWeBuild: [
      "AI chatbots",
      "AI website assistants",
      "Automation tools",
      "Smart business workflows",
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    icon: ShoppingBag,
    shortDescription:
      "Online stores built to convert - clean product pages, fast checkout, and reliable operations.",
    longDescription:
      "We build and optimize storefronts on the right platform for your business - Shopify, EasyOrders, or custom - with a focus on conversion, average order value, and operational simplicity.",
    whatWeBuild: [
      "Shopify stores",
      "EasyOrders stores",
      "Custom online stores",
      "Product pages",
      "Checkout optimization",
    ],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages & Digital Presence",
    icon: LayoutTemplate,
    shortDescription:
      "High-converting landing pages and brand sites that turn visitors into qualified leads.",
    longDescription:
      "From single conversion-focused pages to full brand sites, we craft digital presence that earns trust quickly and drives the action you actually care about - bookings, calls, signups, or sales.",
    whatWeBuild: [
      "Medical landing pages",
      "Product landing pages",
      "Agency websites",
      "Lead generation pages",
      "Portfolio websites",
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
