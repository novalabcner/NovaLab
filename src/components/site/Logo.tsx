export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="10.25" strokeWidth="1" opacity="0.35" />
      <ellipse
        cx="12"
        cy="12"
        rx="10.25"
        ry="4.4"
        strokeWidth="1"
        transform="rotate(-28 12 12)"
      />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tight leading-none ${className}`}>
      NOVA<span className="text-cyan">LAB</span>
    </span>
  );
}
