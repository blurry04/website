export default function SiteFooter() {
  const year = new Date().getFullYear();
  const tech = [
    "Babel",
    "CSS",
    "ESLint",
    "Framer Motion",
    "GSAP",
    "Lucide React",
    "Next.js (App Router)",
    "PostCSS",
    "React",
    "React DOM",
    "Tailwind CSS",
    "TypeScript",
  ];
  return (
    <footer className="relative z-10 mt-16 border-t border-[var(--line)] py-2">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 text-[13px] text-[var(--muted)]">
        <div className="footer-ticker">
          <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]/70">
            Powered By
          </div>
          <div className="footer-track">
            {[0, 1].map((row) => (
              <div key={row} className="footer-row">
                {tech.map((item, idx) => (
                  <span key={`${item}-${row}-${idx}`} className="footer-item">
                    {item}
                    {idx < tech.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <img
              src="/bg_logo.png"
              alt="Gaurav Advani logo"
              className="h-8 w-8 rounded-full object-contain"
            />
            <p className="text-base font-semibold text-[var(--ink)]/80">
              Gaurav Advani
            </p>
          </div>
          <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--muted)]/70">
            © {year} Gaurav Advani
          </p>
        </div>
      </div>
    </footer>
  );
}
