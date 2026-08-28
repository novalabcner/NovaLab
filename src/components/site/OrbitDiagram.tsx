const TICKS = Array.from({ length: 48 }, (_, i) => i);

type Branch = { label: string; code: string; count: number; angle: number };

const DEFAULT_BRANCHES: Branch[] = [
  { label: "Biology", code: "01", count: 9, angle: -90 },
  { label: "Chemistry", code: "02", count: 7, angle: 30 },
  { label: "Astrophysics", code: "03", count: 4, angle: 150 },
];

const NODE_R = 24; // discipline node radius, in viewBox units
const MEMBER_R = 39; // member ring radius

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (angle: number, r: number) => ({
  x: 50 + Math.cos(rad(angle)) * r,
  y: 50 + Math.sin(rad(angle)) * r,
});

// deterministic pseudo-random offset so dots read organic, not machined
const jitter = (seed: number, amount: number) =>
  (Math.sin(seed * 12.9898) * 43758.5453) % 1 * amount;

export function OrbitDiagram({
  label = "Fig. 01",
  caption = "the orbit",
  branches = DEFAULT_BRANCHES,
}: {
  label?: string;
  caption?: string;
  branches?: Branch[];
}) {
  const total = branches.reduce((s, b) => s + b.count, 0);

  const clusters = branches.map((b, bi) => {
    const node = pt(b.angle, NODE_R);
    const spread = 14 + b.count * 3.4;
    const members = Array.from({ length: b.count }, (_, i) => {
      const t = b.count === 1 ? 0.5 : i / (b.count - 1);
      const a = b.angle - spread / 2 + t * spread + jitter(bi * 31 + i, 5.5);
      const r = MEMBER_R + jitter(bi * 71 + i * 7, 7) - 2;
      return { ...pt(a, r), key: `${b.label}-${i}` };
    });
    return { ...b, node, members };
  });

  return (
    <div className="mx-auto w-full max-w-[32rem]">
      <div
        className="relative aspect-square"
        role="img"
        aria-label={`Diagram of NovaLab: ${total} members grouped across ${branches.length} disciplines`}
      >
        {/* soft core glow */}
        <div className="absolute inset-[30%] rounded-full bg-nova/10 blur-2xl" />

        {/* outer ring + tick ruler */}
        <div className="absolute inset-0 rounded-full border border-ink/15" />
        <div className="absolute inset-[3%]">
          {TICKS.map((i) => (
            <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 7.5}deg)` }}>
              <span
                className={`absolute left-1/2 top-0 w-px -ml-px ${
                  i % 4 === 0 ? "h-[7px] bg-ink/30" : "h-[3px] bg-ink/15"
                }`}
              />
            </div>
          ))}
        </div>

        {/* network: members → discipline node → core */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r={MEMBER_R} fill="none" stroke="currentColor" strokeWidth="0.15" className="text-ink/10" strokeDasharray="1 2" />
          {clusters.map((c) => (
            <g key={c.label}>
              <line
                x1="50"
                y1="50"
                x2={c.node.x}
                y2={c.node.y}
                stroke="currentColor"
                strokeWidth="0.35"
                className="text-cyan/40"
              />
              {c.members.map((m) => (
                <line
                  key={m.key}
                  x1={c.node.x}
                  y1={c.node.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="currentColor"
                  strokeWidth="0.22"
                  className="text-electric/35"
                />
              ))}
              {c.members.map((m) => (
                <circle
                  key={`${m.key}-dot`}
                  cx={m.x}
                  cy={m.y}
                  r="0.85"
                  className="fill-electric"
                />
              ))}
            </g>
          ))}
        </svg>

        {/* discipline node labels */}
        {clusters.map((c) => (
          <div
            key={c.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-ink/15 bg-midnight/85 px-2 py-1 backdrop-blur"
            style={{ left: `${c.node.x}%`, top: `${c.node.y}%` }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/70">
              {c.label}
            </span>
            <span className="font-mono text-[9px] text-cyan/80">{c.count}</span>
          </div>
        ))}

        {/* centre label */}
        <div className="absolute inset-0 z-10 grid place-items-center">
          <div className="rounded-lg bg-paper/60 px-2 py-1.5 text-center backdrop-blur-sm">
            <span className="block font-mono text-[8px] uppercase tracking-[0.24em] text-ink/40">
              {label}
            </span>
            <span className="block font-display text-lg italic leading-tight">{caption}</span>
            <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.18em] text-ink/35">
              {total} members · {branches.length} disciplines
            </span>
          </div>
        </div>
      </div>

      {/* legend */}
      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-ink/10 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">
        <div>
          <dt className="text-ink/70">Dots</dt>
          <dd>one per member</dd>
        </div>
        <div>
          <dt className="text-ink/70">Lines</dt>
          <dd>member ↔ discipline</dd>
        </div>
        <div>
          <dt className="text-ink/70">Cyan</dt>
          <dd>discipline node</dd>
        </div>
      </dl>
    </div>
  );
}
