import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { site } from "@/content/site";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="border-y border-ink/10 bg-midnight">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-cyan">{t("newsletter.eyebrow")}</span>
          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.06em] md:text-5xl">
            {t("newsletter.titleBefore")} <span className="font-editorial font-normal italic text-cyan">{t("newsletter.titleAccent")}</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/60">
            {t("newsletter.description")}
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          {submitted ? (
            <p className="border border-cyan/40 px-5 py-4 text-[14px] text-cyan">
              {t("newsletter.success")}
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="newsletter-email" className="sr-only">
                {t("newsletter.emailLabel")}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t("newsletter.placeholder")}
                  className="min-w-0 flex-1 border border-ink/20 bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 focus:border-cyan focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-nova px-5 py-3 text-[13px] font-semibold text-paper transition-colors hover:bg-cyan"
                >
                  {t("newsletter.submit")}
                </button>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-ink/40">
                {t("newsletter.notice", { email: site.email })}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
