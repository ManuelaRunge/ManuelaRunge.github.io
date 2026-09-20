export const site = {
  name: "Manuela Runge",
  title: "Manuela Runge, PhD",
  tagline: "Infectious Disease Epidemiologist | Researcher | Analyst",
  description:
    "Epidemiological research, evidence synthesis, modelling and analytical work for infectious disease questions.",
  url: "https://manuelarunge.github.io",
  email: "manuelarunge10@gmail.com",
  location: "Switzerland",
  ridaUrl: "https://manuelarunge.github.io/runge-idanalytics/",
  heroImage: "/images/landscape_TZA1.jpg",
  profileImage: "/images/mrunge-profile.jpg",
  quoteImage: "/images/100_0324_edited_wide_resized.JPG",
  turtleMark: "/images/rida-turtle.png",
} as const;

export const nav = [
  { label: "Methods", href: "/#methods" },
  { label: "Work", href: "/#selected-work" },
  { label: "Contributions", href: "/#contributions" },
  { label: "RIDA", href: "/#rida" },
  { label: "Contact", href: "/collaboration/" },
] as const;

export const expertise = [
  {
    title: "Infectious disease epidemiology",
    description: "Research on malaria, vaccine-preventable diseases, COVID-19 and related public health questions.",
  },
  {
    title: "Modelling and inference",
    description: "Simulation models, statistical analysis and model-informed exploration of intervention impact.",
  },
  {
    title: "Evidence and methods",
    description: "Evidence review, synthesis and methodological scrutiny for transparent scientific reasoning.",
  },
  {
    title: "Scientific communication",
    description: "Publications, peer review, conference reporting, figures and writing for research audiences.",
  },
] as const;

export const countries = [
  { code: "DE", name: "Germany" },
  { code: "CH", name: "Switzerland" },
  { code: "TZ", name: "Tanzania" },
  { code: "US", name: "United States" },
] as const;

export const social = {
  googlescholar:
    "https://scholar.google.com/citations?user=XhVEFQQAAAAJ&hl=en&oi=ao",
  orcid: "https://orcid.org/0000-0001-9918-760X",
  pubmed: "https://www.ncbi.nlm.nih.gov/pubmed/?term=manuela+runge",
  researchgate: "https://www.researchgate.net/profile/Manuela_Runge",
  github: "https://github.com/ManuelaRunge",
  linkedin: "https://www.linkedin.com/in/manuelarunge",
  bluesky: "https://bsky.app/profile/manuelarunge.bsky.social",
  twitter: "https://twitter.com/RungeManuela",
  kaggle: "https://www.kaggle.com/manuelarunge",
  stackoverflow: "https://stackoverflow.com/users/5513271/manuela-r",
} as const;
