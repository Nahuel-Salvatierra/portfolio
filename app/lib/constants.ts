import { SectionName } from "../context/useSectionInView";

export const links = [
  {
    name: "Inicio",
    hash: SectionName.Home,
  },
  {
    name: "Proyectos",
    hash: SectionName.Projects,
  },
  {
    name: "Habilidades",
    hash: SectionName.Skills,
  },
  {
    name: "Perfil",
    hash: SectionName.About,
  },
];

export const skillsData: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Nest.js",
  "Next.js",
  "Express",
  "Git",
  "Tailwind",
  "PostgreSQL",
  "TypeORM",
  "Docker",
  "CI/CD",
  "Linux",
  "AWS",
  "Azure",
  "External APIs",
  "REST",
  "Webhooks",
  "GraphQL",
  "Figma",
  "Postman",
  "Agile",
  "Scrum",
];

export const projectsData = [
  {
    title: "Animarte",
    description:
      "Una pagina web para gestionar los pedidos de los clientes, tener un seguimiento automatizado de los mismos y poder ver el estado de cada uno. ",
    tags: ["Next.js", "Google API", "CI/CD", "Docker", "Typescript"],
    imageUrl: "/portfolio/animarte-mockup.png",
    link: "https://animarte.website/",
    github: "https://github.com/Nahuel-Salvatierra/animarte",
  },
  {
    title: "Colorme-Makeup",
    description:
      "Un portfolio profesional. En este trabajo se muestra material artístico, sin perder la oportunidad de interactuar con la persona directamente por los medios de comunicación brindados. ",
    tags: ["HTTP", "Bootstrap", "JavaScript"],
    imageUrl: "/portfolio/mockup-colorme-makeup.png",
    link: "https://colorme.animarte.website",
    github: "",
  },
  {
    title: "SigApp",
    description:
      "Una aplicación innovadora con una interfaz moderna y fluida. Este proyecto demuestra el poder de las animaciones y el diseño interactivo.",
    tags: ["Next.js", "Video Integration", "UX/UI", "Tailwind"],
    videoUrl:   "/portfolio/sigapp.mp4",
    imageUrl: "/portfolio/sigapp-mock.png",
    link: "https://app.sigapp.com.ar/",
    github: "",
  },
  {
    title: "Pledge for the Planet",
    description:
      "Una aplicación innovadora con una interfaz moderna y fluida. Este proyecto demuestra el poder de las animaciones y el diseño interactivo.",
    tags: ["Next.js", "Video Integration", "UX/UI", "Tailwind"],
    imageUrl: "/portfolio/pledge-mockup.png",
    videoUrl: "/portfolio/pledge-for-the-planet.mp4",
    link: "https://app.pledgefortheplanet.org/",
    github: "",
  },
];
