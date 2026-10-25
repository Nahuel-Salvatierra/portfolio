export const links = [
  {
    name: "Inicio",
    href: "#home",
  },
  {
    name: "IA",
    href: "#ai",
  },
  {
    name: "Proyectos",
    href: "#projects",
  },
  {
    name: "Cloud",
    href: "#cloud",
  },
  {
    name: "Proceso",
    href: "#process",
  },
  {
    name: "Contacto",
    href: "#contact",
  },
] as const;

export type SkillItem = {
  name: string;
  icon: SkillIconKey;
};

export type SkillIconKey =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nodejs"
  | "nestjs"
  | "nextjs"
  | "express"
  | "git"
  | "tailwind"
  | "postgresql"
  | "typeorm"
  | "docker"
  | "cicd"
  | "linux"
  | "aws"
  | "azure"
  | "apis"
  | "rest"
  | "webhooks"
  | "graphql"
  | "figma"
  | "postman"
  | "agile"
  | "scrum";

export const skillsData: SkillItem[] = [
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Nest.js", icon: "nestjs" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Express", icon: "express" },
  { name: "Git", icon: "git" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "TypeORM", icon: "typeorm" },
  { name: "Docker", icon: "docker" },
  { name: "CI/CD", icon: "cicd" },
  { name: "Linux", icon: "linux" },
  { name: "AWS", icon: "aws" },
  { name: "Azure", icon: "azure" },
  { name: "External APIs", icon: "apis" },
  { name: "REST", icon: "rest" },
  { name: "Webhooks", icon: "webhooks" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Figma", icon: "figma" },
  { name: "Postman", icon: "postman" },
  { name: "Agile", icon: "agile" },
  { name: "Scrum", icon: "scrum" },
];

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  captionsUrl?: string;
  link: string;
  github: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type CloudHighlight = {
  id: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Descubrimiento",
    description:
      "Entendemos el problema, el contexto y qué tiene que pasar en la práctica.",
  },
  {
    id: "design",
    title: "Diseño",
    description:
      "Definimos flujos, interfaz y arquitectura alineados al objetivo.",
  },
  {
    id: "build",
    title: "Build",
    description:
      "Implementamos con foco en claridad, performance y entrega continua.",
  },
  {
    id: "ship",
    title: "Entrega",
    description:
      "Publicamos, documentamos y dejamos el sistema listo para operar.",
  },
];

export const cloudHighlights: CloudHighlight[] = [
  {
    id: "aws-data",
    title: "Datos en la nube",
    description: "Integración y flujos confiables sobre AWS.",
  },
  {
    id: "security",
    title: "Seguridad",
    description: "Accesos y entornos pensados para proteger la información.",
  },
  {
    id: "performance",
    title: "Performance",
    description: "Ajustes para que la app responda bajo uso real.",
  },
  {
    id: "cost",
    title: "Costos",
    description: "Menos desperdicio, más eficiencia. Consultá tu caso.",
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "animarte",
    slug: "animarte",
    title: "Dashboards administrativos",
    summary:
      "Cuando operar el producto se vuelve disperso, un dashboard en el navegador centraliza control, estados y visibilidad para el equipo.",
    description:
      "Dashboards administrativos en el navegador para operar y gestionar tus aplicaciones web. Centralizan usuarios, datos, estados y flujos de trabajo con una interfaz clara, lista para el día a día del equipo. Ideales cuando necesitás administrar tu producto sin fricción y con visibilidad en tiempo real.",
    tags: ["Next.js", "Dashboard", "Admin", "Typescript", "CI/CD"],
    imageUrl: "/portfolio/animarte-mockup.png",
    link: "https://animarte.website/",
    github: "https://github.com/Nahuel-Salvatierra/animarte",
  },
  {
    id: "colorme-makeup",
    slug: "colorme-makeup",
    title: "Landing pages",
    summary:
      "Si la primera impresión tiene que convertir, la landing prioriza SEO, accesibilidad y velocidad sin perder el mensaje comercial.",
    description:
      "Landing pages pensadas para rendir en buscadores, cargar en milisegundos y ser usables por todas las personas. Priorizan estructura semántica, Core Web Vitals, contraste y navegación clara, sin sacrificar el mensaje comercial. Ideal cuando necesitás presencia rápida, medible y lista para escalar campañas.",
    tags: ["SEO", "Accesibilidad", "Performance", "HTML", "JavaScript"],
    imageUrl: "/portfolio/mockup-colorme-makeup.png",
    link: "https://colorme.animarte.website",
    github: "",
  },
  {
    id: "sigapp",
    slug: "sigapp",
    title: "CRM y gestión de inventario",
    summary:
      "Cuando los recursos de la empresa viven en silos, una plataforma unifica inventario, activos y operaciones con trazabilidad clara.",
    description:
      "Plataformas que centralizan la gestión empresarial: control de inventario, activos, intervenciones y flujos de trabajo. Dan visibilidad en tiempo real sobre el estado de cada recurso, reducen fricción operativa y permiten que equipos de distintas áreas trabajen con la misma información. Pensadas para empresas que necesitan orden, trazabilidad y decisiones más rápidas.",
    tags: ["CRM", "Inventario", "Next.js", "UX/UI", "Tailwind"],
    videoUrl: "/portfolio/sigapp.mp4",
    captionsUrl: "/portfolio/sigapp.vtt",
    imageUrl: "/portfolio/sigapp-mock.png",
    link: "https://app.sigapp.com.ar/",
    github: "",
  },
  {
    id: "pledge-for-the-planet",
    slug: "pledge-for-the-planet",
    title: "Experiencias web narrativas",
    summary:
      "Cuando el mensaje necesita presencia, una experiencia web combina interfaz clara, narrativa visual para acompañar la historia.",
    description:
      "Experiencias web con interfaz moderna y narrativa visual. Combinan diseño interactivo y video para reforzar el mensaje, manteniendo una UI fluida y accesible. Ideales cuando el producto o la causa necesitan una presentación memorable sin perder usabilidad.",
    tags: ["Next.js", "Video Integration", "UX/UI", "Tailwind"],
    imageUrl: "/portfolio/pledge-mockup.png",
    videoUrl: "/portfolio/pledge-for-the-planet.mp4",
    link: "https://app.pledgefortheplanet.org/",
    github: "",
  },
];
