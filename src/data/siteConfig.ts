export const siteConfig = {
  name: "CairoX",
  tagline: "Beyond Limits",
  shortDescription:
    "Software and AI solutions agency building web apps, mobile apps, business systems, e-commerce platforms, and AI-powered tools.",

  // Contact details — change these in one place and they propagate site-wide.
  contact: {
    email: "cairoxagency@gmail.com",
    whatsappNumber: "201014423015", // international format, no '+' or spaces
    whatsappDisplay: "+20 101 442 3015",
    location: "Cairo, Egypt",
  },

  // Social links — leave any blank to hide it in the footer.
  social: {
    linkedin: "",
    github: "",
    instagram: "",
    twitter: "",
  },

  // Default project inquiry message used by WhatsApp CTAs across the site.
  defaultInquiryMessage:
    "Hi CairoX, I'd like to discuss a project. Could we talk?",
} as const;

export const whatsappUrl = (message?: string): string => {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  const text = (message ?? siteConfig.defaultInquiryMessage).trim();
  return text.length > 0 ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const mailtoUrl = (subject?: string, body?: string): string => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${siteConfig.contact.email}${qs ? `?${qs}` : ""}`;
};
