# SEO and hosting notes

The existing NovaLab website is a Vite/TanStack Router client-rendered application. Google Apps Script data fetches should not be treated as crawlable static content.

For reliable article indexing, use one of these:
- Add a lightweight same-origin server/edge function that fetches the read-only API and returns HTML at article URLs.
- Use prerendering for the article and event routes.
- Keep static fallback content in source until an integration proxy is added.

Do not expose private document IDs or internal data in public JSON. Individual article URLs should use `slug_ro` or `slug_en`. Unique metadata and hreflang tags require server-rendered or prerendered route content.

Recommended sitemap sources are only published pages, articles and events. CORS and Apps Script deployment behaviour must be tested in the final hosting environment.
