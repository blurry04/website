"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export type ProjectItem = {
  title: string;
  subtitle: string;
  points: string[];
  githubUrl: string;
  liveUrl?: string;
};

type Projects3DProps = {
  items: ProjectItem[];
};

export default function Projects3D({ items }: Projects3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const baseTilt = -45;
  const baseX = prefersReducedMotion ? 0 : 2;
  const activeZ = prefersReducedMotion ? 40 : 120;
  const activeY = prefersReducedMotion ? -2 : -8;
  const activeScale = prefersReducedMotion ? 1.005 : 1.02;
  const dimZ = prefersReducedMotion ? 0 : -50;
  const dimBlur = prefersReducedMotion ? "blur(0px)" : "blur(1px)";

  const getState = (index: number) => {
    if (activeIndex === null) return "idle";
    return activeIndex === index ? "active" : "dim";
  };

  const spring = useMemo(
    () => ({
      type: "spring" as const,
      stiffness: 240,
      damping: 24,
      mass: 0.8,
    }),
    []
  );

  return (
    <div
      className="relative w-full"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 35%" }}
      onPointerDown={() => setActiveIndex(null)}
    >
      <div
        // Allow translateZ to render without clipping.
        className="grid gap-6 overflow-visible sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((project, index) => {
          const state = getState(index);
          const isActive = state === "active";
          const primaryUrl = project.liveUrl ?? project.githubUrl;

          return (
            <motion.article
              key={project.title}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onTap={() => setActiveIndex(index)}
              onPointerDown={(event) => event.stopPropagation()}
              animate={
                state === "active"
                  ? {
                      rotateX: 0,
                      rotateY: 0,
                      z: activeZ,
                      y: activeY,
                      scale: activeScale,
                      opacity: 1,
                      filter: "blur(0px)",
                    }
                  : state === "dim"
                    ? {
                        rotateX: baseX,
                        rotateY: baseTilt,
                        z: dimZ,
                        y: 0,
                        scale: 1,
                        opacity: 0.65,
                        filter: dimBlur,
                      }
                    : {
                        rotateX: baseX,
                        rotateY: baseTilt,
                        z: prefersReducedMotion ? 0 : -20,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                      }
              }
              transition={spring}
              className="relative h-[320px] rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-6 text-[var(--ink)] shadow-[0_20px_40px_rgba(32,36,43,0.08)] transition-shadow focus-within:ring-2 focus-within:ring-[var(--accent)]/50"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, filter, opacity",
                boxShadow: isActive
                  ? "0 30px 60px rgba(32,36,43,0.16)"
                  : "0 20px 40px rgba(32,36,43,0.08)",
              }}
            >
              <a
                href={primaryUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title}`}
                className="absolute inset-0 z-0"
              />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--ink)]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{project.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} live`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition hover:-translate-y-0.5 hover:text-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
                      onPointerDown={(event) => event.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} GitHub`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition hover:-translate-y-0.5 hover:text-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <ul className="relative z-10 mt-4 grid gap-2 text-sm text-[var(--ink)]">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
