"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useActiveSectionContext } from "./ActiveSectionContext";

export default function HeaderNav() {
  const navItems = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Impact", href: "#impact" },
      { label: "Skills", href: "#skills" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const { activeId } = useActiveSectionContext();
  const [visibleCount, setVisibleCount] = useState(navItems.length);
  const navRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gap = 24;
    const hamburgerSpace = 44;

    const evaluate = () => {
      if (!navRef.current || !measureRef.current) {
        return;
      }
      const available = navRef.current.getBoundingClientRect().width;
      const items = Array.from(measureRef.current.children) as HTMLElement[];
      let used = 0;
      let count = 0;

      for (let i = 0; i < items.length; i += 1) {
        const width = items[i].offsetWidth;
        const nextUsed = used === 0 ? width : used + gap + width;
        const reserve = i < items.length - 1 ? hamburgerSpace : 0;
        if (nextUsed + reserve <= available) {
          used = nextUsed;
          count = i + 1;
        } else {
          break;
        }
      }
      setVisibleCount(count);
      if (count === items.length) {
        setMenuOpen(false);
      }
    };

    evaluate();
    const resizeObserver = new ResizeObserver(evaluate);
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }
    window.addEventListener("resize", evaluate);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", evaluate);
    };
  }, [navItems.length]);

  const activeSection = activeId && activeId !== "home" ? `#${activeId}` : "";

  return (
    <header className="site-header sticky top-0 z-20">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 pb-4 pt-6">
        <div className="flex flex-none items-center justify-start gap-3">
          <img
            className="header-avatar"
            src="/Confident%20style%20and%20charm.png"
            alt="Gaurav portrait"
          />
          <div className="leading-none name-block">
            <p className="name-text font-name whitespace-nowrap text-base font-semibold tracking-[0.06em] text-[var(--ink)]">
              GAURAV ADVANI
            </p>
            <div className="title-marquee">
              <span className="title-marquee__track">
                AI/ML · Full Stack · Product · Strategy · UI/UX
              </span>
            </div>
          </div>
        </div>
        <div
          ref={navRef}
          className="nav-links flex min-w-0 flex-1 items-center justify-end gap-6 text-xs uppercase font-medium tracking-[0.26em]"
        >
          {navItems.slice(0, visibleCount).map((item) => (
            <a
              key={item.label}
              className={`transition hover:text-[var(--ink)] ${
                activeSection === item.href ? "nav-active" : ""
              }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          {visibleCount < navItems.length && (
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center text-muted transition hover:text-[var(--ink)]"
            >
              <span className="flex h-3 w-4 flex-col justify-between">
                <span className="h-[2px] w-full rounded bg-[currentColor]" />
                <span className="h-[2px] w-full rounded bg-[currentColor]" />
                <span className="h-[2px] w-full rounded bg-[currentColor]" />
              </span>
            </button>
          )}
        </div>
      </div>
      <div
        ref={measureRef}
        className="pointer-events-none absolute -top-24 left-0 flex gap-6 opacity-0"
        aria-hidden="true"
      >
        {navItems.map((item) => (
          <span key={item.label} className="text-sm uppercase tracking-[0.26em]">
            {item.label}
          </span>
        ))}
      </div>
      {menuOpen && visibleCount < navItems.length && (
        <div className="mx-auto flex w-full max-w-7xl justify-end px-6 pb-6">
          <div className="surface-card w-[240px] rounded-2xl p-4 text-xs uppercase tracking-[0.24em] text-muted shadow-lg">
            <div className="grid gap-3">
              {navItems.slice(visibleCount).map((item) => (
                <a
                  key={item.label}
                  className="flex items-center justify-between border-b border-[var(--line)] pb-2 last:border-none last:pb-0 hover:text-[var(--ink)]"
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <span className="text-muted">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
