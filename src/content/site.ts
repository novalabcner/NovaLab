import spectral from "@/assets/project-spectral.jpg";
import skymap from "@/assets/project-skymap.jpg";
import pigments from "@/assets/project-pigments.jpg";
import alexa from "@/assets/board/Alexa.JPEG";
import budis from "@/assets/board/Budis.JPEG";
import garbea from "@/assets/board/Garbea.JPEG";
import gheorghidiu from "@/assets/board/Gheorghidiu.JPEG";
import gliga from "@/assets/board/Gliga.JPEG";
import lacatus from "@/assets/board/Lacatus.JPEG";
import tololoi from "@/assets/board/Tololoi.JPEG";
import zagan from "@/assets/board/Zagan.JPEG";

export const site = {
  name: "NovaLab",
  tagline: "Science without boundaries.",
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
  { label: "Disciplines", to: "/science" },
  { label: "Projects", to: "/projects" },
  { label: "Events", to: "/events" },
  { label: "Articles", to: "/articles" },
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
    name: "Biology",
    note: "life & systems",
    accent: "amber",
    blurb:
      "Living systems read as systems — from pigments in a leaf to the logic of an ecosystem.",
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
    name: "Astrophysics",
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
    discipline: "Astrophysics",
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
    discipline: "Astrophysics",
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

export type TeamMember = {
  name: string;
  role:
    | "president"
    | "vicePresident"
    | "astrophysicsCoordinator"
    | "chemistryCoordinator"
    | "biologyCoordinatorSecretary"
    | "secretary"
    | "fundraisingDesignCoordinator"
    | "photographyCoordinator";
  image: string;
};

export const teamMembers: TeamMember[] = [
  { name: "Lăcătuș Cosmin", role: "president", image: lacatus },
  { name: "Gârbea Răzvan", role: "vicePresident", image: garbea },
  {
    name: "Zagan Sofia",
    role: "astrophysicsCoordinator",
    image: zagan,
  },
  {
    name: "Alexa Iasmina",
    role: "chemistryCoordinator",
    image: alexa,
  },
  {
    name: "Tololoi Daria",
    role: "biologyCoordinatorSecretary",
    image: tololoi,
  },
  { name: "Gliga Cleopatra", role: "secretary", image: gliga },
  {
    name: "Budiș Daria",
    role: "fundraisingDesignCoordinator",
    image: budis,
  },
  {
    name: "Gheorghidiu Ines",
    role: "photographyCoordinator",
    image: gheorghidiu,
  },
];

export const partners: { name: string; role: string }[] = [
  // Intentionally empty until real partnerships exist.
];

export type EventRecord = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  discipline?: string;
  image?: string;
  featured?: boolean;
  registrationHref?: string;
};

export const events: EventRecord[] = [];

export type ArticleRecord = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date?: string;
  author?: string;
  readingTime?: string;
  image?: string;
};

export const articles: ArticleRecord[] = [];
