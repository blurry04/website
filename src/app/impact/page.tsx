"use client";

import ImpactExperience from "../components/ImpactExperience";

const PROJECTS = [
  {
    title: "Quill & Pigeon",
    subtitle: "Artist Analytics Dashboard",
    points: [
      "Responsive analytics dashboard for engagement and sales insights.",
      "Next.js + Tailwind modular component system.",
      "Supabase Auth + real-time PostgreSQL data.",
    ],
  },
  {
    title: "Travelpedia",
    subtitle: "Android Travel Planner App",
    points: [
      "Itinerary planning, expense tracking, and smart packing.",
      "Java UI flows with conditional forms and date pickers.",
      "Firebase Firestore real-time sync and editing.",
    ],
  },
  {
    title: "Crisis Communication",
    subtitle: "UX/UI Prototype",
    points: [
      "Offline-first emergency comms for low-connectivity regions.",
      "Status updates, risk mapping, and quick alerts.",
      "Figma design system with accessibility focus.",
    ],
  },
  {
    title: "Market Analysis Tool",
    subtitle: "Product Data Platform",
    points: [
      "County-level wage insights using BLS data.",
      "Research-backed product strategy and delivery.",
      "Automated reporting and export workflows.",
    ],
  },
];

export default function ImpactPage() {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-24 pt-10">
      <ImpactExperience />

      <section className="grid gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Projects</p>
            <h2 className="heading-2 mt-2">Selected builds with measured outcomes.</h2>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="min-w-[280px] max-w-[360px] flex-1 rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_20px_40px_rgba(32,36,43,0.08)] transition hover:-translate-y-1 hover:border-[#4B5D7A] hover:shadow-[0_24px_50px_rgba(32,36,43,0.12)]"
            >
              <h3 className="text-lg font-semibold text-[var(--ink)]">
                {project.title}
              </h3>
              <p className="text-sm text-muted">{project.subtitle}</p>
              <ul className="mt-4 grid gap-2 text-sm text-[var(--ink)]">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-accent">-</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
