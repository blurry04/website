"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const navRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const navItems = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" },
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
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationId = 0;
    let boost = 0;
    let lastScrollY = window.scrollY;

    const particleCount = 420;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.004,
      vy: (Math.random() - 0.5) * 0.004,
      radius: Math.random() * 1.4 + 1.0,
      alpha: Math.random() * 0.14 + 0.05,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const handleScroll = () => {
      const current = window.scrollY;
      const delta = Math.abs(current - lastScrollY);
      lastScrollY = current;
      boost = Math.min(0.9, boost + delta * 0.0002);
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      boost *= 0.95;
      const speedMultiplier = 1 + boost;

      for (const particle of particles) {
        particle.x += particle.vx * speedMultiplier;
        particle.y += particle.vy * speedMultiplier;

        if (particle.x < -0.05) particle.x = 1.05;
        if (particle.x > 1.05) particle.x = -0.05;
        if (particle.y < -0.05) particle.y = 1.05;
        if (particle.y > 1.05) particle.y = -0.05;

        const px = particle.x * width;
        const py = particle.y * height;

        ctx.beginPath();
        ctx.fillStyle = `rgba(32, 36, 43, ${particle.alpha})`;
        ctx.arc(px, py, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationId);
    };
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
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-reveal")
    );
    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-bg min-h-screen text-[15px]">
      <canvas className="dot-field" ref={canvasRef} aria-hidden="true" />
      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 pb-6 pt-8">
          <div className="flex flex-none items-center justify-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white font-semibold text-[var(--ink)]">
              GA
            </div>
            <div className="leading-none">
              <p className="font-name whitespace-nowrap text-lg font-semibold tracking-[0.22em] text-[var(--ink)]">
                GAURAV ADVANI
              </p>
              <p className="whitespace-nowrap text-[9px] tracking-[0.01em] text-muted">
                Software Developer / Product Manager
              </p>
            </div>
          </div>
          <div
            ref={navRef}
            className="nav-links flex min-w-0 flex-1 items-center justify-end gap-6 text-xs uppercase font-medium tracking-[0.28em]"
          >
            {navItems.slice(0, visibleCount).map((item) => (
              <a
                key={item.label}
                className="transition hover:text-[var(--ink)]"
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
            <span key={item.label} className="text-xs uppercase tracking-[0.28em]">
              {item.label}
            </span>
          ))}
        </div>
        {menuOpen && visibleCount < navItems.length && (
          <div className="mx-auto w-full max-w-6xl px-6 pb-6">
            <div className="surface-card rounded-2xl p-4 text-xs uppercase tracking-[0.24em] text-muted">
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

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24">
        <section className="grid gap-10 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <h1 className="display-1 font-space reveal">
              Uniting product vision and engineering rigor to create scalable experiences.
            </h1>
            <p className="body-lg reveal reveal-delay-1">
              Product Manager (Technical) with a full-stack background and an M.S. in
              Computer Science from Northeastern University. I translate data into
              decision-ready products and ship cross-functional roadmaps.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold reveal reveal-delay-2">
              <a
                className="rounded-full bg-[var(--ink)] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                href="#contact"
              >
                Let's collaborate
              </a>
              <a
                className="rounded-full border border-[var(--line)] px-6 py-3 text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-lg"
                href="#projects"
              >
                View projects
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end reveal reveal-delay-3">
            <div className="hero-portrait-frame">
              <img
                src="/website.png"
                alt="Gaurav Advani portrait"
                className="hero-portrait h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <span className="section-eyebrow hero-eyebrow font-space text-right reveal reveal-delay-4">
              Product · Tech · Strategy
            </span>
          </div>
        </section>

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

        <section id="experience" className="scroll-reveal grid gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Experience</p>
              <h2 className="heading-2 mt-2">
                Product and engineering leadership.
              </h2>
            </div>
          </div>
          <div className="timeline-line grid gap-6 rounded-3xl border border-[var(--line)] bg-white/70 p-6">
            {[
              {
                role: "Product Manager Intern (Technical)",
                org: "EmpoweRx / United States",
                time: "",
                points: [
                  "Led a Market Analysis Tool powered by BLS.gov APIs for county-level wage insights.",
                  "Acted as technical liaison between leadership, clients, vendors, and engineering.",
                  "Migrated AWS and GitHub infrastructure from vendors to in-house teams.",
                  "Owned product roadmap planning and execution aligned to business objectives.",
                  "Coordinated offshore engineering delivery, QA, releases, and production support.",
                ],
              },
              {
                role: "Full-Stack Developer Intern",
                org: "Ekahal / Mumbai, India",
                time: "",
                points: [
                  "Revamped dashboards and pages using HTML, Bootstrap 5, and React.js.",
                  "Refactored legacy components for 20% faster load times.",
                  "Improved chatbot UX for 10% higher engagement and aligned teams with Figma prototypes.",
                ],
              },
              {
                role: "Web Developer Intern",
                org: "KritexCo / Mumbai, India",
                time: "",
                points: [
                  "Built responsive landing pages that reduced bounce rate by 15%.",
                  "Developed React.js UI components and iterated with user feedback and A/B testing.",
                ],
              },
            ].map((item) => (
              <article key={item.role} className="grid gap-4 pl-10">
                <div className="flex items-start gap-4">
                  <span className="mt-2 flex h-6 w-6 items-center justify-center">
                    <span className="timeline-dot" />
                  </span>
                  <div>
                    <h3 className="heading-3">
                      {item.role}
                    </h3>
                    <p className="body-md">{item.org}</p>
                    {item.time && (
                      <p className="text-xs uppercase tracking-[0.22em] text-muted">
                        {item.time}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="grid gap-2 body-md">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-accent">-</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-reveal grid gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Projects</p>
              <h2 className="heading-2 mt-2">
                Selected builds with measurable impact.
              </h2>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Quill & Pigeon",
                subtitle: "Artist Analytics Dashboard",
                points: [
                  "Responsive analytics dashboard for email engagement, traffic, and sales insights.",
                  "Built with Next.js + TailwindCSS and modular component system.",
                  "Supabase Auth + real-time PostgreSQL data pipelines.",
                ],
              },
              {
                title: "Travelpedia",
                subtitle: "Android Travel Planner App",
                points: [
                  "Itinerary planning, expense tracking, and packing list management.",
                  "Java-based dynamic UI flows with conditional forms and date pickers.",
                  "Firebase Firestore real-time data with editing and deletion support.",
                ],
              },
              {
                title: "Crisis Communication App",
                subtitle: "UX/UI Design",
                points: [
                  "Peer-to-peer emergency comms prototype for low-connectivity regions.",
                  "Figma wireframes for offline messaging, status updates, and risk mapping.",
                  "Awarded \"Most Feasible Solution\" at Pine Tree Hackathon.",
                ],
              },
            ].map((item) => (
              <article key={item.title} className="surface-card rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  {item.subtitle}
                </p>
                <h3 className="heading-3 mt-3">
                  {item.title}
                </h3>
                <ul className="body-md mt-4 grid gap-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-accent">-</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-reveal grid gap-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Skills</p>
              <h2 className="heading-2 mt-2">
                Product strategy meets hands-on delivery.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Product & Strategy",
                items:
                  "Product Roadmapping, Market & Competitive Analysis, Stakeholder Management, Agile/Scrum, QA & Release Validation",
              },
              {
                title: "Languages",
                items: "TypeScript, JavaScript, Python, Java, PHP, SQL",
              },
              {
                title: "Frontend",
                items: "HTML, CSS, React.js, Next.js, TailwindCSS, Bootstrap 5",
              },
              {
                title: "Backend & Database",
                items:
                  "Node.js, Flask, Django, Supabase, Firebase, PostgreSQL, MySQL, MongoDB",
              },
              {
                title: "Mobile",
                items: "Android Development (Java/Kotlin)",
              },
              {
                title: "Tools & Platforms",
                items: "Git, GitHub, VSCode, AWS, Figma",
              },
            ].map((item) => (
              <div key={item.title} className="surface-card rounded-2xl p-5">
                <h3 className="heading-3">{item.title}</h3>
                <p className="body-md mt-2">{item.items}</p>
              </div>
            ))}
          </div>
          <div className="surface-card rounded-2xl p-5">
            <h3 className="heading-3">Other</h3>
            <p className="body-md mt-2">
              Responsive Design, Human-Centered Design, UI Prototyping
            </p>
          </div>
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
              className="rounded-full bg-[var(--ink)] px-6 py-3 text-white transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
              href="mailto:hello@gauravadvani.com"
            >
              hello@gauravadvani.com
            </a>
            <a
              className="rounded-full border border-[var(--line)] px-6 py-3 text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-lg"
              href="#"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-[var(--line)] px-6 py-3 text-[var(--ink)] transition hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-lg"
              href="#"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--line)] py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 text-xs uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026 Gaurav Advani</span>
          <span>Product / Technology / Design</span>
        </div>
      </footer>
    </div>
  );
}
