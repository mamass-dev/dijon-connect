export type Member = {
  slug: string;
  firstName: string;
  lastName: string;
  company: string;
  activity: string;
  category: Category;
  addresses: { street?: string; postalCode: string; city: string }[];
  linkedin: string;
  photo?: string;
  note?: string;
};

export type Category =
  | "Bâtiment & Habitat"
  | "Conseil & Finance"
  | "Immobilier"
  | "Numérique & Télécom"
  | "Juridique"
  | "Services"
  | "Tourisme & Loisirs";

const classify = (activity: string): Category => {
  const a = activity.toLowerCase();
  if (/électricien|couvreur|menuiseries|fenêtres|carrelage|pierre|cuisiniste|impression/.test(a))
    return "Bâtiment & Habitat";
  if (/comptable|patrimoine|banque|courtier|assurance/.test(a)) return "Conseil & Finance";
  if (/agent immobilier|immobilier/.test(a)) return "Immobilier";
  if (/informatique|site|télécom|application/.test(a)) return "Numérique & Télécom";
  if (/avocat/.test(a)) return "Juridique";
  if (/nettoyage|guide|œnotourisme|oenotourisme|parc/.test(a))
    return /parc|loisirs/.test(a) ? "Tourisme & Loisirs" : "Services";
  return "Services";
};

type Seed = Omit<Member, "category" | "photo"> & { hasPhoto: boolean };

