"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type RailItem = {
  title: string;
  subtitle?: string;
  desc: string;
  meta?: string;
  highlights?: string[];
  tags?: string[];
};

type ImpactScrollRailProps = {
  items: RailItem[];
};

export default function ImpactScrollRail({ items }: ImpactScrollRailProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const deriveMetrics = (item: RailItem) => {
    const meta = item.meta ?? "";
    const yearMatch = meta.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : "Recent";
    const tags = item.tags?.slice(0, 2) ?? [];
    const subtitle = item.subtitle ?? "Impact";
    return [
      { value: year, label: "Timeline" },
      { value: tags[0] ?? subtitle, label: "Focus" },
      { value: tags[1] ?? "Delivery", label: "Mode" },
    ];
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    containerRef.current = document.body;
  }, []);
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const viewportEl = rail.parentElement as HTMLElement | null;
    if (!viewportEl) return;

    const endGutter = 24; // match px-6

    const updateMeasures = () => {
      const viewportWidth = viewportEl.clientWidth; // visible width
      const scrollWidth = rail.scrollWidth;

      const max = Math.max(0, scrollWidth - viewportWidth);
      const total = max + endGutter;

      setMaxTranslate(total);
      setSectionHeight((window.innerHeight || 0) + total);
    };

    updateMeasures();

    const ro = new ResizeObserver(updateMeasures);
    ro.observe(viewportEl);
    ro.observe(rail);

    window.addEventListener("resize", updateMeasures);

    return () => {
      window.removeEventListener("resize", updateMeasures);
      ro.disconnect();
    };
  }, [items.length]);
  // useLayoutEffect(() => {
  //   const updateMeasures = () => {
  //     const rail = railRef.current;
  //     if (!rail) return;
  //     const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  //     const scrollWidth = rail.scrollWidth;
  //     const max = Math.max(0, scrollWidth - viewportWidth);
  //     // const endPadding = 10;
  //     setMaxTranslate(max + endPadding);
  //     setSectionHeight((window.innerHeight || 0) + max + endPadding);
  //   };

  //   updateMeasures();
  //   window.addEventListener("resize", updateMeasures);
  //   return () => window.removeEventListener("resize", updateMeasures);
  // }, [items.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  if (reducedMotion) {
    return (
      <div className="grid gap-4">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 text-[var(--ink)] shadow-[0_14px_32px_rgba(32,36,43,0.08)] focus-within:opacity-100 focus-within:blur-0 focus-within:scale-100"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--ink)]/75">{item.desc}</p>
            {item.tags && (
              <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
                {item.tags.join(" · ")}
              </p>
            )}
          </article>
        ))}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: sectionHeight || "auto" }}
    >
      <div className="sticky top-[96px] h-[calc(100vh-96px)] w-full overflow-hidden">
        <div className="grid h-full grid-rows-[auto_1fr]">
          <div className="px-6 pt-4">
            <div className="mx-auto w-full max-w-7xl">
              <p className="section-eyebrow">Impact</p>
              <h2 className="heading-2 mt-2">The Story So Far</h2>
            </div>
          </div>
          <div className="overflow-hidden pt-10">
            <motion.div
              ref={railRef}
              style={{ x }}
              data-impact-rail
              className="flex h-full w-max items-start gap-6 px-6 will-change-transform"
            >
              {items.map((item) => {
                const metrics = deriveMetrics(item);
                const highlights = (item.highlights ?? []).slice(0, 3);
                const tags = (item.tags ?? []).slice(0, 3);

                return (
                  <article
                    key={item.title}
                    tabIndex={0}
                    data-impact-card
                    className="relative shrink-0 w-[78vw] max-w-[900px] h-[420px] overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--card)] px-14 py-12 text-[var(--ink)] shadow-[0_24px_60px_rgba(32,36,43,0.14)] transition-[opacity,filter,transform,box-shadow] duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-within:opacity-100 focus-within:blur-0 focus-within:scale-100 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_28px_70px_rgba(32,36,43,0.18)]"
                  >
                    {/* Background anchor for cinematic depth */}
                    <div className="pointer-events-none absolute -left-10 top-[-30%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(47,126,104,0.18)_0%,rgba(47,126,104,0.03)_55%,rgba(47,126,104,0)_70%)]" />

                    <div className="relative grid h-full grid-cols-[1.4fr_0.6fr] gap-12">
                      {/* Left column */}
                      <div className="min-w-0 grid h-full grid-rows-[200px_92px_84px_1fr]">
                        {/* Row 1: Identity (fixed slot) */}
                        <div>
                          {item.subtitle && (
                            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]/80">
                              {item.subtitle}
                            </p>
                          )}

                          <h3
                            title={item.title}
                            className="mt-3 text-[56px] font-semibold leading-[1.02] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
                          >
                            {item.title}
                          </h3>

                          {item.meta && (
                            <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-[var(--ink)]/55 truncate">
                              {item.meta}
                            </p>
                          )}
                        </div>

                        {/* Row 2: Description (fixed slot; spacing belongs to the slot) */}
                        <div className="pt-6">
                          <p
                            title={item.desc}
                            className="max-w-[40ch] text-[16px] leading-relaxed text-[var(--ink)]/75 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]"
                          >
                            {item.desc}
                          </p>
                        </div>

                        {/* Row 3: Metrics (fixed slot) */}
                        <div className="grid grid-cols-3 gap-6">
                          {metrics.slice(0, 3).map((metric) => (
                            <div key={metric.label} className="min-w-0">
                              <p className="text-[18px] font-semibold text-[var(--ink)] truncate">
                                {metric.value}
                              </p>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/55 truncate">
                                {metric.label}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Row 4: Spacer */}
                        <div />
                      </div>

                      {/* Right column */}
                      <div className="min-w-0 flex h-full flex-col">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/55">
                          Key Highlights
                        </p>

                        {/* Highlights fill available space; consistent rhythm */}
                        <ul className="mt-4 flex-1 space-y-4 overflow-hidden text-[14px] text-[var(--ink)]/75">
                          {highlights.map((highlight) => (
                            <li key={highlight} className="flex min-w-0 gap-3">
                              <span className="mt-[9px] h-1 w-5 shrink-0 rounded-full bg-[var(--accent)]/90" />
                              <span className="min-w-0 truncate">{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies pinned to bottom; prevent wrap-induced wobble */}
                        <div className="mt-6">
                          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/55">
                            Technologies
                          </p>
                          <div className="mt-3 flex flex-nowrap gap-2 overflow-hidden">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                title={tag}
                                className="max-w-[140px] rounded-full bg-[rgba(47,126,104,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/70 truncate"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
              <div
                aria-hidden="true"
                className="shrink-0 h-[420px] w-[40px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
