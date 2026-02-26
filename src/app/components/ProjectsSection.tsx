"use client";

import Projects3D from "./Projects3D";

const PROJECTS = [
  {
    title: "Quill & Pigeon",
    subtitle: "XN Project",
    points: [
      "Responsive analytics dashboard for engagement and sales insights.",
      "Inventory and revenue tracking workflows",
      "Supports operational insights for creators.",
    ],
    githubUrl: "https://github.com/blurry04/webdevproj",
  },
  {
    title: "The Activity Hub",
    subtitle: "Recreational Engagement Application",
    points: [
      "Location-based event discovery system",
      "Local sports meetup coordination platform.",
      "Group scheduling and participation tracking",
      "Designed for community engagement",
    ],
    liveUrl: "http://activeportland.com/",
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
    title: "Pulse Tonight",
    subtitle: "Portland's Nightlife",
    points: [
      "Your nightly guide to the best events in Portland, ME",
      "Discover events by Time and Location.",
      "Save favorites, grab tickets, and add plans to your calendar in one tap.",
    ],
    githubUrl: "https://github.com/blurry04/casco-culture",
    liveUrl: "https://casco-culture.vercel.app/"
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
