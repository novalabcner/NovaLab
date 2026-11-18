import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark, Wordmark } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
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
    <header className="border-b border-ink/10 bg-paper/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark className="h-6 w-6 text-ink" />
          <Wordmark className="text-[17px]" />
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
            Iași · RO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-ink/70">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-ink transition-colors"
              activeProps={{ className: "text-ink" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/join"
            className="bg-nova text-ink text-[13px] font-medium px-4 py-2 rounded-full hover:bg-electric transition-colors"
          >
            {t("nav.join")}
          </Link>
          <button
            type="button"
            className="md:hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60"
            aria-expanded={open}
            aria-label={open ? t("nav.close") : t("nav.menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t("nav.close") : t("nav.menu")}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 px-6 py-4 flex flex-col gap-4 text-[15px] font-medium text-ink/75">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
