"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const CARDS = [
  {
    title: "Product",
    description: "Turning ambiguity into structured direction and measurable outcomes.",
    bullets: [],
    chips: ["Vision", "Metrics", "Impact"],
  },
  {
    title: "Operations",
    description: "Execution discipline across teams and delivery cycles.",
    bullets: [],
    chips: ["QA", "Releases", "Execution"],
  },
  {
    title: "Design",
    description: "Human-centered systems shaped through clarity and iteration.",
    bullets: [],
    chips: ["UX", "Flows", "Prototypes"],
  },
  {
    title: "Technology",
    description: "Scalable systems built with performance and architecture in mind.",
    bullets: [],
    chips: ["Architecture", "Data", "Performance"],
  },
  {
    title: "Shipping",
    description: "From concept to release with structured execution and ownership.",
    bullets: [],
    chips: ["Build", "Iterate", "Deliver"],
  },
];

type Slot = {
  x: number;
  scale: number;
  rotationY: number;
  z: number;
  opacity: number;
  filter: string;
  boxShadow: string;
  contentOpacity: number;
  contentFilter: string;
};

type SlotConfig = {
  left: Slot;
  center: Slot;
  right: Slot;
  offLeft: Partial<Slot>;
  offRight: Partial<Slot>;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getSlotConfig = (
  viewportWidth: number,
  cardWidth: number,
  reducedMotion: boolean
): SlotConfig => {
  const baseLimit = Math.max(120, (viewportWidth - cardWidth) / 2);
  const base = Math.min(baseLimit, cardWidth * 1.05);
  const off = base * 2;
  const sideScale = reducedMotion ? 0.98 : 0.88;
  const centerScale = reducedMotion ? 1 : 1.04;
  const rotate = reducedMotion ? 0 : 45;
  const blur = reducedMotion ? "blur(0px)" : "blur(2px)";
  const sideOpacity = reducedMotion ? 0.9 : 0.65;

  return {
    left: {
      x: -base,
      scale: sideScale,
      rotationY: rotate,
      z: reducedMotion ? 0 : -80,
      opacity: 1,
      filter: "blur(0px)",
      boxShadow: "0 10px 24px rgba(32,36,43,0.08)",
      contentOpacity: sideOpacity,
      contentFilter: blur,
    },
    center: {
      x: 0,
      scale: centerScale,
      rotationY: 0,
      z: 0,
      opacity: 1,
      filter: "blur(0px)",
      boxShadow: "0 18px 36px rgba(32,36,43,0.10)",
      contentOpacity: 1,
      contentFilter: "blur(0px)",
    },
    right: {
      x: base,
      scale: sideScale,
      rotationY: -rotate,
      z: reducedMotion ? 0 : -80,
      opacity: 1,
      filter: "blur(0px)",
      boxShadow: "0 10px 24px rgba(32,36,43,0.08)",
      contentOpacity: sideOpacity,
      contentFilter: blur,
    },
    offLeft: {
      x: -off,
      opacity: 0,
      scale: sideScale,
      rotationY: 0,
      z: 0,
      filter: "blur(0px)",
    },
    offRight: {
      x: off,
      opacity: 0,
      scale: sideScale,
      rotationY: 0,
      z: 0,
      filter: "blur(0px)",
    },
  };
};

const AboutCarousel3D = () => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slotElsRef = useRef<{ left: HTMLDivElement | null; center: HTMLDivElement | null; right: HTMLDivElement | null }>({
    left: null,
    center: null,
    right: null,
  });
  const isAnimatingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const slotConfigRef = useRef<SlotConfig>(getSlotConfig(640, 240, false));
  const handleNextRef = useRef<() => void>(() => {});
  const [cardDims, setCardDims] = useState({ width: 240, height: 220 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [elementIndices, setElementIndices] = useState(() => {
    const left = (CARDS.length - 1 + CARDS.length) % CARDS.length;
    const center = 0;
    const right = 1 % CARDS.length;
    return { left, center, right };
  });

  const getIndexForElement = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return null;
      if (el === leftRef.current) return "left";
      if (el === centerRef.current) return "center";
      if (el === rightRef.current) return "right";
      return null;
    },
    []
  );

  const setElementIndex = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      const key = getIndexForElement(el);
      if (!key) return;
      setElementIndices((prev) => ({ ...prev, [key]: index }));
    },
    [getIndexForElement]
  );

  const applySlot = useCallback((el: HTMLDivElement | null, slot: Slot) => {
    if (!el) return;
    const content = el.querySelector<HTMLElement>(".about-card-inner");
    gsap.set(el, {
      x: slot.x,
      scale: slot.scale,
      rotationY: slot.rotationY,
      z: slot.z,
      opacity: slot.opacity,
      filter: slot.filter,
      boxShadow: slot.boxShadow,
    });
    if (content) {
      gsap.set(content, {
        opacity: slot.contentOpacity,
        filter: slot.contentFilter,
      });
    }
  }, []);

  const syncSlots = useCallback(() => {
    const { left, center, right } = slotElsRef.current;
    const config = slotConfigRef.current;
    applySlot(left, config.left);
    applySlot(center, config.center);
    applySlot(right, config.right);
  }, [applySlot]);

  const updateSlotConfig = useCallback(() => {
    const viewport = viewportRef.current;
    const viewportWidth = viewport?.clientWidth ?? window.innerWidth;
    const cardWidth = cardDims.width;
    slotConfigRef.current = getSlotConfig(viewportWidth, cardWidth, reducedMotionRef.current);
    syncSlots();
  }, [cardDims.width, syncSlots]);

  const scheduleAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      handleNextRef.current();
    }, 5000);
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    const { left, center, right } = slotElsRef.current;
    if (!left || !center || !right) return;

    const config = slotConfigRef.current;
    const nextIndex = (activeIndex + 1) % CARDS.length;
    const incomingIndex = (activeIndex + 2) % CARDS.length;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
      onComplete: () => {
        slotElsRef.current = { left: center, center: right, right: left };
        setActiveIndex(nextIndex);
        syncSlots();
        isAnimatingRef.current = false;
        scheduleAutoAdvance();
      },
    });

    tl.to(
      left,
      {
        x: (config.offLeft.x ?? -520),
        opacity: 0,
      },
      0
    )
      .to(
        center,
        {
          x: config.left.x,
          scale: config.left.scale,
          rotationY: config.left.rotationY,
          z: config.left.z,
          opacity: config.left.opacity,
          filter: config.left.filter,
          boxShadow: config.left.boxShadow,
        },
        0
      )
      .to(
        right,
        {
          x: config.center.x,
          scale: config.center.scale,
          rotationY: config.center.rotationY,
          z: config.center.z,
          opacity: config.center.opacity,
          filter: config.center.filter,
          boxShadow: config.center.boxShadow,
        },
        0
      )
      .add(() => {
        setElementIndex(left, incomingIndex);
        gsap.set(left, {
          x: config.offRight.x ?? 520,
          opacity: 0,
          scale: config.right.scale,
          rotationY: config.right.rotationY,
          z: config.right.z,
          filter: config.right.filter,
        });
      }, 0.32)
      .to(
        left,
        {
          x: config.right.x,
          scale: config.right.scale,
          rotationY: config.right.rotationY,
          z: config.right.z,
          opacity: config.right.opacity,
          filter: config.right.filter,
          boxShadow: config.right.boxShadow,
          duration: 0.32,
        },
        0.32
      );

    const leftInner = left.querySelector<HTMLElement>(".about-card-inner");
    const centerInner = center.querySelector<HTMLElement>(".about-card-inner");
    const rightInner = right.querySelector<HTMLElement>(".about-card-inner");
    if (leftInner && centerInner && rightInner) {
      tl.to(
        centerInner,
        { opacity: config.left.contentOpacity, filter: config.left.contentFilter },
        0
      )
        .to(
          rightInner,
          { opacity: config.center.contentOpacity, filter: config.center.contentFilter },
          0
        )
        .add(() => {
          gsap.set(leftInner, {
            opacity: config.right.contentOpacity,
            filter: config.right.contentFilter,
          });
        }, 0.32)
        .to(
          leftInner,
          { opacity: config.right.contentOpacity, filter: config.right.contentFilter, duration: 0.32 },
          0.32
        );
    }
  }, [activeIndex, scheduleAutoAdvance, setElementIndex, syncSlots]);

  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    const { left, center, right } = slotElsRef.current;
    if (!left || !center || !right) return;

    const config = slotConfigRef.current;
    const nextIndex = (activeIndex - 1 + CARDS.length) % CARDS.length;
    const incomingIndex = (activeIndex - 2 + CARDS.length) % CARDS.length;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
      onComplete: () => {
        slotElsRef.current = { left: right, center: left, right: center };
        setActiveIndex(nextIndex);
        syncSlots();
        isAnimatingRef.current = false;
        scheduleAutoAdvance();
      },
    });

    tl.to(
      right,
      {
        x: (config.offRight.x ?? 520),
        opacity: 0,
      },
      0
    )
      .to(
        center,
        {
          x: config.right.x,
          scale: config.right.scale,
          rotationY: config.right.rotationY,
          z: config.right.z,
          opacity: config.right.opacity,
          filter: config.right.filter,
          boxShadow: config.right.boxShadow,
        },
        0
      )
      .to(
        left,
        {
          x: config.center.x,
          scale: config.center.scale,
          rotationY: config.center.rotationY,
          z: config.center.z,
          opacity: config.center.opacity,
          filter: config.center.filter,
          boxShadow: config.center.boxShadow,
        },
        0
      )
      .add(() => {
        setElementIndex(right, incomingIndex);
        gsap.set(right, {
          x: config.offLeft.x ?? -520,
          opacity: 0,
          scale: config.left.scale,
          rotationY: config.left.rotationY,
          z: config.left.z,
          filter: config.left.filter,
        });
      }, 0.32)
      .to(
        right,
        {
          x: config.left.x,
          scale: config.left.scale,
          rotationY: config.left.rotationY,
          z: config.left.z,
          opacity: config.left.opacity,
          filter: config.left.filter,
          boxShadow: config.left.boxShadow,
          duration: 0.32,
        },
        0.32
      );

    const leftInner = left.querySelector<HTMLElement>(".about-card-inner");
    const centerInner = center.querySelector<HTMLElement>(".about-card-inner");
    const rightInner = right.querySelector<HTMLElement>(".about-card-inner");
    if (leftInner && centerInner && rightInner) {
      tl.to(
        centerInner,
        { opacity: config.right.contentOpacity, filter: config.right.contentFilter },
        0
      )
        .to(
          leftInner,
          { opacity: config.center.contentOpacity, filter: config.center.contentFilter },
          0
        )
        .add(() => {
          gsap.set(rightInner, {
            opacity: config.left.contentOpacity,
            filter: config.left.contentFilter,
          });
        }, 0.32)
        .to(
          rightInner,
          { opacity: config.left.contentOpacity, filter: config.left.contentFilter, duration: 0.32 },
          0.32
        );
    }
  }, [activeIndex, scheduleAutoAdvance, setElementIndex, syncSlots]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const compute = () => {
      const height = viewport.clientHeight || 310;
      const width = viewport.clientWidth || 640;
      const cardHeight = clamp(Math.round(height * 0.78), 200, 340);
      const cardWidth = clamp(Math.round(cardHeight * 0.9), 200, 300);
      setCardDims({ width: cardWidth, height: cardHeight });
      slotConfigRef.current = getSlotConfig(width, cardWidth, reducedMotionRef.current);
      syncSlots();
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [syncSlots]);

  useLayoutEffect(() => {
    slotElsRef.current = {
      left: leftRef.current,
      center: centerRef.current,
      right: rightRef.current,
    };
    syncSlots();
  }, [syncSlots]);

  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMedia = () => {
      reducedMotionRef.current = media.matches;
      updateSlotConfig();
    };
    handleMedia();
    if (media.addEventListener) {
      media.addEventListener("change", handleMedia);
    } else {
      media.addListener(handleMedia);
    }

    window.addEventListener("resize", updateSlotConfig);
    scheduleAutoAdvance();

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleMedia);
      } else {
        media.removeListener(handleMedia);
      }
      window.removeEventListener("resize", updateSlotConfig);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [scheduleAutoAdvance, updateSlotConfig]);

  const leftCard = useMemo(() => CARDS[elementIndices.left], [elementIndices.left]);
  const centerCard = useMemo(() => CARDS[elementIndices.center], [elementIndices.center]);
  const rightCard = useMemo(() => CARDS[elementIndices.right], [elementIndices.right]);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start lg:items-end lg:justify-start">
      <div
        ref={viewportRef}
        className="relative h-full min-h-[341px] w-full max-w-[77vw] overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute inset-0">
          <div
            ref={leftRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[#d8dde3] bg-[#f6f7f9] p-6 text-[#20242b] shadow-sm"
            style={{ width: cardDims.width, height: cardDims.height }}
            tabIndex={0}
            role="group"
            aria-label={leftCard.title}
          >
            <div className="about-card-inner flex h-full flex-col">
              <div className="about-card-text flex-[0_0_25%]">
                <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-[#5f6772]">
                  {leftCard.title}
                </p>
                <span className="mt-2 block h-px w-10 bg-[#d8dde3]" />
              </div>
              <div className="about-card-text flex-[0_0_35%] flex items-center">
                <p className="text-[12px] text-[#5f6772]">{leftCard.description}</p>
              </div>
              <div className="flex-[0_0_40%] flex items-end">
                <div className="flex flex-wrap gap-2">
                  {leftCard.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#b9c8c2] bg-[#e4f1ec] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#5f6772]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={centerRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[#d8dde3] bg-[#f6f7f9] p-6 text-[#20242b]"
            style={{ width: cardDims.width, height: cardDims.height }}
            tabIndex={0}
            role="group"
            aria-label={centerCard.title}
          >
            <div className="about-card-inner flex h-full flex-col">
              <div className="about-card-text flex-[0_0_25%]">
                <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-[#5f6772]">
                  {centerCard.title}
                </p>
                <span className="mt-2 block h-px w-10 bg-[#d8dde3]" />
              </div>
              <div className="about-card-text flex-[0_0_35%] flex items-center">
                <p className="text-[12px] text-[#5f6772]">{centerCard.description}</p>
              </div>
              <div className="flex-[0_0_40%] flex items-end">
                <div className="flex flex-wrap gap-2">
                  {centerCard.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#b9c8c2] bg-[#e4f1ec] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#5f6772]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={rightRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[#d8dde3] bg-[#f6f7f9] p-6 text-[#20242b] shadow-sm"
            style={{ width: cardDims.width, height: cardDims.height }}
            tabIndex={0}
            role="group"
            aria-label={rightCard.title}
          >
            <div className="about-card-inner flex h-full flex-col">
              <div className="about-card-text flex-[0_0_25%]">
                <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-[#5f6772]">
                  {rightCard.title}
                </p>
                <span className="mt-2 block h-px w-10 bg-[#d8dde3]" />
              </div>
              <div className="about-card-text flex-[0_0_35%] flex items-center">
                <p className="text-[12px] text-[#5f6772]">{rightCard.description}</p>
              </div>
              <div className="flex-[0_0_40%] flex items-end">
                <div className="flex flex-wrap gap-2">
                  {rightCard.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#b9c8c2] bg-[#e4f1ec] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#5f6772]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutCarousel3D;
