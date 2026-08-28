import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/SectionHeader";
import { departments } from "@/content/site";
import community from "@/assets/community-bench.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — NovaLab" },
      {
        name: "description",
        content:
          "The people behind NovaLab: students, coordinators and the working groups that keep the club running.",
      },
      { property: "og:title", content: "The NovaLab team" },
      {
        property: "og:description",
        content: "Students, coordinators and working groups behind NovaLab in Iași.",
      },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-24 grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <Eyebrow>Community</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
            People, <span className="italic text-cyan">not</span> headcount.
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
            NovaLab is run by its members. Everyone belongs to a working group, and everyone is
            expected to contribute something they actually care about.
          </p>
        </div>
        <div className="lg:col-span-5">
          <img
            src={community}
            alt="Students reviewing notes together at a school science bench"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full aspect-[3/2] object-cover rounded-xl outline-1 -outline-offset-1 outline-ink/10"
          />
        </div>
      </section>

      <section className="border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          {departments.map((d, i) => (
            <div key={d.name}>
              <span className="font-mono text-[11px] text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-display text-3xl font-medium tracking-tight">{d.name}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>Members</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight">
            The list is being written.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-xl border border-dashed border-ink/20 p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
              Member profiles — pending
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/65">
              We publish names, roles and portraits only with each member's consent. As the
              current team is confirmed, profiles will appear here.
            </p>
            <Link
              to="/join"
              className="mt-6 inline-block text-[14px] font-medium text-ink/70 hover:text-ink transition-colors"
            >
              Want to be on this page? →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
