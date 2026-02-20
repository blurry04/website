"use client";

import { useActiveSectionContext } from "./ActiveSectionContext";

type SectionFocusProps = {
  id: string;
  className?: string;
  disableFocus?: boolean;
  children: React.ReactNode;
};

export default function SectionFocus({
  id,
  className,
  disableFocus,
  children,
}: SectionFocusProps) {
  const { activeId } = useActiveSectionContext();
  const isActive = activeId === id;
  if (disableFocus) {
    return (
      <section id={id} data-section className={className}>
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      data-section
      className={[
        "scroll-mt-[96px]",
        "transition-[opacity,filter,transform] duration-500 ease-out",
        "motion-reduce:transition-none motion-reduce:transform-none",
        "focus-within:opacity-100 focus-within:blur-0 focus-within:scale-100",
        isActive
          ? "opacity-100 blur-0 scale-100"
          : "opacity-50 md:opacity-40 blur-[1px] md:blur-[2px] scale-[0.99] md:scale-[0.98]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </section>
  );
}
