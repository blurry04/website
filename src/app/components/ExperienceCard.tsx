"use client";

import type { MouseEvent } from "react";

type Metric = { value: string; label: string };

export type ExperienceCardProps = {
  company: string;
  role: string;
  description: string;
  metrics: Metric[];
  tags: string[];
  variant?: "default" | "interactive";
  onTagClick?: (tag: string) => void;
};

const splitRole = (role: string) => {
  const open = role.indexOf("(");
  if (open === -1) return [role];
  const main = role.slice(0, open).trim();
  const detail = role.slice(open).trim();
  return [main, detail].filter(Boolean);
};

export default function ExperienceCard({
  company,
  role,
  description,
  metrics,
  tags,
  variant = "default",
  onTagClick,
}: ExperienceCardProps) {
  const roleLines = splitRole(role);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-[rgba(32,36,43,0.12)] bg-gradient-to-br from-white/90 via-[#f6f7f9]/85 to-[#eef1f6]/90 p-6 text-[var(--ink)] shadow-[0_10px_30px_rgba(32,36,43,0.08)] backdrop-blur-sm sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_10%_0%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.1)_40%,rgba(255,255,255,0)_70%)]" />
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.35em] text-muted">
            {company}
          </span>
          <h3 className="text-2xl font-semibold leading-tight text-[var(--ink)]">
            {roleLines.map((line, idx) => (
              <span key={`${line}-${idx}`} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-[var(--ink)]/75">
            {description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:pl-2">
          {metrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className="min-w-0">
              <p className="text-[26px] font-semibold leading-none text-[var(--ink)]">
                {metric.value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {variant === "interactive" ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  if (onTagClick) onTagClick(tag);
                }}
                className="rounded-full bg-[rgba(32,36,43,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/80 transition hover:bg-[rgba(32,36,43,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(32,36,43,0.4)]"
              >
                {tag}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
            {tags.map((tag, idx) => (
              <span key={tag}>
                {tag}
                {idx < tags.length - 1 ? " \u00b7 " : ""}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
