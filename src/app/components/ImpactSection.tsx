"use client";

import ImpactScrollRail from "./ImpactScrollRail";

const ITEMS = [
  {
    subtitle: "Product Intelligence",
    title: "EmpoweRx Inc.",
    desc:
      "Led cross-functional delivery across product planning, analytics, and platform execution.",
    meta: "Technical Product Manager · 2026",
    highlights: [
      "Integrated BLS National wage datasets into analytics platform",
      "Aligned roadmap, QA, and release workflows",
      "Translated workforce data into product decisions",
    ],
    tags: ["Roadmap", "Product", "Stakeholders"],
  },
  {
    subtitle: "Performance UX",
    title: "Ekahal",
    desc:
      "Modernized React dashboards and UX flows for faster, cleaner product experiences.",
    meta: "Full-Stack Developer · 2023",
    highlights: [
      "Improved dashboard load times by 20% through API optimization",
      "Optimized state management for smoother interactions",
      "Increased user engagement by 10% via UX refinements",
    ],
    tags: ["API" , "Performance", "UI/UX Workflows"],
  },
  {
    subtitle: "Conversion Systems",
    title: "KritexCo",
    desc:
      "Developed responsive frontend systems to support conversion-focused user experiences.",
    meta: "Web Developer · 2021",
    highlights: [
      "Increased session duration by 15% via UI optimizations",
      "Improved layout clarity across conversion flows",
      "Streamlined user journeys across landing views",
    ],
    tags: ["Delivery", "Front-end", "Experimentation"],
  },
  {
    subtitle: "Experience Ops",
    title: "Travassa Holidays",
    desc:
      "Led multi-city travel operations with vendor coordination and engagement strategy.",
    meta: "Marketing Executive · 2021-2023",
    highlights: [
      "Executed travel operations across 10+ cities",
      "Managed logistics for 500+ participants",
      "Oversaw end-to-end trip planning workflows",
    ],
    tags: ["Operations", "Logistics", "Partnerships"],
  },
];

export default function ImpactSection() {
  return (
    <section id="impact" data-section className="scroll-mt-[96px]">
      <ImpactScrollRail items={ITEMS} />
    </section>
  );
}
