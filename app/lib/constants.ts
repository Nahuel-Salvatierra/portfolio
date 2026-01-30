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
    imageUrl: "/animarte.png",
    link: "https://animarte.website/",
    github: "https://github.com/Nahuel-Salvatierra/animarte",
  },
  {
    title: "Colorme-Makeup",
    description:
      "Un portfolio profesional. En este trabajo se muestra material artístico, sin perder la oportunidad de interactuar con la persona directamente por los medios de comunicación brindados. ",
    tags: ["HTTP", "Bootstrap", "JavaScript"],
    imageUrl: "/mockup-colorme-makeup.png",
    link: "https://colorme.animarte.website",
    github: "",
  },
  {
    title: "Equipo LibreAndo",
    description:
      "Esta página web fué un salto a nuevas tecnologías. Usando React aprendí a manipular estados y efectos, la web muestra el basto conocimiento de los profesionales y su calidad de atención. ",
    tags: ["React", "CSS", "Bootstrap", "React-Router-DOM"],
    imageUrl: "/libreando.jpg",
    link: "https://libreando.ar/",
    github: "",
  },
];
