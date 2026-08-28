import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/SectionHeader";
import { site } from "@/content/site";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join NovaLab — Student science club in Iași" },
      {
        name: "description",
        content:
          "How to join NovaLab: who it's for, what you'd do, and how the application works. Open to students in grades VII–XII in Iași.",
      },
      { property: "og:title", content: "Join NovaLab" },
      {
        property: "og:description",
        content: "Bring a question. Students in grades VII–XII in Iași are welcome to apply.",
      },
    ],
  }),
  component: Join,
});

const steps = [
  { n: "01", title: "Discover", text: "Read what we do and come to an open session." },
  { n: "02", title: "Talk to us", text: "A short conversation about what you're curious about." },
  { n: "03", title: "Choose a group", text: "Research, communication or events — you can switch." },
  { n: "04", title: "Start working", text: "Join a project already running, or propose your own." },
];

function Join() {
  return (
    <>
      <section className="bg-indigo text-ink">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="paper">Join NovaLab</Eyebrow>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
              Bring a question.
              <br />
              <span className="italic text-cyan">We'll test it</span> together.
            </h1>
            <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-ink/70">
              No experience required and no perfect grades expected — just curiosity and the
              willingness to follow it somewhere uncomfortable.
            </p>
            <a
              href={`mailto:${site.email}?subject=NovaLab%20application`}
              className="mt-10 inline-block bg-nova text-ink px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-electric transition-colors"
            >
              Apply by email
            </a>
          </div>
          <dl className="lg:col-span-4 lg:col-start-9 border-l border-ink/15 pl-8 space-y-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
            <div>
              <dt className="text-ink/35">Who it's for</dt>
              <dd className="mt-1 text-ink/85">Students, grades VII–XII</dd>
            </div>
            <div>
              <dt className="text-ink/35">Where</dt>
              <dd className="mt-1 text-ink/85">{site.city}</dd>
            </div>
            <div>
              <dt className="text-ink/35">How</dt>
              <dd className="mt-1 text-ink/85">Short message, then a conversation</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <Eyebrow>The path in</Eyebrow>
        <div className="mt-10 grid md:grid-cols-4 gap-8 border-t border-ink/15 pt-8">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="font-mono text-[11px] text-cyan">{s.n}</span>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-midnight">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
          <h2 className="lg:col-span-5 font-display text-4xl md:text-5xl font-medium leading-tight tracking-tight">
            What you'd actually get out of it.
          </h2>
          <ul className="lg:col-span-6 lg:col-start-7 space-y-6 text-[17px] leading-relaxed text-ink/65">
            <li className="border-t border-ink/15 pt-4">
              Lab time and equipment for ideas that don't fit into a lesson.
            </li>
            <li className="border-t border-ink/15 pt-4">
              People who will argue with your reasoning and help you fix it.
            </li>
            <li className="border-t border-ink/15 pt-4">
              Practice presenting your work to an audience that isn't your teacher.
            </li>
            <li className="border-t border-ink/15 pt-4">
              A documented project you can point to later.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
