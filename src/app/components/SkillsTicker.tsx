"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TickerConfig = {
  id: string;
  items: string[];
  duration: number;
  direction: "left" | "right";
};

const TICKERS: TickerConfig[] = [
  {
    id: "strategy",
    items: [
      "Product Strategy",
      "Product Discovery",
      "Problem Framing",
      "Roadmapping",
      "MVP Definition",
      "Feature Prioritization",
      "End-to-End Ownership",
      "Outcome-Driven Development",
    ],
    duration: 46,
    direction: "left",
  },
  {
    id: "execution",
    items: [
      "Execution",
      "Sprint Planning",
      "Backlog Management",
      "Release Planning",
      "QA & Validation",
      "Iterative Delivery",
      "Production Readiness",
      "Shipping Products",
    ],
    duration: 32,
    direction: "right",
  },
  {
    id: "engineering",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "APIs",
      "Database Design",
      "Scalable Systems",
      "Cloud Infrastructure",
    ],
    duration: 34,
    direction: "left",
  },
  {
    id: "analytics",
    items: [
      "Data-Informed Decisions",
      "Metrics & KPIs",
      "Analytics Dashboards",
      "Experimentation",
      "A/B Testing",
      "Performance Analysis",
      "Insight-to-Action",
    ],
    duration: 38,
    direction: "right",
  },
];

export default function SkillsTicker() {
  const tickerRefs = useRef<HTMLDivElement[]>([]);
  const trackRefs = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLSpanElement[][]>([]);
  const tweens = useRef<gsap.core.Tween[]>([]);

  const configs = useMemo(() => TICKERS, []);

  useLayoutEffect(() => {
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const clampSpeed = gsap.utils.clamp(0.6, 1.8);

      tweens.current = trackRefs.current.map((track, i) => {
        const isLeft = configs[i].direction === "left";
        const fromX = isLeft ? -50 : 0;
        const toX = isLeft ? 0 : -50;
        return gsap.fromTo(
          track,
          { xPercent: fromX },
          {
            xPercent: toX,
            duration: configs[i].duration,
            ease: "none",
            repeat: -1,
          }
        );
      });

      // Center highlight effect
      const highlightTick = () => {
        tickerRefs.current.forEach((ticker, i) => {
          const items = itemRefs.current[i] || [];
          if (!ticker || items.length === 0) return;
          const rect = ticker.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;

          items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const dist = Math.abs(centerX - itemCenter);
            const maxDist = rect.width * 0.35;
            const progress = 1 - Math.min(dist / maxDist, 1);
            if (progress > 0.65) {
              item.classList.add("is-highlight");
            } else {
              item.classList.remove("is-highlight");
            }
            gsap.set(item, {
              opacity: 0.45 + progress * 0.55,
              scale: 0.92 + progress * 0.12,
              letterSpacing: `${0.02 + progress * 0.06}em`,
            });
          });
        });
      };

      gsap.ticker.add(highlightTick);

      // Scroll-driven speed boost
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const timeScale = clampSpeed(0.6 + Math.min(velocity / 1500, 1.2));
          tweens.current.forEach((tween) => tween.timeScale(timeScale));
        },
        onScrubComplete: () => {
          tweens.current.forEach((tween) => tween.timeScale(1));
        },
      });

      // Hover slow down
      tickerRefs.current.forEach((ticker, i) => {
        const tween = tweens.current[i];
        if (!ticker || !tween) return;
        const handleEnter = () => tween.timeScale(0.2);
        const handleLeave = () => tween.timeScale(1);
        ticker.addEventListener("pointerenter", handleEnter);
        ticker.addEventListener("pointerleave", handleLeave);

        cleanups.push(() => {
          ticker.removeEventListener("pointerenter", handleEnter);
          ticker.removeEventListener("pointerleave", handleLeave);
        });
      });

      cleanups.push(() => {
        gsap.ticker.remove(highlightTick);
        trigger.kill();
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [configs]);

  return (
    <div className="skills-tickers">
      {configs.map((ticker, i) => (
        <div
          key={ticker.id}
          className="skills-ticker"
          ref={(el) => {
            if (el) tickerRefs.current[i] = el;
          }}
        >
          <div
            className="skills-track"
            ref={(el) => {
              if (el) trackRefs.current[i] = el;
            }}
          >
            {[...ticker.items, ...ticker.items].flatMap((item, idx, arr) => {
              const nodes = [
                <span
                  key={`${ticker.id}-${idx}-${item}`}
                  className="skills-item"
                  ref={(el) => {
                    if (!itemRefs.current[i]) itemRefs.current[i] = [];
                    if (el) itemRefs.current[i][idx] = el;
                  }}
                >
                  {item}
                </span>,
              ];

              if (idx < arr.length - 1) {
                nodes.push(
                  <span key={`${ticker.id}-${idx}-sep`} className="skills-sep">
                    •
                  </span>
                );
              }

              return nodes;
            })}
          </div>
          <span className="skills-mask" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