const seeds: Seed[] = [
  {
    slug: "lucas-andrieu",
    firstName: "Lucas",
    lastName: "Andrieu",
    company: "ALEOTECH",
    activity: "Électricien",
    addresses: [{ street: "4 Allée des Nouratons", postalCode: "21490", city: "Ruffey-lès-Echirey" }],
    linkedin: "https://www.linkedin.com/in/lucas-andrieu-829095214/",
    hasPhoto: true,
  },
  {
    slug: "bruno-bonnet",
    firstName: "Bruno",
    lastName: "Bonnet",
    company: "ARC CECCA",
    activity: "Expert-comptable, commissaire aux comptes",
    addresses: [{ street: "6 route de Beaune", postalCode: "21220", city: "Gevrey-Chambertin" }],
    linkedin: "https://www.linkedin.com/in/bruno-bonnet-422016a3/",
    hasPhoto: false,
  },
  {
    slug: "paul-lefranc",
    firstName: "Paul",
    lastName: "Lefranc",
    company: "AREA CREATION",
    activity: "Spécialiste en impression textile et objets publicitaires",
    addresses: [{ street: "10 rue de Champoran", postalCode: "21560", city: "Arc-sur-Tille" }],
    linkedin: "https://www.linkedin.com/in/paul-lefranc-502692151/",
    hasPhoto: true,
  },
  {
    slug: "benjamin-levesque",
    firstName: "Benjamin",
    lastName: "Levesque",
    company: "Arthus Conseil",
    activity: "Conseiller en gestion de patrimoine",
    addresses: [{ street: "62 rue de Lorraine", postalCode: "21200", city: "Beaune" }],
    linkedin: "https://www.linkedin.com/in/benjamin-levesque/",
    hasPhoto: true,
  },
  {
    slug: "marie-gerbay",
    firstName: "Marie",
    lastName: "Gerbay",
    company: "Cabinet Gerbay",
    activity: "Avocat",
    addresses: [{ street: "15 bis Cours Général de Gaulle", postalCode: "21000", city: "Dijon" }],
    linkedin: "https://www.linkedin.com/in/marie-gerbay-883131102/",
    hasPhoto: true,
  },
  {
    slug: "benjamin-alexandre",
    firstName: "Benjamin",
    lastName: "Alexandre",
    company: "BATOITURE",
    activity: "Couvreur, zinguerie",
    addresses: [{ street: "13 rue de Tamines", postalCode: "21700", city: "Nuits-Saint-Georges" }],
    linkedin: "https://www.linkedin.com/in/benjamin-alexandre-356812170/",
    hasPhoto: false,
  },
  {
    slug: "lucile-parisse",
    firstName: "Lucile",
    lastName: "Parisse",
    company: "CIC",
    activity: "Banque",
    addresses: [{ street: "8 rue de la République", postalCode: "69001", city: "Lyon" }],
    linkedin: "https://fr.linkedin.com/in/parisse-lucile-35267b174",
    hasPhoto: true,
  },
  {
    slug: "marie-errera",
    firstName: "Marie",
    lastName: "Errera",
    company: "EKOLUX",
    activity: "Pierres naturelles et carrelages",
    addresses: [
      { street: "Bâtiment B, 165 rue en Charmois", postalCode: "21160", city: "Marsannay-la-Côte" },
    ],
    linkedin: "https://www.linkedin.com/in/marie-errera-3403a123b/",
    hasPhoto: true,
  },
  {
    slug: "jean-jacques-petit",
    firstName: "Jean-Jacques",
    lastName: "Petit",
    company: "Entretien Dijonnais",
    activity: "Société de nettoyage",
    addresses: [{ street: "32 boulevard de Chicago", postalCode: "21000", city: "Dijon" }],
    linkedin: "https://www.linkedin.com/in/jean-jacques-petit-527306350/",
    hasPhoto: true,
  },
  {
    slug: "thierry-sardou",
    firstName: "Thierry",
    lastName: "Sardou",
    company: "ExpertSI",
    activity: "Conseil et service informatique",
    addresses: [{ street: "39 rue Verrerie", postalCode: "21000", city: "Dijon" }],
    linkedin: "https://www.linkedin.com/in/thierry-sardou-7a0a684b/",
    hasPhoto: true,
  },
  {
    slug: "alexandre-dardy",
    firstName: "Alexandre",
    lastName: "Dardy",
    company: "Meilleurtaux",
    activity: "Courtier en prêts",
    addresses: [{ street: "20 rue du Château", postalCode: "21000", city: "Dijon" }],
    linkedin: "https://www.linkedin.com/in/alexandre-dardy-359204141/",
    hasPhoto: false,
  },
  {
    slug: "aubin-sardou",
    firstName: "Aubin",
    lastName: "Sardou",
    company: "Ménéo",
    activity: "Spécialiste fenêtres, portes, volets et menuiseries",
    addresses: [{ street: "6 rue Antoine Becquerel", postalCode: "21300", city: "Chenôve" }],
    linkedin: "https://www.linkedin.com/in/aubin-sardou-52a7301b8/",
    hasPhoto: true,
  },
  {
    slug: "thibault-maurice",
    firstName: "Thibault",
    lastName: "Maurice",
    company: "Noblessa Cuisines",
    activity: "Cuisiniste",
    addresses: [{ street: "17 rue des Chalands", postalCode: "21800", city: "Quetigny" }],
    linkedin: "https://www.linkedin.com/in/mauricethibault21/",
    hasPhoto: true,
  },
  {
    slug: "romain-brilliard",
    firstName: "Romain",
    lastName: "Brilliard",
    company: "Options Telecom",
    activity: "Télécom",
    addresses: [{ street: "10 rue Nicolas de Condorcet", postalCode: "21800", city: "Chevigny-Saint-Sauveur" }],
    linkedin: "https://fr.linkedin.com/in/romain-brilliard-80b93119a",
    hasPhoto: true,
  },
  {
    slug: "brice-choquier",
    firstName: "Brice",
    lastName: "Choquier",
    company: "Parc Evasion",
    activity: "Parc de loisirs",
    addresses: [{ street: "1 chemin du Tacot", postalCode: "21220", city: "Curley" }],
    linkedin: "https://www.linkedin.com/in/brice-choquier-414020206/",
    hasPhoto: true,
  },
  {
    slug: "audrey-tosoni",
    firstName: "Audrey",
    lastName: "Tosoni",
    company: "Pietrapolis",
    activity: "Agent immobilier",
    addresses: [{ street: "7 boulevard de la Trémouille", postalCode: "21000", city: "Dijon" }],
    linkedin: "https://www.linkedin.com/in/audrey-tosoni-1b7a0b195/",
    hasPhoto: true,
  },
  {
    slug: "florian-quillivic",
    firstName: "Florian",
    lastName: "Quillivic",
    company: "QG Associés",
    activity: "Agent général d'assurance",
    addresses: [
      { street: "43 rue de Mulhouse", postalCode: "21000", city: "Dijon" },
      { street: "2 avenue de la Brenne", postalCode: "21540", city: "Sombernon" },
    ],
    linkedin: "https://fr.linkedin.com/in/florian-quillivic-73381561",
    hasPhoto: true,
  },
  {
    slug: "fabien-girault",
    firstName: "Fabien",
    lastName: "Girault",
    company: "VisionSI",
    activity: "Développement de solutions sur mesure, sites web, e-commerce et applications mobiles",
    addresses: [{ street: "39 rue Verrerie", postalCode: "21000", city: "Dijon" }],
    linkedin: "https://www.linkedin.com/in/fabien-girault-visionsi/",
    hasPhoto: true,
  },
  {
    slug: "pauline-dumont",
    firstName: "Pauline",
    lastName: "Dumont",
    company: "Pauline Dumont",
    activity: "Guide œnotourisme freelance",
    addresses: [{ postalCode: "21000", city: "Dijon" }],
    linkedin: "https://www.linkedin.com/in/pauline-dumont-898b1366/",
    hasPhoto: true,
  },
];

export const members: Member[] = seeds
  .map(({ hasPhoto, ...m }) => ({
    ...m,
    category: classify(m.activity),
    photo: hasPhoto ? `/membres/${m.slug}.jpg` : undefined,
  }))
  .sort((a, b) => a.lastName.localeCompare(b.lastName, "fr"));

export const getMember = (slug: string) => members.find((m) => m.slug === slug);

export const allCategories = Array.from(new Set(members.map((m) => m.category))).sort();
export const allCities = Array.from(new Set(members.flatMap((m) => m.addresses.map((a) => a.city)))).sort();

export const initials = (m: Member) =>
  `${m.firstName[0] ?? ""}${m.lastName[0] ?? ""}`.toUpperCase();
