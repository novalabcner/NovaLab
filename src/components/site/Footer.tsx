import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-indigo text-ink border-t border-ink/15">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Wordmark className="text-[15px]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
            {site.city}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-[13px] text-ink/60">
          {site.social.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-ink transition-colors">
              {s.label}
            </a>
          ))}
          <Link to="/contact" className="hover:text-ink transition-colors">
            Contact
          </Link>
          <Link to="/join" className="hover:text-ink transition-colors">
            Join
          </Link>
        </div>
      </div>
    </footer>
  );
}
