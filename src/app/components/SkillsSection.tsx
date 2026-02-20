"use client";

import SkillsTicker from "./SkillsTicker";

export default function SkillsSection() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">Skills</p>
          <h2 className="heading-2 mt-2">
            Product strategy meets hands-on delivery.
          </h2>
        </div>
      </div>
      <SkillsTicker />
    </div>
  );
}
