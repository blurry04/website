"use client";

import ImpactScrollRail from "./ImpactScrollRail";

const ITEMS = [
  {
    subtitle: "Product Strategy",
    title: "EmpoweRx",
    desc:
      "Built wage intelligence and market analytics infrastructure to turn complex labor data into actionable product insights.",
    meta: "2024 · Product Manager (Technical)",
    highlights: [
      "Market analysis tooling for wage insights",
      "BLS pipeline integration for data accuracy",
      "Roadmap alignment across stakeholders",
    ],
    tags: ["Strategy", "Data", "Delivery"],
  },
  {
    subtitle: "MS in Computer Science",
    title: "Northeastern University",
    desc:
      "Supported foundational AI/ML instruction through labs, office hours, and structured feedback on applied coursework.",
    meta: "2023–2024 · Graduate Teaching Assistant",
    highlights: [
      "Hands-on support for AI/ML coursework",
      "Structured feedback on applied assignments",
      "Lab facilitation and student mentoring",
    ],
    tags: ["Teaching", "Evaluation", "Systems Thinking"],
  },
  {
    subtitle: "Product Engineering",
    title: "Ekahal",
    desc:
      "Modernized core dashboards and workflows to improve usability, performance, and clarity across the product.",
    meta: "2022 · Frontend Engineer",
    highlights: [
      "Dashboard modernization for clarity",
      "UX flows redesigned for engagement",
      "Performance optimizations at scale",
    ],
    tags: ["UX", "Performance", "React"],
  },
  {
    subtitle: "Growth Engineering",
    title: "Kritexco",
    desc:
      "Delivered landing pages and client portal experiences focused on conversion, clarity, and maintainable UI systems.",
    meta: "2022 · Frontend Developer",
    highlights: [
      "Landing pages optimized for conversion",
      "Client portal UI systems delivered",
      "Rapid iteration on visual changes",
    ],
    tags: ["UI", "A/B Testing", "Deployment"],
  },
  {
    subtitle: "Experiential Marketing",
    title: "Travassa Holidays",
    desc:
      "Led multi-city experiential programs with partner coordination and logistics to scale high-touch travel events.",
    meta: "2021 · Marketing Lead",
    highlights: [
      "Multi-city events at scale",
      "Partner coordination and logistics",
      "Growth-focused campaign planning",
    ],
    tags: ["Logistics", "Partnerships", "Growth"],
  },
  {
    subtitle: "Community Leadership",
    title: "Rotaract Club (TSEC)",
    desc:
      "Drove operations and public relations initiatives to grow community engagement and deliver structured programs.",
    meta: "2020–2021 · Secretary & PR Director",
    highlights: [
      "Community engagement initiatives",
      "Operational leadership and planning",
      "Public relations and brand presence",
    ],
    tags: ["Governance", "Brand", "Execution"],
  },
];

export default function ImpactSection() {
  return (
    <section id="impact" data-section className="scroll-mt-[96px]">
      <ImpactScrollRail items={ITEMS} />
    </section>
  );
}
