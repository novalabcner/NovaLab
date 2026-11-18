import { Link } from "@tanstack/react-router";
import { disciplines, nav, site } from "@/content/site";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-indigo text-ink">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20">
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark className="text-xl" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink/55">
              A student-led science collective at {site.school}, {site.city}.
            </p>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink/40">Explore</h3>
            <nav className="mt-4 flex flex-col gap-3 text-[14px] text-ink/70">
              {nav.slice(0, 5).map((item) => (
                <Link key={item.to} to={item.to} className="transition-colors hover:text-cyan">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink/40">Disciplines</h3>
            <nav className="mt-4 flex flex-col gap-3 text-[14px] text-ink/70">
              {disciplines.map((discipline) => (
                <Link key={discipline.name} to="/science" className="transition-colors hover:text-cyan">
                  {discipline.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink/40">Connect</h3>
            <div className="mt-4 flex flex-col gap-3 text-[14px] text-ink/70">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-cyan">
                {site.email}
              </a>
              {site.social.map((social) => (
                <a key={social.label} href={social.href} className="transition-colors hover:text-cyan">
                  {social.label}
                </a>
              ))}
              <Link to="/join" className="transition-colors hover:text-cyan">
                Join NovaLab
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-ink/15 pt-5 text-[11px] uppercase tracking-[0.15em] text-ink/35 sm:flex-row">
          <span>© NovaLab · {site.city}</span>
          <span>Curiosity is a practice.</span>
        </div>
      </div>
    </footer>
  );
}
