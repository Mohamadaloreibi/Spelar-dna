import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ eyebrow, title, children, className = "" }: Props) {
  return (
    <div className={`rounded-2xl border border-line bg-card p-5 ${className}`}>
      {eyebrow && (
        <h3 className="mb-1 font-mono text-[11px] uppercase tracking-widest text-muted">
          {eyebrow}
        </h3>
      )}
      {title && (
        <div className="mb-4 font-display text-xl tracking-wide">{title}</div>
      )}
      {children}
    </div>
  );
}
