import type { Project } from "@/content/site";

const accentText = {
  cyan: "text-cyan",
  violet: "text-violet",
  amber: "text-electric",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-midnight outline-1 -outline-offset-1 outline-ink/10 rounded-xl overflow-hidden flex flex-col">
      <img
        src={project.image}
        alt={`${project.discipline} project: ${project.title}`}
        loading="lazy"
        width={1024}
        height={768}
        className="w-full aspect-[4/3] object-cover"
      />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.15em] ${accentText[project.accent]}`}
          >
            {project.discipline}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-ink/40">
            {project.status}
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-medium leading-snug">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-ink/60 leading-relaxed flex-1">
          {project.description}
        </p>
        <span className="mt-4 text-[11px] font-mono text-ink/40">
          {project.date} · {project.participants}
        </span>
      </div>
    </article>
  );
}
