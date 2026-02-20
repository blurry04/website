"use client";

import AboutCarousel3D from "./AboutCarousel3D";

export default function AboutSection() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-10 lg:grid-cols-[30%_70%] lg:items-stretch">
        <div>
          <p className="text-[16px] font-semibold uppercase tracking-[0.4em] text-[#5f6772] drop-shadow-[0_4px_12px_rgba(32,36,43,0.18)]">
            BUILT WITH INTENT
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-[#5f6772]">
            I work at the intersection of product clarity and technical execution, translating ambiguity into structured direction and scalable systems.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5f6772]">
            From roadmap planning to full-stack implementation, I focus on aligning teams around what matters and executing with precision.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5f6772]">
            The edge isn’t motion for the sake of progress; it’s clarity in decision-making and discipline in delivery.
          </p>
        </div>
        <div className="lg:pt-7 h-full">
          <AboutCarousel3D />
        </div>
      </div>
    </div>
  );
}
