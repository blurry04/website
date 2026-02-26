"use client";

import { Mail, Github, Linkedin } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useActiveSectionContext } from "./ActiveSectionContext";

type ContactItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  hoverClass: string;
};

const CONTACTS: ContactItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gauravadvani/",
    icon: Linkedin,
    hoverClass: "hover:text-[#0a66c2]",
  },
  {
    label: "GitHub",
    href: "https://github.com/blurry04",
    icon: Github,
    hoverClass: "hover:text-[#181717]",
  },
  {
    label: "Email",
    href: "mailto:advani.g@northeastern.edu",
    icon: Mail,
    hoverClass: "hover:text-[#d93025]",
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0009-0006-9802-8635",
    icon: () => (
      <span className="text-[11px] font-semibold tracking-[0.18em]">OR</span>
    ),
    hoverClass: "hover:text-[#a6ce39]",
  },
];

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const { activeId } = useActiveSectionContext();
  const isFocused = activeId === "contact";

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1] as const,
            staggerChildren: 0.05,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div
      className="grid gap-6 sm:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid h-auto items-stretch gap-6 md:grid-cols-[30%_70%]">
        <div className="flex h-full max-w-[520px] flex-col gap-3">
          <p className="text-[14px] font-semibold uppercase tracking-[0.4em] text-[var(--muted)] drop-shadow-[0_4px_12px_rgba(32,36,43,0.18)] sm:text-[16px]">
            Next Chapter
          </p>
          <p className="mt-4 text-[14px] text-[var(--muted)] sm:mt-5 sm:text-[15px]">
            Focused on building systems that scale with clarity, reliability,
            and long-term intent. Execution stays disciplined and grounded in
            fundamentals, not noise or shortcuts.
          </p>
          <p className="mt-4 text-[14px] text-[var(--muted)] sm:mt-5 sm:text-[15px]">
            The next chapter begins where ambition meets structure and ideas
            become operational.
          </p>
        </div>

        <div className="contact-hang flex h-full flex-col items-start justify-center gap-4 md:items-center">
          <motion.div
            variants={itemVariants}
            whileHover={isFocused ? { y: -2, scale: 1.01 } : undefined}
            whileFocus={isFocused ? { y: -2, scale: 1.01 } : undefined}
            className="contact-hang__cta inline-flex items-center rounded-2xl border border-[var(--line)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] transition hover:bg-[var(--accent-soft)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]/60"
            tabIndex={0}
          >
            Let&apos;s talk Strategy!
          </motion.div>
          <div className="contact-hang__icons flex flex-wrap items-center justify-start gap-3 md:justify-center">
            {CONTACTS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={item.label}
                  variants={itemVariants}
                  whileHover={isFocused ? { y: -2, scale: 1.01 } : undefined}
                  whileFocus={isFocused ? { y: -2, scale: 1.01 } : undefined}
                  className={`inline-flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[var(--line)] text-[var(--accent)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]/60 ${item.hoverClass}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
