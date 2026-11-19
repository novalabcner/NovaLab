export type NovaLabResource = "pages" | "articles" | "events" | "team" | "disciplines" | "projects";

const apiUrl = import.meta.env.VITE_NOVALAB_CONTENT_API_URL as string | undefined;

export async function fetchNovaLabContent(resource: NovaLabResource, params: Record<string, string> = {}) {
  if (!apiUrl) return null;
  const url = new URL(apiUrl);
  url.searchParams.set("resource", resource);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  const response = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`NovaLab content request failed (${response.status})`);
  return response.json();
}
