import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import { siteConfig, whatsappUrl, mailtoUrl } from "../data/siteConfig";

const projectTypes = [
  "Web Application",
  "Mobile Application",
  "Custom Business System",
  "AI Solution",
  "E-commerce Store",
  "Landing Page / Website",
  "Not sure yet",
];

const budgetRanges = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Let's discuss",
];

const sendLeadNotification = async (
  payload: Record<string, string>,
): Promise<void> => {
  const response = await fetch("/api/send-lead-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Lead email notification failed");
  }
};

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = typeof value === "string" ? value : "";
    });

    setSubmitting(true);
    setError(null);

    try {
      await sendLeadNotification(payload);
      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        "Something went wrong sending the form. Please reach us on WhatsApp or email instead.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-grid-dark bg-grid-32 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] opacity-60" />
        <div className="absolute inset-0 bg-radial-red" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Contact"
            title="Let's talk about your project."
            description="Send us the details and we'll come back with a clear, honest direction. Most replies happen within one business day."
          />
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-3">
          {/* Left: Contact channels */}
          <aside className="space-y-4 lg:col-span-1">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-brand-border bg-brand-panel/70 p-5 transition-colors hover:border-brand-red/60"
            >
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-bg text-brand-red">
                <MessageCircle size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-muted">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm font-medium text-white break-all">
                  {siteConfig.contact.whatsappDisplay}
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Fastest way to reach us.
                </p>
              </div>
            </a>

            <a
              href={mailtoUrl("Project inquiry — CairoX")}
              className="group flex items-start gap-4 rounded-xl border border-brand-border bg-brand-panel/70 p-5 transition-colors hover:border-brand-red/60"
            >
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-bg text-brand-red">
                <Mail size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-muted">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium text-white break-all">
                  {siteConfig.contact.email}
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  For detailed briefs and documents.
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-xl border border-brand-border bg-brand-panel/70 p-5">
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-bg text-brand-red">
                <MapPin size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-muted">
                  Based in
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {siteConfig.contact.location}
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Working with clients worldwide.
                </p>
              </div>
            </div>
          </aside>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-panel/70 p-6 sm:p-9">
              <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl" />

              {submitted ? (
                <div className="relative text-center py-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-brand-red/40 bg-brand-red/10 text-brand-red">
                    <CheckCircle2 size={26} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                    Thanks — we'll be in touch.
                  </h3>
                  <p className="mt-3 text-brand-muted max-w-md mx-auto">
                    Your message has been received. We'll get back to you within
                    one business day. For anything urgent, ping us on WhatsApp.
                  </p>
                  <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      as="a"
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} />
                      Message us on WhatsApp
                    </Button>
                    <Button
                      as="button"
                      variant="secondary"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="relative space-y-5"
                  noValidate
                >
                  {/* Netlify form name */}
                  <input type="hidden" name="form-name" value="contact" />
                  {/* Honeypot field */}
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human:
                      <input name="bot-field" />
                    </label>
                  </p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" type="text" required />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone" name="phone" type="tel" />
                    <Field label="Company" name="company" type="text" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      label="Project type"
                      name="projectType"
                      options={projectTypes}
                      required
                    />
                    <SelectField
                      label="Budget range"
                      name="budget"
                      options={budgetRanges}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-brand-text"
                    >
                      Project details
                      <span className="text-brand-red ml-0.5">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className="mt-2 w-full rounded-md border border-brand-border bg-brand-bg/60 px-3.5 py-2.5 text-sm text-white placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-red/60 focus:ring-2 focus:ring-brand-red/30 transition-all resize-y"
                    />
                  </div>

                  {error ? (
                    <div className="rounded-md border border-brand-red/40 bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
                      {error}
                    </div>
                  ) : null}

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <Button
                      as="button"
                      type="submit"
                      disabled={submitting}
                      size="lg"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      {!submitting && <ArrowRight size={18} />}
                    </Button>
                    <Button
                      as="a"
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="lg"
                    >
                      <MessageCircle size={18} />
                      Or chat on WhatsApp
                    </Button>
                  </div>
                  <p className="text-xs text-brand-muted">
                    By submitting this form, you agree to be contacted about
                    your project inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ----------------------------- Sub components -----------------------------

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
};

const Field = ({ label, name, type = "text", required }: FieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-brand-text"
    >
      {label}
      {required ? <span className="text-brand-red ml-0.5">*</span> : null}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      className="mt-2 w-full rounded-md border border-brand-border bg-brand-bg/60 px-3.5 py-2.5 text-sm text-white placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-red/60 focus:ring-2 focus:ring-brand-red/30 transition-all"
    />
  </div>
);

type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
};

const SelectField = ({ label, name, options, required }: SelectFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-brand-text"
    >
      {label}
      {required ? <span className="text-brand-red ml-0.5">*</span> : null}
    </label>
    <select
      id={name}
      name={name}
      required={required}
      defaultValue=""
      className="mt-2 w-full rounded-md border border-brand-border bg-brand-bg/60 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red/60 focus:ring-2 focus:ring-brand-red/30 transition-all"
    >
      <option value="" disabled className="bg-brand-bg">
        Select an option
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-brand-bg">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Contact;
