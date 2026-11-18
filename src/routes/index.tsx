import { createFileRoute, Link } from "@tanstack/react-router";
import { OrbitDiagram } from "@/components/site/OrbitDiagram";
import { Eyebrow, SectionHeader } from "@/components/site/SectionHeader";
import { ProjectCard } from "@/components/site/ProjectCard";
import { activities, disciplines, openFields, projects, site } from "@/content/site";
import community from "@/assets/community-bench.jpg";
import { useTranslation } from "react-i18next";
import { contentText, contentList } from "@/content/translate";
import { i18n } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `NovaLab — ${i18n.language === "ro" ? "Știință fără limite" : "Science without boundaries"}` },
      {
        name: "description",
        content:
          "A student-led science club at Colegiul Național „Emil Racoviță” in Iași: experimenting, debating and building across every branch of science.",
      },
      { property: "og:title", content: "NovaLab — Science without boundaries" },
      {
        property: "og:description",
        content:
          "A student-led science collective in Iași, Romania. Experiments, debates, workshops and projects.",
      },
    ],
  }),
  component: Index,
});

const disciplineColors = {
  cyan: "group-hover:text-cyan",
  violet: "group-hover:text-violet",
  amber: "group-hover:text-biology",
} as const;

const disciplineMarks = {
  Chemistry: "bg-violet",
  Biology: "bg-biology",
  Astrophysics: "bg-electric",
} as const;

function Index() {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-8">
            <div className="mb-9 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-ink/50">
              <span className="h-px w-10 bg-cyan" /> {t("home.eyebrow")}
            </div>
            <h1 className="max-w-5xl text-[clamp(3.2rem,8vw,8.5rem)] font-medium leading-[0.94] tracking-[-0.06em]">
              {t("home.heroTitle")}
              <br />
              <span className="font-editorial text-[1.14em] font-normal italic tracking-[-0.05em] text-cyan">
                {t("home.heroAccent")}
              </span>
            </h1>
            <div className="mt-10 grid max-w-2xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-md text-[16px] leading-relaxed text-ink/65">
                {t("home.heroDescription", { school: site.school })}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/science"
                  className="bg-nova px-5 py-3 text-[13px] font-semibold text-paper transition-colors hover:bg-cyan"
                >
                  {t("common.exploreLab")} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative z-10 lg:col-span-4 lg:pt-16">
            <OrbitDiagram caption="NovaLab" />
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-ink/10 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-ink/40">
          <span>{t("home.progress")}</span>
          <span className="hidden sm:inline">47°09′N · 27°35′E</span>
        </div>
      </section>

      <section className="bg-midnight text-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="paper">{t("home.proposition")}</Eyebrow>
            <h2 className="mt-7 max-w-xl text-4xl font-medium leading-[1.1] tracking-[-0.05em] md:text-6xl">
              {t("home.propositionTitle")}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-lg text-[18px] leading-relaxed text-ink/65">
              {t("home.propositionText")}
            </p>
            <div className="mt-12 grid grid-cols-3 border-t border-ink/15 pt-5">
              <div>
                <span className="block text-3xl font-medium text-cyan">03</span>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.12em] text-ink/45">
                  {t("home.coreDisciplines")}
                </span>
              </div>
              <div>
                <span className="block text-3xl font-medium text-violet">+∞</span>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.12em] text-ink/45">
                  {t("home.fields")}
                </span>
              </div>
              <div>
                <span className="block text-3xl font-medium text-biology">01</span>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.12em] text-ink/45">
                  {t("home.question")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mb-10 flex items-end justify-between border-b border-ink/15 pb-6">
            <SectionHeader eyebrow={t("home.disciplinesEyebrow")} title={t("home.disciplinesTitle")} />
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-ink/40 md:block">
              {t("home.disciplinesAside")}
            </span>
          </div>
          <div className="divide-y divide-ink/10">
            {disciplines.map((d) => (
              <Link
                key={d.name}
                to="/science"
                className="group flex items-center justify-between gap-5 py-7 transition-colors hover:bg-midnight/40 md:py-9"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <span className="text-[11px] tracking-[0.16em] text-ink/35">{d.index}</span>
                  <span className={`h-2 w-2 rounded-full ${disciplineMarks[d.name as keyof typeof disciplineMarks]}`} />
                  <span
                    className={`text-3xl font-medium tracking-[-0.06em] transition-colors md:text-6xl ${disciplineColors[d.accent]}`}
                  >
                    {contentText(t, d.name)}
                  </span>
                </div>
                <span className="hidden text-right text-[13px] text-ink/40 transition-transform group-hover:translate-x-1 sm:block">
                  {contentText(t, d.note)} <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-ink/40">
            {t("home.openTo")} {contentList(t, openFields.join(" · "))}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <SectionHeader
            className="lg:col-span-4"
            eyebrow={t("home.activitiesEyebrow")}
            title={<>{t("home.activitiesTitleBefore")} <span className="font-editorial font-normal italic text-cyan">{t("home.activitiesTitleAccent")}</span> {t("home.activitiesTitleAfter")}</>}
          />
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {activities.map((a) => (
              <li key={a.title} className="border-t border-ink/15 pt-4">
                <span className="text-[11px] text-cyan">{a.index}</span>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.05em]">{contentText(t, a.title)}</h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink/60">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-midnight">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader eyebrow={t("home.projectsEyebrow")} title={<>{t("home.projectsTitleBefore")} <span className="font-editorial font-normal italic text-violet">{t("home.projectsTitleAccent")}</span></>} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink/40">
              {t("home.sample")}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <img
              src={community}
              alt={t("home.communityText")}
              loading="lazy"
              width={1200}
              height={800}
              className="w-full aspect-[3/2] object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeader eyebrow={t("home.communityEyebrow")} title={t("home.communityTitle")} />
            <p className="mt-6 text-[17px] leading-relaxed text-ink/65">
              {t("home.communityText")}
            </p>
            <Link
              to="/team"
              className="mt-8 inline-block border-b border-cyan pb-1 text-[14px] font-medium text-ink/75 transition-colors hover:text-cyan"
            >
              {t("common.meetPeople")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Eyebrow>{t("home.ctaEyebrow")}</Eyebrow>
          <h2 className="mt-7 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.06em] md:text-8xl">
            Science
            <br />
            <span className="font-editorial font-normal italic text-cyan">            {t("home.ctaAccent")}</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-md text-[16px] leading-relaxed text-ink/60">
              {t("home.ctaText")}
            </p>
            <Link
              to="/join"
              className="bg-nova px-7 py-4 text-[14px] font-semibold text-paper transition-colors hover:bg-cyan"
            >
              {t("common.apply")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
