import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader, Eyebrow } from "@/components/site/SectionHeader";
import { OrbitDiagram } from "@/components/site/OrbitDiagram";
import { activities, site } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NovaLab — A student science collective in Iași" },
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
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
            Science as a way of <span className="italic text-cyan">thinking.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
            NovaLab was started by students at {site.school} in Iași who wanted somewhere to do
            science, not only study it. It's an alternative educational environment: open,
            informal and rigorous at the same time.
          </p>
        </div>
        <div className="lg:col-span-5">
          <OrbitDiagram label="C.N.E.R IASI" caption="NovaLab" />
        </div>
      </section>

      <section className="bg-indigo text-ink">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow tone="paper">Why we exist</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight">
              The curriculum ends. The questions don't.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[17px] leading-relaxed text-ink/70">
            <p>
              School teaches science as a set of results. We're interested in the part before
              that: the question, the uncertainty, the argument, the failed attempt, and the
              second attempt that works.
            </p>
            <p>
              Members explore subjects beyond the syllabus, run their own experiments, defend
              their reasoning in front of each other, and learn to explain what they found to
              someone who isn't in the room.
            </p>
            <p>
              Along the way people pick up the things that are hard to teach directly:
              collaboration, leadership, patience with detail, and the confidence to say "I don't
              know yet".
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
        <SectionHeader className="lg:col-span-4" eyebrow="How it works" title="What a term looks like." />
        <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {activities.map((a) => (
            <li key={a.title} className="border-t border-ink/15 pt-4">
              <span className="font-mono text-[11px] text-cyan">{a.index}</span>
              <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">{a.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-midnight">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
            Curious how you'd fit in?
          </h2>
          <Link
            to="/join"
            className="mt-8 inline-block bg-nova text-ink px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-electric transition-colors"
          >
            Join NovaLab
          </Link>
        </div>
      </section>
    </>
  );
}
