"use client";

import { useEffect, useMemo, useState } from "react";

type VisibilityMap = Record<string, number>;

const buildThresholds = () =>
  Array.from({ length: 21 }, (_, i) => Number((i / 20).toFixed(2)));

export function useActiveSection(sectionIds: string[]) {
  const thresholds = useMemo(buildThresholds, []);
  const [visibilityMap, setVisibilityMap] = useState<VisibilityMap>(() =>
    Object.fromEntries(sectionIds.map((id) => [id, 0]))
  );
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibilityMap((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            next[entry.target.id] = entry.intersectionRatio;
          });
          return next;
        });
      },
      { threshold: thresholds }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, thresholds]);

  useEffect(() => {
    let bestId = "";
    let bestRatio = -1;
    sectionIds.forEach((id) => {
      const ratio = visibilityMap[id] ?? 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    });
    if (bestId) {
      setActiveId(bestId);
    }
  }, [sectionIds, visibilityMap]);

  return { activeId, visibilityMap };
}
