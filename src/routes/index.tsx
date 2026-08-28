import { createFileRoute, Link } from "@tanstack/react-router";
import { OrbitDiagram } from "@/components/site/OrbitDiagram";
import { SectionHeader, Eyebrow } from "@/components/site/SectionHeader";
import { ProjectCard } from "@/components/site/ProjectCard";
import { activities, disciplines, openFields, projects, site } from "@/content/site";
import community from "@/assets/community-bench.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaLab — Science beyond the classroom, Iași" },
      {
        name: "description",
        content:
          "A student-led science club at Colegiul Național „Emil Racoviță” in Iași: experimenting, debating and building across every branch of science.",
      },
      { property: "og:title", content: "NovaLab — Science beyond the classroom" },
      {
        property: "og:description",
        content:
          "A student-led science collective in Iași, Romania. Experiments, debates, workshops and projects.",
      },
    ],
  }),
  component: Index,
});

const accentHover = {
  cyan: "group-hover:text-cyan",
  violet: "group-hover:text-violet",
  amber: "group-hover:text-electric",
} as const;

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 rise">
            <div className="flex items-center gap-3 mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
              <span className="h-px w-8 bg-cyan" /> A student science collective · Iași
            </div>
            <h1 className="font-display text-[13vw] sm:text-[7rem] lg:text-[6.5rem] leading-[0.92] font-medium tracking-tight">
              Where new ideas
              <br />
              <span className="italic text-cyan">meet</span> the real world.
            </h1>
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-ink/65">
              NovaLab is a student-led science club at {site.school}, Iași. We go beyond the
              textbook — experimenting, debating and building, across every branch of science.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/science"
                className="bg-nova text-ink px-6 py-3 rounded-full text-[14px] font-semibold hover:bg-electric transition-colors"
              >
                Explore the lab
              </Link>
              <Link
                to="/projects"
                className="text-[14px] font-medium text-ink/70 hover:text-ink transition-colors"
              >
                See what we're working on →
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <OrbitDiagram />
          </div>
        </div>
      </section>

      {/* What we are */}
      <section className="bg-indigo text-ink">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="paper">01 — What we are</Eyebrow>
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight font-medium">
              A lab without walls, built by students.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[17px] leading-relaxed text-ink/70">
            <p>
              NovaLab is a place to think in science — not to memorize it. We're a small,
              ambitious group who believe the best way to learn is to question, test and make
              things together.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-ink/15">
              <div>
                <span className="block font-display text-4xl text-cyan-soft">04</span>
                <span className="mt-1 block font-mono text-[13px] uppercase tracking-wide text-ink/55">
                  Core disciplines
                </span>
              </div>
              <div>
                <span className="block font-display text-4xl text-violet">+∞</span>
                <span className="mt-1 block font-mono text-[13px] uppercase tracking-wide text-ink/55">
                  Fields we explore
                </span>
              </div>
              <div>
                <span className="block font-display text-4xl text-electric">1</span>
                <span className="mt-1 block font-mono text-[13px] uppercase tracking-wide text-ink/55">
                  Question at a time
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <div className="flex items-end justify-between border-b border-ink/15 pb-6 mb-10">
            <SectionHeader eyebrow="02 — The disciplines" title="Science is connected." />
            <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40">
              And the fields we haven't named yet
            </span>
          </div>
          <div className="divide-y divide-ink/10">
            {disciplines.map((d) => (
              <Link
                key={d.name}
                to="/science"
                className="group flex items-center justify-between gap-6 py-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-sm text-ink/40">{d.index}</span>
                  <span
                    className={`font-display text-4xl md:text-6xl font-medium tracking-tight transition-colors ${accentHover[d.accent]}`}
                  >
                    {d.name}
                  </span>
                </div>
                <span className="text-[13px] text-ink/40 transition-transform group-hover:translate-x-2">
                  {d.note} →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
            Open to: {openFields.join(" · ")}
          </p>
        </div>
      </section>

      {/* What we do */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid lg:grid-cols-12 gap-12">
          <SectionHeader
            className="lg:col-span-4"
            eyebrow="03 — What we do"
            title="A practice, not a syllabus."
          />
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {activities.map((a) => (
              <li key={a.title} className="border-t border-ink/15 pt-4">
                <span className="font-mono text-[11px] text-cyan">{a.index}</span>
                <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-midnight">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <SectionHeader eyebrow="04 — Project log" title="Work in progress." />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
              Sample entries — real records replace these
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img
              src={community}
              alt="Two students working through notes at a school science bench"
              loading="lazy"
              width={1200}
              height={800}
              className="w-full aspect-[3/2] object-cover rounded-xl outline-1 -outline-offset-1 outline-ink/10"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeader eyebrow="05 — Community" title="Small by design, serious by choice." />
            <p className="mt-6 text-[17px] leading-relaxed text-ink/65">
              NovaLab is a young group of students and teachers who show up to think out loud.
              We'd rather stay honest about our size than pretend to be bigger than we are.
            </p>
            <Link
              to="/team"
              className="mt-8 inline-block text-[14px] font-medium text-ink/70 hover:text-ink transition-colors"
            >
              Meet the people →
            </Link>
          </div>
        </div>
      </section>

      {/* Join */}
      <section className="bg-indigo text-ink">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <Eyebrow tone="paper">06 — Come build with us</Eyebrow>
          <h2 className="mt-6 font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
            Bring your
            <br />
            <span className="italic text-cyan">curiosity.</span>
          </h2>
          <p className="mt-6 max-w-md mx-auto text-[16px] leading-relaxed text-ink/65">
            No perfect grades required — just a genuine love of asking why.
          </p>
          <Link
            to="/join"
            className="mt-10 inline-block bg-nova text-ink px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-electric transition-colors"
          >
            Apply to join NovaLab
          </Link>
        </div>
      </section>
    </>
  );
}
