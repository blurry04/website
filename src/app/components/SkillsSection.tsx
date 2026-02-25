"use client";

import SkillsTicker from "./SkillsTicker";

export default function SkillsSection() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[16px] font-semibold uppercase tracking-[0.4em] text-[var(--muted)] drop-shadow-[0_4px_12px_rgba(32,36,43,0.18)]">
            Core Capabilities
          </p>
        </div>
      </div>
      <SkillsTicker />
    </div>
  );
}
