"use client";

import ImpactScrollRail from "./ImpactScrollRail";

const ITEMS = [
  {
    subtitle: "Product Intelligence",
    title: "EmpoweRx Inc.",
    desc:
      "Turned wage intelligence data into actionable product insights for HCO/HCP decision-making.",
    meta: "Aug 2025–Jan 2026 · Product Manager (Internship)",
    highlights: [
      "Integrated BLS wage datasets for accuracy",
      "Aligned roadmap, QA, and release readiness",
      "Translated insights into stakeholder decisions",
    ],
    tags: ["Analytics", "Product Ops", "Stakeholders"],
  },
  {
    subtitle: "Instructional Rigor",
    title: "Northeastern University",
    desc:
      "Mentored AI foundations coursework with consistent grading standards and feedback depth.",
    meta: "Jan 2026–Present · Graduate Teaching Assistant",
    highlights: [
      "Built rubrics for ML and reasoning topics",
      "Reviewed assignments for conceptual accuracy",
      "Coached students through optimization labs",
    ],
    tags: ["AI/ML", "Evaluation", "Mentorship"],
  },
  {
    subtitle: "Performance UX",
    title: "Ekahal",
    desc:
      "Modernized React dashboards and UX flows for faster, cleaner product experiences.",
    meta: "Jan 2023–Jun 2023 · Intern",
    highlights: [
      "Improved page load speed by 20%",
      "Reduced redundant API calls across views",
      "Lifted engagement by 10% via flow tweaks",
    ],
    tags: ["React", "Performance", "UX"],
  },
  {
    subtitle: "Conversion Systems",
    title: "Kritexco",
    desc:
      "Built responsive landing and portal experiences optimized for clarity and usability.",
    meta: "Dec 2021–Feb 2022 · Intern",
    highlights: [
      "Boosted session duration by 15%",
      "Reduced bounce rates with A/B iterations",
      "Shipped responsive UI in React + JS",
    ],
    tags: ["Frontend", "Experimentation", "Delivery"],
  },
  {
    subtitle: "Experience Ops",
    title: "Travassa Holidays",
    desc:
      "Led multi-city travel operations with vendor coordination and engagement strategy.",
    meta: "Sep 2021–Jan 2023 · Marketing Executive",
    highlights: [
      "Executed trips across 10+ cities",
      "Managed logistics for 500+ participants",
      "Aligned vendors to deliver premium journeys",
    ],
    tags: ["Logistics", "Partnerships", "Growth"],
  },
  {
    subtitle: "Community Leadership",
    title: "Rotaract Club of TSEC",
    desc:
      "Directed communications and governance for sustained community engagement.",
    meta: "Jul 2020–Jun 2022 · Director of PR & Secretary",
    highlights: [
      "Led communications strategy and outreach",
      "Organized initiatives with structured cadence",
      "Strengthened brand presence across events",
    ],
    tags: ["Leadership", "Comms", "Execution"],
  },
  {
    subtitle: "Editorial Strategy",
    title: "TSEC Codestorm",
    desc:
      "Shaped editorial voice and public relations for a campus tech community.",
    meta: "May 2021–Jun 2022 · PR Officer & Editorial Director",
    highlights: [
      "Defined editorial tone for announcements",
      "Coordinated PR across flagship events",
      "Built consistent storytelling guidelines",
    ],
    tags: ["Editorial", "Brand", "Community"],
  },
];

export default function ImpactSection() {
  return (
    <section id="impact" data-section className="scroll-mt-[96px]">
      <ImpactScrollRail items={ITEMS} />
    </section>
  );
}
