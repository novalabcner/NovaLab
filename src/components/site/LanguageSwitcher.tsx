import { useTranslation } from "react-i18next";
import { useRouter } from "@tanstack/react-router";
import { setLanguage, supportedLanguages, type Language } from "@/i18n";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const current = i18n.language.startsWith("en") ? "en" : "ro";

  return (
    <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1" aria-label={t("language.switchTo", { language: current === "ro" ? "English" : "Română" })}>
      {supportedLanguages.map((language) => (
        <button
          key={language}
          type="button"
          aria-pressed={current === language}
          aria-label={t("language.switchTo", { language: language === "ro" ? "Română" : "English" })}
          onClick={() => {
            setLanguage(language as Language);
            void router.invalidate();
          }}
          className={`rounded-full px-2 py-1 font-mono text-[10px] tracking-[0.12em] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan ${
            current === language ? "bg-ink text-paper" : "text-ink/50 hover:text-ink"
          }`}
        >
          {t(`language.${language}`)}
        </button>
      ))}
    </div>
  );
}
