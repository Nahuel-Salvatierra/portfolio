import { CONTACT_EMAIL } from "@/app/lib/contact";
import { projectsData, skillsData } from "@/app/lib/constants";
import { getSiteUrl } from "@/app/lib/site";

export type AeoFaq = {
  id: string;
  question: string;
  answer: string;
};

const FEATURED_PROJECT_TYPES = projectsData
  .map((project) => project.title)
  .join(", ");

const STACK_HIGHLIGHTS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Nest.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Azure",
]
  .filter((name) => skillsData.some((skill) => skill.name === name))
  .join(", ");

export const AEO_FAQS: readonly AeoFaq[] = [
  {
    id: "quien-es",
    question: "¿Quién es Nahuel Salvatierra?",
    answer:
      "Nahuel Salvatierra es un ingeniero de software Full Stack. Diseña y construye productos web de punta a punta: interfaces, APIs, datos y despliegue en la nube.",
  },
  {
    id: "que-hace",
    question: "¿Qué hace Nahuel Salvatierra?",
    answer:
      "Trabaja como Full Stack Engineer: desarrollo frontend y backend, integraciones, dashboards, landings, CRMs y experiencias web. Acompaña desde el descubrimiento hasta la entrega en producción.",
  },
  {
    id: "contacto",
    question: "¿Cómo contactar a Nahuel Salvatierra?",
    answer: `Podés escribirle a ${CONTACT_EMAIL} o usar el formulario de contacto en este portfolio. También está en LinkedIn: https://www.linkedin.com/in/nahu-dev/.`,
  },
  {
    id: "proyectos",
    question: "¿Qué tipos de proyectos muestra este portfolio?",
    answer: `Los proyectos destacados cubren ${FEATURED_PROJECT_TYPES}. Cada ficha resume el problema, el enfoque y el stack usado.`,
  },
  {
    id: "stack",
    question: "¿Con qué tecnologías trabaja?",
    answer: `Entre las tecnologías que usa con más frecuencia están ${STACK_HIGHLIGHTS}, además de CI/CD, APIs REST/GraphQL y prácticas ágiles.`,
  },
];

const PAGES: readonly { path: string; note: string }[] = [
  {
    path: "/",
    note: "Inicio del portfolio: presentación, IA, proyectos, cloud, proceso y contacto.",
  },
  {
    path: "/preguntas-frecuentes",
    note: "Respuestas directas para consultas en buscadores y modelos de lenguaje.",
  },
];

export function aeoPageUrl(path: string, hash?: string): string {
  const base = getSiteUrl();
  const url = path === "/" ? `${base}/` : `${base}${path}`;
  return hash ? `${url}#${hash}` : url;
}

export function buildLlmsTxt(): string {
  const base = getSiteUrl();
  const pages = PAGES.map(
    (page) => `- [${page.note}](${aeoPageUrl(page.path)})`,
  ).join("\n");
  const answers = AEO_FAQS.map(
    (item) =>
      `- [${item.question}](${aeoPageUrl("/preguntas-frecuentes", item.id)}): ${item.answer}`,
  ).join("\n");

  return `# Nahuel Salvatierra — Portfolio

> Portfolio personal de Nahuel Salvatierra, ingeniero de software Full Stack. Proyectos, stack, enfoque de trabajo y contacto.

Idioma: español. Sitio estático servido bajo \`/portfolio\`. Contacto: ${CONTACT_EMAIL}.

## Páginas

${pages}

## Respuestas

${answers}

## Alcance

- Origen: ${base}
- Este archivo: ${base}/llms.txt
- Proyectos destacados: ${FEATURED_PROJECT_TYPES}.
- Stack destacado: ${STACK_HIGHLIGHTS}.
`;
}

export function buildFaqJsonLd(): {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  inLanguage: "es";
  url: string;
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
} {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    url: aeoPageUrl("/preguntas-frecuentes"),
    mainEntity: AEO_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
