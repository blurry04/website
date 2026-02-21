"use client";

import { useEffect, useMemo, useRef, useState } from "react";
type ImpactPanel = {
  company: string;
  role: string;
  date: string;
  headline: string;
  bullets?: string[];
  chips?: string[];
};

const PANELS: ImpactPanel[] = [
  {
    company: "EmpoweRx",
    role: "Product Manager (Technical)",
    date: "2024",
    headline:
      "Built wage intelligence and market analytics infrastructure to turn complex labor data into actionable product insights.",
    chips: ["Strategy", "Data", "Delivery"],
  },
  {
    company: "Northeastern University",
    role: "Graduate Teaching Assistant",
    date: "2023–2024",
    headline:
      "Supported foundational AI/ML instruction through labs, office hours, and structured feedback on applied coursework.",
    chips: ["Teaching", "Evaluation", "Systems Thinking"],
  },
  {
    company: "Ekahal",
    role: "Frontend Engineer",
    date: "2022",
    headline:
      "Modernized core dashboards and workflows to improve usability, performance, and clarity across the product.",
    chips: ["UX", "Performance", "React"],
  },
  {
    company: "Kritexco",
    role: "Frontend Developer",
    date: "2022",
    headline:
      "Delivered landing pages and client portal experiences focused on conversion, clarity, and maintainable UI systems.",
    chips: ["UI", "A/B Testing", "Deployment"],
  },
  {
    company: "Travassa Holidays",
    role: "Marketing Lead",
    date: "2021",
    headline:
      "Led multi-city experiential programs with partner coordination and logistics to scale high‑touch travel events.",
    chips: ["Logistics", "Partnerships", "Growth"],
  },
  {
    company: "Rotaract Club (TSEC)",
    role: "Secretary & PR Director",
    date: "2020–2021",
    headline:
      "Drove operations and public relations initiatives to grow community engagement and deliver structured programs.",
    chips: ["Governance", "Brand", "Execution"],
  },
];

export default function ImpactExperience() {
  const panels = useMemo(() => PANELS, []);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let next = 0;
      let min = Number.POSITIVE_INFINITY;
      cardRefs.current.forEach((card, idx) => {
        const offset = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(offset - center);
        if (dist < min) {
          min = dist;
          next = idx;
        }
      });
      setActiveIndex(next);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      track.removeEventListener("scroll", handleScroll);
    };
  }, [panels.length]);


  return (
    <div className="relative py-10 w-screen mx-[calc(50%-50vw)]">
      <div className="mx-auto mb-6 flex w-full max-w-7xl items-center justify-between px-6">
        <div>
          <p className="section-eyebrow">Impact</p>
          <h2 className="heading-2 mt-2">The Story So Far</h2>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 top-1/2 hidden -translate-y-1/2 border-t border-[var(--line)] lg:block" />
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-hidden pb-6 pt-4 touch-pan-y px-6"
        >
        {panels.map((panel, index) => (
          <article
            key={panel.company}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
              className="relative w-[92vw] max-w-5xl flex-none snap-center overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] shadow-[0_20px_50px_rgba(32,36,43,0.12)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_90%_20%,rgba(47,126,104,0.16)_0%,rgba(236,238,241,0.7)_55%,rgba(246,247,249,0.95)_100%)]" />
              <div className="relative grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
                <div className="flex flex-col gap-6">
                  <span className="text-[12px] uppercase tracking-[0.45em] text-muted">
                    {panel.company}
                  </span>
                  <h3 className="text-[36px] font-semibold leading-tight text-[var(--ink)] sm:text-[44px]">
                    {panel.role}
                  </h3>
                  <p className="max-w-[45ch] text-[15px] leading-relaxed text-[var(--ink)]/75 sm:text-[16px]">
                    {panel.headline}
                  </p>
                  {panel.chips && (
                    <p className="text-[12px] uppercase tracking-[0.35em] text-muted">
                      {panel.chips.join(" · ")}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-6">
                  {((panel.bullets && panel.bullets.length > 0) ||
                    (panel.chips && panel.chips.length > 0)) && (
                    <div>
                    <p className="text-[12px] uppercase tracking-[0.4em] text-muted">
                      Key Focus
                    </p>
                    <div className="mt-4 grid gap-3 text-[14px] text-[var(--ink)]/75">
                      {(panel.bullets && panel.bullets.length > 0
                        ? panel.bullets
                        : panel.chips ?? []
                      ).map((bullet) => (
                        <div key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1 w-5 rounded-full bg-[var(--accent)]" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                    <span className="text-[12px] uppercase tracking-[0.35em] text-muted">
                      Timeline
                    </span>
                    <span className="text-[13px] uppercase tracking-[0.22em] text-[var(--ink)]/70">
                      {panel.date}
                    </span>
                  </div>
                </div>
              </div>

              <span className="pointer-events-none absolute bottom-6 right-8 text-[120px] font-semibold text-[var(--ink)]/5">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center gap-1.5">
          {panels.map((_, idx) => (
            <span
              key={`dot-${idx}`}
              className={`h-1 w-4 rounded-full transition ${
                idx === activeIndex
                  ? "bg-[rgba(32,36,43,0.28)]"
                  : "bg-[rgba(32,36,43,0.12)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
