import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/SectionHeader";
import { partners, site } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact NovaLab — Iași, Romania" },
      {
        name: "description",
        content:
          "Get in touch with NovaLab in Iași — for students, teachers, schools, organisations and potential collaborators.",
      },
      { property: "og:title", content: "Contact NovaLab" },
      {
        property: "og:description",
        content: "Reach the NovaLab student science collective in Iași, Romania.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-medium leading-[0.98] tracking-tight">
            Write to us.
          </h1>
          <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-ink/65">
            Students, teachers, schools and organisations are all welcome to get in touch —
            whether you want to join, collaborate on a project, or invite us somewhere.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block font-display text-3xl italic text-cyan hover:brightness-95 transition"
          >
            {site.email}
          </a>
        </div>
        <address className="lg:col-span-4 lg:col-start-9 not-italic font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 space-y-6 border-l border-ink/15 pl-8">
          <div>
            <span className="block text-ink/35">Based at</span>
            <span className="mt-1 block text-ink/80">{site.school}</span>
          </div>
          <div>
            <span className="block text-ink/35">City</span>
            <span className="mt-1 block text-ink/80">{site.city}</span>
          </div>
          <div>
            <span className="block text-ink/35">Online</span>
            {site.social.map((s) => (
              <a key={s.label} href={s.href} className="mt-1 block text-ink/80 hover:text-cyan">
                {s.label}
              </a>
            ))}
          </div>
        </address>
      </section>

      <section className="bg-indigo text-ink">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="paper">Support & collaboration</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight">
              Partners we haven't met yet.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {partners.length > 0 ? (
              <ul className="grid sm:grid-cols-2 gap-6">
                {partners.map((p) => (
                  <li key={p.name} className="border-t border-ink/15 pt-4">
                    <span className="block font-display text-2xl">{p.name}</span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
                      {p.role}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[17px] leading-relaxed text-ink/70">
                NovaLab is young and currently unsponsored. If your organisation works in
                education, research or technology and wants to support student science in Iași —
                equipment, mentoring, space or funding — we'd like to talk.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
