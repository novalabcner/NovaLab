# API Specification

`?resource=pages`, `articles`, `events`, `team`, `disciplines`, `projects`, `media`, `settings`.

Individual article: `?resource=articles&id=article_id&slug=readable-slug&lang=ro`.
Individual event: `?resource=events&id=event_id&slug=readable-slug&lang=ro`.

Example article:
```json
{"resource":"articles","item":{"article_id":"article-example","title_ro":"Titlu exemplar","title_en":"","excerpt_ro":"Rezumat","excerpt_en":"","content_ro":{"blocks":[]},"published":false,"english_reviewed":false}}
```

Only published rows are returned. English is omitted/empty until `english_reviewed=true`. Errors use `{ "error": true, "message": "..." }` without private data.
