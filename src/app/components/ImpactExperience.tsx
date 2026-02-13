"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Metric = { value: string; label: string };
type ImpactPanel = {
  company: string;
  role: string;
  date: string;
  headline: string;
  metrics: Metric[];
  bullets: string[];
  chips?: string[];
};

const PANELS: ImpactPanel[] = [
  {
    company: "EmpoweRx",
    role: "Product Manager (Technical)",
    date: "2024",
    headline: "Led product strategy and data tooling for wage insights.",
    metrics: [
      { value: "6+", label: "Cross-functional partners" },
      { value: "3", label: "Core product streams" },
      { value: "1", label: "County-level data engine" },
    ],
    bullets: [
      "Built a Market Analysis Tool powered by BLS data pipelines.",
      "Aligned stakeholders on roadmap, scope, and delivery milestones.",
      "Migrated AWS and GitHub systems from vendors to in-house.",
    ],
    chips: ["Strategy", "Data", "Delivery"],
  },
  {
    company: "Ekahal",
    role: "Full-Stack Developer",
    date: "2023",
    headline: "Modernized dashboards and improved performance across the app.",
    metrics: [
      { value: "20%", label: "Faster load times" },
      { value: "10%", label: "Higher engagement" },
      { value: "5+", label: "Core UI modules" },
    ],
    bullets: [
      "Revamped dashboards with React and Bootstrap 5.",
      "Refactored legacy components for speed and clarity.",
      "Partnered with design on UX improvements.",
    ],
    chips: ["React", "UI/UX", "Performance"],
  },
  {
    company: "KritexCo",
    role: "Web Developer",
    date: "2022",
    headline: "Built responsive web experiences and optimized conversion flows.",
    metrics: [
      { value: "15%", label: "Lower bounce rate" },
      { value: "3", label: "Landing pages shipped" },
      { value: "2", label: "A/B test cycles" },
    ],
    bullets: [
      "Created responsive landing pages for growth campaigns.",
      "Delivered React UI components with rapid iterations.",
      "Improved copy + layout for higher conversions.",
    ],
    chips: ["Web", "Growth", "Experiments"],
  },
  {
    company: "Studio Work",
    role: "Product Builder",
    date: "2021–2024",
    headline: "Shipped end-to-end prototypes from signal to launch.",
    metrics: [
      { value: "12+", label: "Projects built" },
      { value: "35+", label: "Features shipped" },
      { value: "4", label: "Product lines" },
    ],
    bullets: [
      "End-to-end ownership from discovery to launch.",
      "Balanced roadmap scope with engineering feasibility.",
      "Delivered polished demos and product narratives.",
    ],
    chips: ["Product", "Delivery", "Systems"],
  },
];

export default function ImpactExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const panels = useMemo(() => PANELS, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !viewport || !track) return;

      const getMaxTranslate = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getMaxTranslate(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getMaxTranslate()}`,
          scrub: 1,
          pin: viewport,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const applyActive = () => {
        const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
        let next = 0;
        let min = Number.POSITIVE_INFINITY;
        panelRefs.current.forEach((panel, idx) => {
          const rect = panel.getBoundingClientRect();
          const dist = Math.abs(rect.left + rect.width / 2 - center);
          if (dist < min) {
            min = dist;
            next = idx;
          }
        });
        setActiveIndex(next);
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getMaxTranslate()}`,
        scrub: true,
        onUpdate: applyActive,
      });

      panelRefs.current.forEach((panel) => {
        gsap.set(panel, { opacity: 0.6, scale: 0.98 });
      });

      ScrollTrigger.addEventListener("refresh", applyActive);
      applyActive();

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative min-h-[200vh] py-10 scroll-reveal"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="section-eyebrow">Impact</p>
          <h2 className="heading-2 mt-2">Experience</h2>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Scroll to explore →
        </p>
      </div>

      {reducedMotion ? (
        <div className="grid gap-6">
          {panels.map((panel) => (
            <div
              key={panel.company}
              className="flex flex-col gap-6 rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[0_20px_40px_rgba(32,36,43,0.08)]"
            >
              <div className="text-sm text-muted">
                {panel.company} • {panel.role} • {panel.date}
              </div>
              <h3 className="text-lg font-semibold text-[var(--ink)]">
                {panel.headline}
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {panel.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-2xl font-semibold text-[var(--ink)]">
                      {metric.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <ul className="grid gap-2 text-sm text-[var(--ink)]">
                {panel.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="text-accent">-</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {panel.chips && (
                <div className="flex flex-wrap gap-2">
                  {panel.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white/60"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 px-6 py-8"
          >
            {panels.map((panel, index) => (
              <div
                key={`${panel.company}-${index}`}
                ref={(el) => {
                  if (el) panelRefs.current[index] = el;
                }}
                className={`flex w-[80vw] max-w-[900px] flex-col gap-6 rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[0_20px_40px_rgba(32,36,43,0.08)] transition duration-300 ${
                  activeIndex === index ? "opacity-100 scale-100" : "opacity-60 scale-[0.98]"
                }`}
              >
                <div className="text-sm text-muted">
                  {panel.company} • {panel.role} • {panel.date}
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)]">
                  {panel.headline}
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {panel.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-2xl font-semibold text-[var(--ink)]">
                        {metric.value}
                      </p>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
                <ul className="grid gap-2 text-sm text-[var(--ink)]">
                  {panel.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-accent">-</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {panel.chips && (
                  <div className="flex flex-wrap gap-2">
                    {panel.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-muted">
        {String(activeIndex + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
      </div>
    </section>
  );
}
