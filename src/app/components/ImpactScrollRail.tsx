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
    const updateMeasures = () => {
      const rail = railRef.current;
      if (!rail) return;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const scrollWidth = rail.scrollWidth;
      const max = Math.max(0, scrollWidth - viewportWidth);
      const endPadding = 10;
      setMaxTranslate(max + endPadding);
      setSectionHeight((window.innerHeight || 0) + max + endPadding);
    };

    updateMeasures();
    window.addEventListener("resize", updateMeasures);
    return () => window.removeEventListener("resize", updateMeasures);
  }, [items.length]);

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
              className="flex h-full w-max items-start gap-6 px-6 will-change-transform"
            >
              {items.map((item) => (
                <article
                  key={item.title}
                  tabIndex={0}
                  className="shrink-0 w-[78vw] max-w-5xl h-[420px] rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-10 text-[var(--ink)] shadow-[0_20px_50px_rgba(32,36,43,0.12)] transition-[opacity,filter,transform] duration-500 ease-out focus:outline-none focus-within:opacity-100 focus-within:blur-0 focus-within:scale-100"
                >
                  <div className="grid h-full grid-cols-[1.05fr_0.95fr] gap-10">
                    <div className="flex flex-col">
                      {item.subtitle && (
                        <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                          {item.subtitle}
                        </p>
                      )}
                      <h3 className="mt-4 text-[44px] font-semibold leading-tight">
                        {item.title}
                      </h3>
                      {item.meta && (
                        <p className="mt-3 text-[13px] uppercase tracking-[0.18em] text-[var(--ink)]/60">
                          {item.meta}
                        </p>
                      )}
                      <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink)]/75">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex flex-col gap-8">
                      {item.highlights && item.highlights.length > 0 && (
                        <div>
                          <p className="text-[12px] uppercase tracking-[0.35em] text-[var(--ink)]/60">
                            Key Highlights
                          </p>
                          <ul className="mt-4 grid gap-3 text-[14px] text-[var(--ink)]/75">
                            {item.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-3">
                                <span className="mt-2 h-1 w-5 rounded-full bg-[var(--accent)]" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div>
                          <p className="text-[12px] uppercase tracking-[0.35em] text-[var(--ink)]/60">
                            Technologies
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[var(--line)] px-3 py-1 text-[12px] uppercase tracking-[0.18em] text-[var(--ink)]/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
