"use client";

export default function EducationSection() {
  return (
    <div className="grid gap-6">
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
          <h3 className="heading-3 mt-3">M.S. Computer Science</h3>
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
    </div>
  );
}
