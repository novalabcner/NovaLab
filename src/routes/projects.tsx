import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow } from "@/components/site/SectionHeader";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/content/site";
import { useTranslation } from "react-i18next";
import { contentText } from "@/content/translate";
import { i18n } from "@/i18n";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `${i18n.t("projects.eyebrow")} — NovaLab` },
      {
        name: "description",
        content:
          "NovaLab project records: experiments and studies documented with discipline, status, dates and team.",
      },
      { property: "og:title", content: "NovaLab Projects" },
      {
        property: "og:description",
        content: "Experiment documentation from a student science collective in Iași.",
      },
    ],
  }),
  component: Projects,
});

const filters = ["All", "Biology", "Chemistry", "Astrophysics"] as const;

function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("All");
  const visible = projects.filter((p) => filter === "All" || p.discipline === filter);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24">
        <Eyebrow>{t("projects.eyebrow")}</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
          {t("projects.titleBefore")}<span className="italic text-cyan">{t("projects.titleAccent")}</span>
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          {t("projects.intro")}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className="flex flex-wrap gap-2 border-y border-ink/10 py-4 mb-10"
          role="group"
          aria-label={t("projects.filterLabel")}
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                filter === f
                  ? "bg-nova text-ink"
                  : "border border-ink/15 text-ink/55 hover:text-ink"
              }`}
            >
              {f === "All" ? t("projects.all") : contentText(t, f)}
            </button>
          ))}
        </div>

        {visible.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-ink/40">
            {t("common.noRecords")}
          </p>
        )}
      </section>
    </>
  );
}
