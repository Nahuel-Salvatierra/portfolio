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

const LLMS_FAQS: readonly AeoFaq[] = [
  {
    id: "quien-es",
    question: "Who is Nahuel Salvatierra?",
    answer:
      "Nahuel Salvatierra is a Full Stack software engineer. He designs and builds web products end to end: interfaces, APIs, data and cloud deployment.",
  },
  {
    id: "que-hace",
    question: "What does Nahuel Salvatierra do?",
    answer:
      "He works as a Full Stack Engineer: frontend and backend, integrations, dashboards, landing pages, CRMs and web experiences — from discovery through production delivery.",
  },
  {
    id: "contacto",
    question: "How can I contact Nahuel Salvatierra?",
    answer: `Email ${CONTACT_EMAIL}, use the contact form on this portfolio, or reach him on LinkedIn: https://www.linkedin.com/in/nahu-dev/.`,
  },
  {
    id: "proyectos",
    question: "What kinds of projects does this portfolio show?",
    answer: `Featured work covers ${FEATURED_PROJECT_TYPES}. Each card summarizes the problem, approach and stack.`,
  },
  {
    id: "stack",
    question: "What technologies does he use?",
    answer: `Frequent stack highlights include ${STACK_HIGHLIGHTS}, plus CI/CD, REST/GraphQL APIs and agile practices.`,
  },
];

const PAGES: readonly { path: string; note: string }[] = [
  {
    path: "/",
    note: "Home — intro, AI focus, projects, cloud, process and contact",
  },
  {
    path: "/preguntas-frecuentes",
    note: "FAQ",
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
  const answers = LLMS_FAQS.map(
    (item) =>
      `### ${item.question}\n\n${item.answer}\n\nSource: ${aeoPageUrl("/preguntas-frecuentes", item.id)}`,
  ).join("\n\n");

  return `# Nahuel Salvatierra — Portfolio

> Personal portfolio of Nahuel Salvatierra, Full Stack software engineer. Projects, stack, working approach and contact.

The site UI is in Spanish and is served under \`/portfolio\`. Contact: ${CONTACT_EMAIL}.

## Pages

${pages}

## Answers

${answers}

## Scope

- Origin: ${base}
- This file: ${base}/llms.txt
- Featured projects: ${FEATURED_PROJECT_TYPES}.
- Stack highlights: ${STACK_HIGHLIGHTS}.
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
