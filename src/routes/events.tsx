import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/SectionHeader";
import { Newsletter } from "@/components/site/Newsletter";
import { events } from "@/content/site";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — NovaLab" },
      {
        name: "description",
        content: "Open sessions, workshops and events from the NovaLab student science club.",
      },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <Eyebrow>Events</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.06em] md:text-8xl">
          Make room for the <span className="font-editorial font-normal italic text-cyan">unexpected.</span>
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          Open sessions, talks and workshops are where NovaLab turns questions into shared work.
        </p>
      </section>
      <section className="border-y border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {events.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <article key={event.slug} className="border border-ink/10 bg-midnight p-6">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-cyan">
                    {event.discipline ?? "NovaLab"}
                  </span>
                  <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em]">{event.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{event.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl border-l-2 border-cyan pl-6">
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink/40">Event archive</span>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em]">
                The next gathering is still being planned.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink/60">
                There are no confirmed public events yet. Check back here for real dates and
                registration details, or contact us if you would like to host a session.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-block border-b border-cyan pb-1 text-[14px] text-ink/75 hover:text-cyan"
              >
                Start a conversation <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  );
}
