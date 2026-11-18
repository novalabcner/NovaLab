import type { TFunction } from "i18next";

const keys: Record<string, string> = {
  Biology: "content.biology",
  Chemistry: "content.chemistry",
  Astrophysics: "content.astrophysics",
  Mathematics: "content.mathematics",
  Engineering: "content.engineering",
  "Computer science": "content.computerScience",
  "Environmental science": "content.environmentalScience",
  Neuroscience: "content.neuroscience",
  Medicine: "content.medicine",
  "Earth science": "content.earthScience",
  "life & systems": "content.biologyNote",
  "structure & reaction": "content.chemistryNote",
  "light & distance": "content.astrophysicsNote",
  Experiments: "content.experiments",
  Debates: "content.debates",
  Workshops: "content.workshops",
  Projects: "content.projects",
  Challenges: "content.challenges",
  Events: "content.events",
  Research: "content.research",
  Communication: "content.communication",
  "In progress": "content.inProgress",
  Planning: "content.planning",
  Draft: "content.draft",
  "Sample entry": "content.sampleEntry",
  "Sample team": "content.sampleTeam",
  "Living systems read as systems — from pigments in a leaf to the logic of an ecosystem.": "content.biologyBlurb",
  "Reactions as evidence: what changes, how fast, and why. Careful procedure over spectacle.": "content.chemistryBlurb",
  "Observation nights, coordinates and the patient work of measuring things far out of reach.": "content.astrophysicsBlurb",
  "Hands-on investigation where a hypothesis meets real, measurable results.": "content.experimentsText",
  "Structured argument where a claim is defended with evidence, not opinion.": "content.debatesText",
  "Focused sessions that turn a concept into a skill you keep using.": "content.workshopsText",
  "Multi-week builds that connect theory to something tangible and shared.": "content.projectsText",
  "Competitive problems that push us to think faster and argue cleaner.": "content.challengesText",
  "Open sessions where we present what we found to anyone curious enough to come.": "content.eventsText",
  "Shapes the questions, runs the experiments and writes up what actually happened.": "content.researchText",
  "Turns findings into talks, posts and posters that a non-specialist can follow.": "content.communicationText",
  "Plans the sessions, the equipment and the logistics that make a meeting possible.": "content.eventTeamText",
  "A hands-on study of visible light, building a simple spectroscope from classroom optics.": "content.spectralDescription",
  "Charting constellations and celestial coordinates across a semester of night observations.": "content.skymapDescription",
  "Separating the chemistry of falling leaves with paper chromatography and a little patience.": "content.pigmentsDescription",
  "Spectral reading of a small light source": "content.spectralTitle",
  "Mapping the winter sky over Iași": "content.skymapTitle",
  "Chromatography of autumn pigments": "content.pigmentsTitle",
  "Read what we do and come to an open session.": "join.step1",
  "A short conversation about what you're curious about.": "join.step2",
  "Research, communication or events — you can switch.": "join.step3",
  "Join a project already running, or propose your own.": "join.step4",
};

export function contentText(t: TFunction, value: string) {
  const key = keys[value];
  return key ? t(key) : value;
}

export function contentList(t: TFunction, value: string) {
  return value.split(" · ").map((item) => contentText(t, item)).join(" · ");
}
