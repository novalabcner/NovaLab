import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader, Eyebrow } from "@/components/site/SectionHeader";
import { OrbitDiagram } from "@/components/site/OrbitDiagram";
import { activities, site } from "@/content/site";
import { useTranslation } from "react-i18next";
import { contentText } from "@/content/translate";
import { i18n } from "@/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `${i18n.t("about.eyebrow")} NovaLab — ${i18n.language === "ro" ? "O comunitate științifică a elevilor din Iași" : "A student science collective in Iași"}` },
      {
        name: "description",
        content:
          "Why NovaLab exists: an alternative environment for students in Iași to explore science beyond the curriculum through experiments, debate and projects.",
      },
      { property: "og:title", content: "About NovaLab" },
      {
        property: "og:description",
        content: "Why a student-led science club in Iași exists, and how it works.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useTranslation();
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>{t("about.eyebrow")}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
            {t("about.titleBefore")} <span className="italic text-cyan">{t("about.titleAccent")}</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
            {t("about.intro", { school: site.school })}
          </p>
        </div>
        <div className="lg:col-span-5">
          <OrbitDiagram label="C.N.E.R IASI" caption="NovaLab" />
        </div>
      </section>

      <section className="bg-indigo text-ink">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow tone="paper">{t("about.why")}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight">{t("about.whyTitle")}</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[17px] leading-relaxed text-ink/70">
            <p>
              {t("about.whyP1")}
            </p>
            <p>
              {t("about.whyP2")}
            </p>
            <p>
              {t("about.whyP3")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-midnight">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="paper">{t("about.mission")}</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.06em] md:text-6xl">
              {t("about.missionTitle")}{" "}
              <span className="font-editorial font-normal italic text-cyan">{t("about.missionAccent")}</span>
            </h2>
          </div>
          <Link
            to="/team"
            className="inline-flex items-center justify-center bg-cyan px-5 py-3 text-[14px] font-semibold text-paper transition-colors hover:bg-electric lg:justify-self-end"
          >
            {t("common.meetCommunity")} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
        <SectionHeader className="lg:col-span-4" eyebrow={t("about.works")} title={t("about.term")} />
        <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {activities.map((a) => (
            <li key={a.title} className="border-t border-ink/15 pt-4">
              <span className="font-mono text-[11px] text-cyan">{a.index}</span>
              <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">{contentText(t, a.title)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{contentText(t, a.text)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-midnight">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
            {t("about.curious")}
          </h2>
          <Link
            to="/join"
            className="mt-8 inline-block bg-nova text-ink px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-electric transition-colors"
          >
            {t("common.join")}
          </Link>
        </div>
      </section>
    </>
  );
}
