export const CONTACT_EMAIL = "salvatierra.nahuel@gmail.com";

export function buildContactMailto(params: {
  name: string;
  email: string;
  message: string;
}): string {
  const subject = encodeURIComponent(`Consulta de ${params.name}`);
  const body = encodeURIComponent(
    `Nombre: ${params.name}\nEmail: ${params.email}\n\n${params.message}`,
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
