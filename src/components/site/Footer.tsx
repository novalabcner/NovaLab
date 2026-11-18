import { Link } from "@tanstack/react-router";
import { disciplines, site } from "@/content/site";
import { useTranslation } from "react-i18next";
import { Wordmark } from "./Logo";

export function Footer() {
  const { t } = useTranslation();
  const nav = [
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.science"), to: "/science" },
    { label: t("nav.projects"), to: "/projects" },
    { label: t("nav.events"), to: "/events" },
    { label: t("nav.articles"), to: "/articles" },
    { label: t("nav.contact"), to: "/contact" },
  ];
  return (
    <footer className="border-t border-ink/15 bg-indigo text-ink">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20">
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark className="text-xl" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink/55">
              {t("footer.description", { school: site.school, city: site.city })}
            </p>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink/40">{t("footer.explore")}</h3>
            <nav className="mt-4 flex flex-col gap-3 text-[14px] text-ink/70">
              {nav.slice(0, 5).map((item) => (
                <Link key={item.to} to={item.to} className="transition-colors hover:text-cyan">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink/40">{t("footer.disciplines")}</h3>
            <nav className="mt-4 flex flex-col gap-3 text-[14px] text-ink/70">
              {disciplines.map((discipline) => (
                <Link key={discipline.name} to="/science" className="transition-colors hover:text-cyan">
                  {discipline.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink/40">{t("footer.connect")}</h3>
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
                {t("nav.join")}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-ink/15 pt-5 text-[11px] uppercase tracking-[0.15em] text-ink/35 sm:flex-row">
          <span>© NovaLab · {site.city}</span>
          <span>{t("footer.curiosity")}</span>
        </div>
      </div>
    </footer>
  );
}
