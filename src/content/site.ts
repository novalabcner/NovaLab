import spectral from "@/assets/project-spectral.jpg";
import skymap from "@/assets/project-skymap.jpg";
import pigments from "@/assets/project-pigments.jpg";

export const site = {
  name: "NovaLab",
  tagline: "Where new ideas meet the real world.",
  school: 'Colegiul Național „Emil Racoviță”',
  city: "Iași, Romania",
  email: "contact@novalab.ro",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Email", href: "mailto:contact@novalab.ro" },
  ],
} as const;

export const nav = [
  { label: "About", to: "/about" },
  { label: "Science", to: "/science" },
  { label: "Projects", to: "/projects" },
  { label: "Team", to: "/team" },
  { label: "Contact", to: "/contact" },
] as const;

export type Accent = "cyan" | "violet" | "amber";

export const disciplines: {
  index: string;
  name: string;
  note: string;
  accent: Accent;
  blurb: string;
}[] = [
  {
    index: "01",
    name: "Physics",
    note: "motion & forces",
    accent: "cyan",
    blurb:
      "From optics on a classroom bench to the mechanics behind everyday objects — measuring what we can, modelling what we can't.",
  },
  {
    index: "02",
    name: "Chemistry",
    note: "structure & reaction",
    accent: "violet",
    blurb:
      "Reactions as evidence: what changes, how fast, and why. Careful procedure over spectacle.",
  },
  {
    index: "03",
    name: "Biology",
    note: "life & systems",
    accent: "amber",
    blurb:
      "Living systems read as systems — from pigments in a leaf to the logic of an ecosystem.",
  },
  {
    index: "04",
    name: "Astronomy",
    note: "light & distance",
    accent: "cyan",
    blurb:
      "Observation nights, coordinates and the patient work of measuring things far out of reach.",
  },
];

export const openFields = [
  "Mathematics",
  "Engineering",
  "Computer science",
  "Environmental science",
  "Neuroscience",
  "Medicine",
  "Earth science",
];

export const activities = [
  {
    index: "01",
    title: "Experiments",
    text: "Hands-on investigation where a hypothesis meets real, measurable results.",
  },
  {
    index: "02",
    title: "Debates",
    text: "Structured argument where a claim is defended with evidence, not opinion.",
  },
  {
    index: "03",
    title: "Workshops",
    text: "Focused sessions that turn a concept into a skill you keep using.",
  },
  {
    index: "04",
    title: "Projects",
    text: "Multi-week builds that connect theory to something tangible and shared.",
  },
  {
    index: "05",
    title: "Challenges",
    text: "Competitive problems that push us to think faster and argue cleaner.",
  },
  {
    index: "06",
    title: "Events",
    text: "Open sessions where we present what we found to anyone curious enough to come.",
  },
];

export type ProjectStatus = "In progress" | "Planning" | "Draft";

export type Project = {
  slug: string;
  title: string;
  description: string;
  discipline: string;
  accent: Accent;
  status: ProjectStatus;
  date: string;
  participants: string;
  image: string;
  link?: string;
};

/**
 * SAMPLE CONTENT — placeholder records that describe the shape of a NovaLab
 * project entry. Replace with real project data; nothing here is a public claim.
 */
export const projects: Project[] = [
  {
    slug: "spectral-reading",
    title: "Spectral reading of a small light source",
    description:
      "A hands-on study of visible light, building a simple spectroscope from classroom optics.",
    discipline: "Physics",
    accent: "cyan",
    status: "In progress",
    date: "Sample entry",
    participants: "Sample team",
    image: spectral,
  },
  {
    slug: "winter-sky",
    title: "Mapping the winter sky over Iași",
    description:
      "Charting constellations and celestial coordinates across a semester of night observations.",
    discipline: "Astronomy",
    accent: "violet",
    status: "Planning",
    date: "Sample entry",
    participants: "Sample team",
    image: skymap,
  },
  {
    slug: "autumn-pigments",
    title: "Chromatography of autumn pigments",
    description:
      "Separating the chemistry of falling leaves with paper chromatography and a little patience.",
    discipline: "Biology",
    accent: "amber",
    status: "Draft",
    date: "Sample entry",
    participants: "Sample team",
    image: pigments,
  },
];

export const departments = [
  {
    name: "Research",
    text: "Shapes the questions, runs the experiments and writes up what actually happened.",
  },
  {
    name: "Communication",
    text: "Turns findings into talks, posts and posters that a non-specialist can follow.",
  },
  {
    name: "Events",
    text: "Plans the sessions, the equipment and the logistics that make a meeting possible.",
  },
];

export const partners: { name: string; role: string }[] = [
  // Intentionally empty until real partnerships exist.
];
