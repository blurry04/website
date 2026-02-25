"use client";

import Projects3D from "./Projects3D";

const PROJECTS = [
  {
    title: "Quill & Pigeon",
    subtitle: "XN Project",
    points: [
      "Responsive analytics dashboard for engagement and sales insights.",
      "Inventory and revenue tracking workflows",
      "Modular UI system with Next.js + Tailwind.",
      "Supabase Auth + real-time data sync.",
      "Supports operational insights for creators.",
    ],
    githubUrl: "https://github.com/blurry04/webdevproj",
    liveUrl: "https://quill-and-pigeon.vercel.app",
  },
  {
    title: "The Activity Hub",
    subtitle: "Recreational Engagement",
    points: [
      "Location-based event discovery system",
      "Local sports meetup coordination platform.",
      "Group scheduling and participation tracking",
      "Designed for community engagement",
    ],
    githubUrl: "https://github.com/blurry04/activityhub",
  },
  {
    title: "Market Analysis Tool",
    subtitle: "Product Data Platform",
    points: [
      "County-level wage insights by integrating national workforce datasets",
      "Research-backed product strategy and delivery.",
      "Supports staffing and pay decisions",
      "Data pipelines for workforce insights",
    ],
    githubUrl: "https://github.com/blurry04/",
    liveUrl: "https://empowerxinc.com/",
  },
  {
      title: "Travelpedia",
      subtitle: "Android Travel Planner App",
      points: [
        "Itinerary planning, expense tracking, and smart packing.",
        "Java UI flows with conditional forms and date pickers.",
        "Firebase Firestore real-time sync and editing.",
        "Supports end-to-end travel planning",
      ],
      githubUrl: "https://github.com/NEU-Roux/final-project-blurry04",
    },
  {
    title: "Signal Console",
    subtitle: "Product Ops Workspace",
    points: [
      "Unified alerts, metrics, and product update tracking.",
      "Role-based views for stakeholders and operators.",
      "Automated summaries for weekly decision review.",
    ],
    githubUrl: "https://github.com/blurry04/mockup",
  },
];

export default function ProjectsSection() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[16px] font-semibold uppercase tracking-[0.4em] text-[var(--muted)] drop-shadow-[0_4px_12px_rgba(32,36,43,0.18)]">
            Shipped Systems
          </p>
        </div>
      </div>

      <Projects3D items={PROJECTS} />
    </div>
  );
}
