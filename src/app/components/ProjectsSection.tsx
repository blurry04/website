"use client";

import Projects3D from "./Projects3D";

const PROJECTS = [
  {
    title: "Quill & Pigeon",
    subtitle: "Artist Analytics Dashboard",
    points: [
      "Responsive analytics dashboard for engagement and sales insights.",
      "Modular UI system with Next.js + Tailwind.",
      "Supabase Auth + real-time data sync.",
    ],
    githubUrl: "https://github.com/gauravadvani/quill-and-pigeon",
    liveUrl: "https://quill-and-pigeon.vercel.app",
  },
  {
    title: "Travelpedia",
    subtitle: "Android Travel Planner App",
    points: [
      "Itinerary planning, expense tracking, and smart packing.",
      "Java UI flows with conditional forms and date pickers.",
      "Firebase Firestore real-time sync and editing.",
    ],
    githubUrl: "https://github.com/gauravadvani/travelpedia",
  },
  {
    title: "Market Analysis Tool",
    subtitle: "Product Data Platform",
    points: [
      "County-level wage insights with public data sources.",
      "Research-backed product strategy and delivery.",
      "Automated reporting and export workflows.",
    ],
    githubUrl: "https://github.com/gauravadvani/market-analysis-tool",
    liveUrl: "https://market-analysis-tool.vercel.app",
  },
  {
    title: "Signal Console",
    subtitle: "Product Ops Workspace",
    points: [
      "Unified alerts, metrics, and product update tracking.",
      "Role-based views for stakeholders and operators.",
      "Automated summaries for weekly decision review.",
    ],
    githubUrl: "https://github.com/gauravadvani/signal-console",
  },
  {
    title: "Growth Lab",
    subtitle: "Experimentation Dashboard",
    points: [
      "A/B experiment tracking with lift snapshots.",
      "Cohort views for retention and activation.",
      "Executive summaries for product leadership.",
    ],
    githubUrl: "https://github.com/gauravadvani/growth-lab",
    liveUrl: "https://growth-lab.vercel.app",
  },
  {
    title: "Portfolio OS",
    subtitle: "Personal Brand System",
    points: [
      "Modular section system with reusable layouts.",
      "Theme tokens for consistent UI polish.",
      "Smooth motion and scroll-driven highlights.",
    ],
    githubUrl: "https://github.com/gauravadvani/portfolio-os",
  },
  {
    title: "Insight Vault",
    subtitle: "Research Repository",
    points: [
      "Structured research briefs and decision logs.",
      "Tag-driven retrieval for fast synthesis.",
      "Export-ready summaries for stakeholders.",
    ],
    githubUrl: "https://github.com/gauravadvani/insight-vault",
  },
  {
    title: "Ops Pulse",
    subtitle: "Service Health Monitor",
    points: [
      "Incident timelines with recovery checkpoints.",
      "Service-level insights and status history.",
      "Owner notes for post-incident learnings.",
    ],
    githubUrl: "https://github.com/gauravadvani/ops-pulse",
    liveUrl: "https://ops-pulse.vercel.app",
  },
  {
    title: "Flow Canvas",
    subtitle: "Journey Mapping Tool",
    points: [
      "Customer journey mapping with touchpoints.",
      "Exportable flow visuals for workshops.",
      "Shared boards for cross-team alignment.",
    ],
    githubUrl: "https://github.com/gauravadvani/flow-canvas",
  },
];

export default function ProjectsSection() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">Projects</p>
          <h2 className="heading-2 mt-2">Selected builds with measured outcomes.</h2>
        </div>
      </div>

      <Projects3D items={PROJECTS} />
    </div>
  );
}
