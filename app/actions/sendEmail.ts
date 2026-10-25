import nodemailer from "nodemailer";

type SendEmailParams = {
  html: string;
  recipient: string;
  subject?: string;
};

/** SMTP helper for Node hosts (not used by the static-export contact form). */
export async function sendEmail({
  html,
  recipient,
  subject = "Consulta desde el portfolio",
}: SendEmailParams): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject,
      html,
      text: "Consulta desde el portfolio. Abrí este correo en un cliente con HTML para ver el detalle.",
    });
  } catch (error) {
    console.error("Error enviando email:", error);
    throw new Error("Error enviando el correo.");
  }
}
