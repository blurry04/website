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
import HeaderNav from "./components/HeaderNav";
import AboutSection from "./components/AboutSection";
import ImpactSection from "./components/ImpactSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";
import { ActiveSectionProvider } from "./components/ActiveSectionContext";
import SectionFocus from "./components/SectionFocus";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [metricIndex, setMetricIndex] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const slotRefs = useRef<HTMLDivElement[]>([]);
  const operatorRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const meshRef = useRef<HTMLDivElement | null>(null);


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

  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="page-bg text-[15px]">
      <div className="mouse-glow" ref={glowRef} aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
      <div className="fluid-compare" aria-hidden="true">
        <div className="fluid-half fluid-mesh" ref={meshRef} />
      </div>
      <ActiveSectionProvider
        sectionIds={["home", "about", "impact", "skills", "education", "contact"]}
      >
        <HeaderNav />

        <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-2 pt-[20px]">
          <SectionFocus id="home" disableFocus>
            <div className="min-h-[80vh] flex flex-col justify-between">
              <div className="flex w-full justify-center">
                <span className="status-pill status-pill--header">
                  <span className="status-dot" aria-hidden="true" />
                  OPEN TO PRODUCT AND TECH
                </span>
              </div>
              <div className="grid gap-10 pt-0 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
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
              </div>
              <div className="-mt-[12px] flex w-full justify-center">
                <svg
                  className="react-icon react-spin text-[#5f6772]"
                  viewBox="-11.5 -10.23174 23 20.46348"
                  width="20"
                  height="20"
                  role="img"
                  aria-label="React"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </g>
                  <circle r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="-mt-[12px] flex w-full justify-center">
                <p
                  ref={heroHeadlineRef}
                  className="hero-flow font-space text-center text-[18px] font-semibold text-[#111317] uppercase md:text-[18px] lg:text-[18px] text-shadow-sm headline-shadow"
                >
                  Building software where{" "}
                  <span className="gradient-wave">strategy</span>{" "}
                  <span className="headline-and">and</span>{" "}
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
            </div>
          </SectionFocus>

          <SectionFocus id="about">
            <AboutSection />
          </SectionFocus>
          <SectionFocus id="impact" className="w-full">
            <ImpactSection />
          </SectionFocus>
          <SectionFocus id="skills">
            <SkillsSection />
          </SectionFocus>
          <SectionFocus id="education">
            <EducationSection />
          </SectionFocus>
          <SectionFocus id="contact">
            <ContactSection />
          </SectionFocus>
        </main>
      </ActiveSectionProvider>
      <ChevronDown
        className={`scroll-hint-fixed${showScrollHint ? "" : " scroll-hint-hidden"}`}
        aria-hidden="true"
      />
    </div>
  );
}
