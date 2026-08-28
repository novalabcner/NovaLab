import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/SectionHeader";
import { disciplines, openFields } from "@/content/site";

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "Science at NovaLab — Connected disciplines" },
      {
        name: "description",
        content:
          "Physics, chemistry, biology and astronomy at NovaLab — plus the mathematics, engineering and computing that connect them.",
      },
      { property: "og:title", content: "Science at NovaLab" },
      {
        property: "og:description",
        content: "How NovaLab treats scientific disciplines as one connected field.",
      },
    ],
  }),
  component: Science,
});

const accentText = {
  cyan: "text-cyan",
  violet: "text-violet",
  amber: "text-electric",
} as const;

function Science() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-24">
        <Eyebrow>Science</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
          Four starting points, <span className="italic text-cyan">one</span> field.
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          We don't sort members into departments by subject. A question that starts in physics
          usually ends up borrowing from chemistry, statistics or code before it's answered.
        </p>
      </section>

      <section className="border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          {disciplines.map((d) => (
            <article
              key={d.name}
              className="grid md:grid-cols-12 gap-6 py-12 border-b border-ink/10 last:border-b-0"
            >
              <div className="md:col-span-1 font-mono text-sm text-ink/40">{d.index}</div>
              <h2
                className={`md:col-span-4 font-display text-4xl md:text-5xl font-medium tracking-tight ${accentText[d.accent]}`}
              >
                {d.name}
              </h2>
              <div className="md:col-span-6 md:col-start-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
                  {d.note}
                </p>
                <p className="mt-3 text-[17px] leading-relaxed text-ink/65">{d.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-indigo text-ink">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="paper">Open territory</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight">
              The diagram keeps growing.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink/70">
              If a member brings a question from a field we've never touched, that field becomes
              part of NovaLab.
            </p>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7 flex flex-wrap gap-3 self-center">
            {openFields.map((f) => (
              <li
                key={f}
                className="rounded-full border border-ink/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/70"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
