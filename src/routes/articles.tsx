import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/site/SectionHeader";
import { Newsletter } from "@/components/site/Newsletter";
import { articles } from "@/content/site";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — NovaLab" },
      {
        name: "description",
        content: "Scientific explainers, project notes and discoveries from NovaLab.",
      },
    ],
  }),
  component: Articles,
});

function Articles() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <Eyebrow>Articles</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.06em] md:text-8xl">
          Notes from the <span className="font-editorial font-normal italic text-violet">lab.</span>
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          A future editorial space for explainers, project documentation, event recaps and student
          research.
        </p>
      </section>
      <section className="border-y border-ink/10 bg-midnight">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <article key={article.slug} className="border border-ink/10 p-6">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-violet">
                    {article.category}
                  </span>
                  <h2 className="mt-5 text-2xl font-medium tracking-[-0.05em]">{article.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{article.excerpt}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink/40">Publication desk</span>
                <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.06em] md:text-5xl">
                  The first question is still being written.
                </h2>
              </div>
              <p className="text-[16px] leading-relaxed text-ink/60 md:col-span-4 md:col-start-9">
                No articles have been published yet. This space is ready for the first careful
                explanation, observation or project note.
              </p>
            </div>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  );
}
