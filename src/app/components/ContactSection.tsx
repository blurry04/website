"use client";

export default function ContactSection() {
  return (
    <div className="terminal-section grid gap-6 rounded-3xl border border-[var(--line)] bg-white/80 p-8">
      <div className="flex flex-col gap-3">
        <p className="section-eyebrow">Contact</p>
        <h2 className="heading-2">
          Ready to build the next premium product experience.
        </h2>
        <p className="body-md">
          Open to product management, technical PM roles, and strategic collaborations.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm font-semibold">
        <a
          className="neon-button rounded-full bg-[var(--ink)] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
          href="mailto:hello@gauravadvani.com"
        >
          hello@gauravadvani.com
        </a>
        <a
          className="neon-button rounded-full border border-[var(--line)] px-6 py-3 text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-lg"
          href="#"
        >
          LinkedIn
        </a>
        <a
          className="neon-button rounded-full border border-[var(--line)] px-6 py-3 text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-lg"
          href="#"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
