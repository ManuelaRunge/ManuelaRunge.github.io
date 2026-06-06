export const site = {
  name: "Manuela Runge",
  title: "Manuela Runge, PhD",
  tagline: "Infectious disease epidemiologist",
  description:
    "Malaria modeling, subnational intervention planning, and data-driven public health strategy.",
  url: "https://manuelarunge.github.io",
  email: "manuelarunge10@gmail.com",
  location: "Switzerland",
  employer: "MM Global Health Consulting (MMGH)",
  heroImage: "/images/landscape_TZA1.jpg",
  profileImage: "/images/profile.png",
  quoteImage: "/images/100_0324_edited_wide_resized.JPG",
} as const;

export const nav = [
  { label: "Publications", href: "/#publications" },
  { label: "Talks", href: "/#talks" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/collaboration/" },
  { label: "Blog", href: "/blog/" },
] as const;

export const expertise = [
  {
    title: "Malaria modeling",
    description: "Simulation models to project intervention impact in populations.",
  },
  {
    title: "Subnational tailoring",
    description: "District-level prioritization of malaria interventions using local data.",
  },
  {
    title: "Vaccine-preventable diseases",
    description: "Applied epidemiology for global health consulting projects.",
  },
  {
    title: "Data analysis & visualization",
    description: "From data management to maps, reports, and decision support.",
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
