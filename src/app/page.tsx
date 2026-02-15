"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  ChevronDown,
  Compass,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Scale,
  ShieldCheck,
  Ship,
  Users,
  Workflow,
} from "lucide-react";
import SkillsTicker from "./components/SkillsTicker";
import ImpactExperience from "./components/ImpactExperience";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");
  const [metricIndex, setMetricIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const navRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const slotRefs = useRef<HTMLDivElement[]>([]);
  const operatorRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const meshRef = useRef<HTMLDivElement | null>(null);

  const heroImage = "/Confident%20style%20and%20charm.png";

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
  const [visibleCount, setVisibleCount] = useState(navItems.length);

  const heroMetrics = useMemo(
    () => [
      { value: "12+", label: "Projects built across web, mobile, and analytics" },
      { value: "35+", label: "Features, dashboards, and workflows shipped" },
      { value: "6+", label: "Products taken from early idea to production-ready execution" },
      { value: "5+", label: "Technologies used in real production environments" },
      { value: "4+", label: "Cross-functional teams collaborated with" },
      { value: "20+", label: "Product iterations, releases, or meaningful improvements" },
      { value: "15%", label: "Increase in performance, usability, or engagement improvements delivered" },
      { value: "100%", label: "Ownership across product thinking and technical execution" },
    ],
    []
  );

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      document.documentElement.classList.add("scrolling");
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        document.documentElement.classList.remove("scrolling");
      }, 180);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, []);

  useEffect(() => {
    const updateHint = () => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setShowScrollHint(window.scrollY < maxScroll - 2);
    };
    updateHint();
    window.addEventListener("scroll", updateHint, { passive: true });
    window.addEventListener("resize", updateHint);
    return () => {
      window.removeEventListener("scroll", updateHint);
      window.removeEventListener("resize", updateHint);
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const chunks = [heroHeadlineRef.current].filter(Boolean) as Element[];
      if (chunks.length) {
        gsap.set(chunks, { opacity: 1, y: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const chunks = [heroHeadlineRef.current].filter(Boolean) as Element[];

      if (chunks.length) {
        gsap.set(chunks, { opacity: 0, y: 10 });
        const tl = gsap.timeline();
        tl.to(chunks, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
        });

      }

      if (heroBgRef.current) {
        ScrollTrigger.create({
          trigger: heroTextRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          animation: gsap.fromTo(
            heroBgRef.current,
            { y: -10 },
            { y: 10, ease: "none" }
          ),
        });
      }
    }, heroTextRef);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const rect = mesh.getBoundingClientRect();
      const mx = (event.clientX - rect.left) / rect.width;
      const my = (event.clientY - rect.top) / rect.height;
      const meshX = 50 + (mx - 0.5) * 18;
      const meshY = 50 + (my - 0.5) * 18;
      mesh.style.setProperty("--mx", `${meshX.toFixed(2)}%`);
      mesh.style.setProperty("--my", `${meshY.toFixed(2)}%`);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

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

  useEffect(() => {
    if (!heroRef.current) {
      return;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      return;
    }

    const ctx = gsap.context(() => {
      const outline = ".snake-border";
      const shine = ".shine-sweep";

      gsap.set(shine, {
        opacity: 0,
        attr: { x: -2200, y: 1400 },
      });
      gsap.set(outline, { opacity: 0.5 });

      gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } })
        .to(shine, { opacity: 0.7, duration: 0.45 })
        .to(shine, { attr: { x: 2600, y: -1800 }, duration: 3.5 }, "<")
        .to(shine, { opacity: 0, duration: 0.35 }, "-=0.2")
        .to(outline, { opacity: 0.75, duration: 0.8 }, 0.2)
        .to(outline, { opacity: 0.5, duration: 0.8 }, 1.2)
        .to({}, { duration: 6.5 }, ">-0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % heroMetrics.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [heroMetrics.length]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      return;
    }

    const metric = heroMetrics[metricIndex];
    const match = metric.value.match(/^(\d+)([%+]?)$/);
    const digits = match ? match[1].split("") : ["0"];
    const operator = match ? match[2] : "";
    const digitHeight = 28;

    // Animate digit reels
    digits.forEach((digit, i) => {
      const reel = slotRefs.current[i];
      if (!reel) return;
      const start = -digitHeight * (Math.floor(Math.random() * 10));
      const end = -digitHeight * Number(digit);
      gsap.set(reel, { y: start });
      gsap.to(reel, { y: end, duration: 1.4, ease: "power2.out" });
    });

    if (operatorRef.current) {
      gsap.fromTo(
        operatorRef.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
    }
  }, [metricIndex, heroMetrics]);


  useEffect(() => {
    if (!glowRef.current) {
      return;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      return;
    }

    const glow = glowRef.current;
    const moveX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    const moveY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });
    gsap.set(glow, { x: window.innerWidth * 0.6, y: window.innerHeight * 0.2 });

    const handleMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-reveal")
    );
    if (elements.length === 0) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    elements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 18, filter: "blur(6px)" });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power2.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (sections.length === 0) {
      return;
    }

    const lastEntries = new Map<Element, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY <= 0) {
          setActiveSection("");
          return;
        }
        entries.forEach((entry) => lastEntries.set(entry.target, entry));

        let best: IntersectionObserverEntry | null = null;
        let bestArea = 0;

        for (const entry of lastEntries.values()) {
          if (!entry.isIntersecting) continue;
          const area = entry.intersectionRect.width * entry.intersectionRect.height;
          if (area > bestArea) {
            bestArea = area;
            best = entry;
          }
        }

        if (best?.target && (best.target as HTMLElement).id) {
          setActiveSection(`#${(best.target as HTMLElement).id}`);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-96px 0px 0px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScrollEdge = () => {
      const scrolled = Math.round(window.scrollY);
      const maxScroll = Math.round(
        document.documentElement.scrollHeight - window.innerHeight
      );

      if (scrolled <= 0) {
        setActiveSection("");
        return;
      }

      if (scrolled >= maxScroll - 2) {
        setActiveSection("#contact");
      }
    };

    window.addEventListener("scroll", handleScrollEdge, { passive: true });
    handleScrollEdge();

    return () => {
      window.removeEventListener("scroll", handleScrollEdge);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="page-bg min-h-screen text-[15px]">
      <div className="mouse-glow" ref={glowRef} aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
      <div className="fluid-compare" aria-hidden="true">
        <div className="fluid-half fluid-mesh" ref={meshRef} />
      </div>
      <header className="site-header sticky top-0 z-20">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 pb-4 pt-6">
          <div className="flex flex-none items-center justify-start gap-3">
            <img
              className="header-avatar"
              src={heroImage}
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

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-8 pt-[20px]">
        <div className="flex w-full justify-center">
          <span className="status-pill status-pill--header">
            <span className="status-dot" aria-hidden="true" />
            OPEN TO PRODUCT AND TECH
          </span>
        </div>
        <section className="grid gap-10 pt-0 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
          <div ref={heroTextRef} className="flex flex-col gap-6">
            <span className="font-space text-left text-[116px] font-black uppercase tracking-[-0.02em] leading-[0.88] text-white pts-shadow">
              <span className="block pts-line text-[#111317]" data-text="Product.">
                Product<span className="pts-dot">.</span>
              </span>
              <span className="block pts-line" data-text="Systems.">
                Systems<span className="pts-dot">.</span>
              </span>
              <span className="block pts-line text-[#4B5D7A]" data-text="Scale.">
                Scale<span className="pts-dot">.</span>
              </span>
            </span>
          </div>
          <div
            ref={heroRef}
            className="hero-media flex flex-col items-center justify-start gap-6"
          >
            <div className="hero-image-wrap hero-image-wrap--line">
              <img
                className="hero-editorial-image"
                src="/website.png"
                alt="Website preview"
              />
            </div>
          </div>
        </section>
        <div className="flex w-full justify-center mt-[30px]">
          <p
            ref={heroHeadlineRef}
            className="hero-flow font-space text-center text-[18px] font-semibold text-[#111317] uppercase md:text-[18px] lg:text-[18px] text-shadow-sm"
          >
            Building software where{" "}
            <span className="gradient-wave">strategy</span> and{" "}
            <span className="gradient-wave">engineering</span> move in sync.
          </p>
        </div>
        <div className="flex w-full justify-center">
          <div className="icon-row icon-row--dividers">
            <span className="icon-chip">
              <HeartHandshake className="icon-svg" />
              <span className="icon-label">Collab</span>
            </span>
            <span className="icon-chip">
              <BadgeCheck className="icon-svg" />
              <span className="icon-label">Quality</span>
            </span>
            <span className="icon-chip">
              <Users className="icon-svg" />
              <span className="icon-label">Leadership</span>
            </span>
            <span className="icon-chip">
              <Lightbulb className="icon-svg" />
              <span className="icon-label">Insight</span>
            </span>
            <span className="icon-chip">
              <Rocket className="icon-svg" />
              <span className="icon-label">Ship</span>
            </span>
          </div>
        </div>

        <section
          id="about"
          className="scroll-reveal grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="surface-card rounded-3xl p-7">
            <p className="section-eyebrow">About</p>
            <h2 className="heading-2 mt-4">
              Blending product vision with technical depth.
            </h2>
            <p className="body-md mt-4">
              I thrive at the intersection of business clarity and technical execution - mapping
              complex requirements into roadmap-ready plans, shaping UX flows, and partnering
              with engineering teams to deliver premium product experiences.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "PM + Strategy",
                detail:
                  "Roadmap planning, stakeholder alignment, market research, and KPI-driven prioritization.",
              },
              {
                title: "Technical Execution",
                detail:
                  "Full-stack execution with modern web stacks, API integrations, and system migrations.",
              },
              {
                title: "Design Collaboration",
                detail:
                  "Figma prototypes, human-centered UX, and accessibility-first flows for global teams.",
              },
              {
                title: "Operations",
                detail:
                  "QA validation, release coordination, and production reliability support.",
              },
            ].map((item) => (
              <div key={item.title} className="surface-card rounded-2xl p-5">
                <h3 className="heading-3">{item.title}</h3>
                <p className="body-md mt-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <ImpactExperience />

        <section id="skills" className="scroll-reveal grid gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Skills</p>
              <h2 className="heading-2 mt-2">
                Product strategy meets hands-on delivery.
              </h2>
            </div>
          </div>
          <SkillsTicker />
        </section>

        <section id="education" className="scroll-reveal grid gap-6">
          <div>
            <p className="section-eyebrow">Education</p>
            <h2 className="heading-2 mt-2">
              Academic foundations in computer science.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="surface-card rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                Northeastern University
              </p>
              <h3 className="heading-3 mt-3">
                M.S. Computer Science
              </h3>
              <p className="body-md mt-2">Jan 2024 - May 2026</p>
              <p className="body-md mt-3">
                Algorithms, Human-Computer Interaction, Mobile App Development, Artificial
                Intelligence, Machine Learning, Natural Language Processing.
              </p>
            </div>
            <div className="surface-card rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                Mumbai University, India
              </p>
              <h3 className="heading-3 mt-3">
                Bachelor of Engineering in Computer Science
              </h3>
              <p className="body-md mt-2">May 2023</p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-reveal grid gap-6 rounded-3xl border border-[var(--line)] bg-white/80 p-8"
        >
          <div className="flex flex-col gap-3">
            <p className="section-eyebrow">Contact</p>
            <h2 className="heading-2">
              Ready to build the next premium product experience.
            </h2>
            <p className="body-md">
              Open to product management, technical PM roles, and strategic collaborations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <a
              className="neon-button rounded-full bg-[var(--ink)] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
              href="mailto:hello@gauravadvani.com"
            >
              hello@gauravadvani.com
            </a>
            <a
              className="neon-button rounded-full border border-[var(--line)] px-6 py-3 text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-lg"
              href="#"
            >
              LinkedIn
            </a>
            <a
              className="neon-button rounded-full border border-[var(--line)] px-6 py-3 text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-lg"
              href="#"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>
      <ChevronDown
        className={`scroll-hint-fixed${showScrollHint ? "" : " scroll-hint-hidden"}`}
        aria-hidden="true"
      />

      <footer className="relative z-10 border-t border-[var(--line)] py-3">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-xs uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026 Gaurav Advani</span>
          <span>Product / Technology / Design</span>
        </div>
      </footer>
    </div>
  );
}
