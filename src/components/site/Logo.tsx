import novaLabLogo from "@/assets/novalab-white.png";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={novaLabLogo}
      alt="NovaLab"
      className={`h-6 w-auto object-contain ${className}`}
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[0.8em] font-semibold tracking-[-0.08em] leading-none ${className}`}>
      NOVA<span className="text-cyan">LAB</span>
    </span>
  );
}
