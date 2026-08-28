import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "paper";
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.28em] ${
        tone === "paper" ? "text-cyan-soft" : "text-ink/45"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  tone = "ink",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-4xl md:text-5xl font-medium leading-tight tracking-tight">
        {title}
      </h2>
    </div>
  );
}
