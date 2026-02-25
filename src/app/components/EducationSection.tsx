"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useActiveSectionContext } from "./ActiveSectionContext";

const EDUCATION = [
  {
    university: "Northeastern University",
    degree: "M.S. Computer Science · Jan 2024 – May 2026",
    taRole: "Graduate Teaching Assistant",
    taImpact: "Built grading frameworks and coached ML foundations labs.",
    coursework: [
      "Algorithms",
      "Human-Computer Interaction",
      "AI Foundations",
      "Machine Learning",
      "Natural Language Processing",
    ],
    learned: [
      "Technical foundation across Relevant Coursework and Projects.",
      "Applied ML and AI concepts to real-world problem solving, focusing on performance and model behavior",
      "Strengthened product thinking through HCI principles, usability testing, and UI/UX design",
      "Emphasis on structured problem-solving, optimization, and production-ready implementation",
    ],
    cgpa: "CGPA: 3.95",
    roles: ["Teaching Assistant · Khoury College", "Coursework Support · AI/ML", "President · Roux Gaming Club", " Member · Roux Coywolves Football Team"],
  },
  {
    university: "Mumbai University, India",
    degree: "B.E. Computer Science · May 2023",
    taRole: "Lab Mentor",
    taImpact: "Guided peers through systems labs and code reviews.",
    coursework: ["Data Structures", "Operating Systems", "Databases", "Networks"],
    learned: [
      "Explored Internet Programming, connecting backend logic, databases, and client-facing interfaces",
      "Applied object-oriented design and algorithmic thinking to develop scalable, maintainable systems",
      "Developed early exposure to Machine Learning and Artificial Intelligence concepts",
      "Strengthened analytical reasoning and computational thinking that later translated into internship execution and production-level development",
    ],
    cgpa: "CGPA: 3.40",
    roles: ["Cricket, Football & Basketball Teams", "Secretary · Rotaract Club of TSEC", "PR & Editorial Head · TSEC Codestorm"],              
  },
];

export default function EducationSection() {
  const prefersReducedMotion = useReducedMotion();
  const { activeId } = useActiveSectionContext();
  const isFocused = activeId === "education";

  const sectionVariants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion ? {} : { staggerChildren: 0.06 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: "easeOut" },
    },
  };

  const taVariants = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delay: 0.12, duration: 0.35, ease: "easeOut" },
    },
  };

  const pillContainer = {
    hidden: {},
    show: {
      transition: prefersReducedMotion ? {} : { staggerChildren: 0.03, delayChildren: 0.15 },
    },
  };

  const pillItem = {
    hidden: { opacity: 0, y: 4 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.25 },
    },
  };

  const learnedVariants = {
    hidden: { opacity: 0, y: 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delay: 0.25, duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="grid gap-6"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div>
        <p className="text-[16px] font-semibold uppercase tracking-[0.4em] text-[var(--muted)] drop-shadow-[0_4px_12px_rgba(32,36,43,0.18)]">
          EDUCATION
        </p>
      </div>

      <div className="grid gap-6">
        {EDUCATION.map((item) => (
          <motion.article
            key={item.university}
            tabIndex={0}
            variants={cardVariants}
            whileHover={
              isFocused
                ? {
                    y: -3,
                    scale: 1.01,
                    boxShadow: "0 24px 48px rgba(32,36,43,0.12)",
                  }
                : undefined
            }
            whileFocus={
              isFocused
                ? {
                    y: -3,
                    scale: 1.01,
                    boxShadow: "0 24px 48px rgba(32,36,43,0.12)",
                  }
                : undefined
            }
            className="surface-card rounded-3xl p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
          >
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="grid gap-5">
                <div>
                  <h3 className="text-[22px] font-semibold text-[var(--ink)] sm:text-[26px]">
                    {item.university}
                  </h3>
                  <p className="mt-2 text-[14px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {item.degree}
                  </p>
                </div>

                <motion.div
                  variants={taVariants}
                  className="rounded-2xl border-l-2 border-[var(--accent)] bg-[var(--accent-soft)]/70 px-4 py-3"
                >
                  <p className="text-[14px] font-semibold text-[var(--ink)]/85">
                    {item.taRole}
                  </p>
                  <p className="mt-1 text-[13px] text-[var(--muted)]">
                    {item.taImpact}
                  </p>
                </motion.div>

                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    Relevant Coursework
                  </p>
                  <motion.div
                    className="mt-3 flex flex-wrap gap-2"
                    variants={pillContainer}
                  >
                    {item.coursework.map((course) => (
                      <motion.span
                        key={course}
                        variants={pillItem}
                        className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
                      >
                        {course}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <motion.div variants={learnedVariants}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    What I Learned
                  </p>
                  <div className="mt-2 grid gap-2 text-[14px] text-[var(--ink)]/75">
                    {item.learned.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              </div>

                <div className="flex flex-col items-start gap-4">
                  <div className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]/70">
                    {item.cgpa}
                  </div>
                <div className="mt-6 grid gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--muted)] md:mt-10">
                  {item.roles.map((role) => (
                    <div key={role} className="flex items-center gap-2">
                      <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent)]/60" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
