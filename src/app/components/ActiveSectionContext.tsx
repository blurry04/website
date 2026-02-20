"use client";

import { createContext, useContext } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

type ActiveSectionContextValue = {
  activeId: string;
  visibilityMap: Record<string, number>;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeId: "",
  visibilityMap: {},
});

export function ActiveSectionProvider({
  sectionIds,
  children,
}: {
  sectionIds: string[];
  children: React.ReactNode;
}) {
  const { activeId, visibilityMap } = useActiveSection(sectionIds);

  return (
    <ActiveSectionContext.Provider value={{ activeId, visibilityMap }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  return useContext(ActiveSectionContext);
}
