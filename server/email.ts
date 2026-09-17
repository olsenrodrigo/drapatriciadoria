import nodemailer, { type Transporter } from "nodemailer";

/**
 * Entrega dos leads do formulário.
 *
 * Dois caminhos, nesta ordem:
 *   1. **Resend**, se `RESEND_API_KEY` estiver definida — HTTP puro, sem porta
 *      SMTP. É o que funciona quando a 587 está bloqueada na saída.
 *   2. **SMTP** via nodemailer, se `SMTP_HOST` estiver definida.
 *
 * O lead já foi gravado no banco por `routes.ts` antes de chegar aqui, então
 * uma falha de envio não custa o contato — custa só o aviso.
 *
 * Remetente: o Resend só entrega de domínio verificado na conta. O domínio da
 * Dra. Patrícia não está verificado lá, então o padrão sai de `sintetiza.ai`
 * (que está) e o `reply_to` aponta para o paciente — responder no cliente de
 * e-mail fala direto com ele. Para enviar do domínio próprio, verificar o
 * domínio no Resend e sobrescrever `MAIL_FROM`.
 */

const REMETENTE_PADRAO = "Site Dra. Patrícia Doria <nao-responda@sintetiza.ai>";
const DESTINO_PADRAO = "contato@drapatriciadoria.com.br";

interface ContactData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function mailProvider(): "resend" | "smtp" | "none" {
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST) return "smtp";
  return "none";
}

const destino = () => process.env.CONTACT_EMAIL || DESTINO_PADRAO;
const remetente = () => process.env.MAIL_FROM || REMETENTE_PADRAO;

let transporter: Transporter | null = null;
function getTransporter(): Transporter {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 é TLS implícito; 587 sobe para TLS via STARTTLS.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
  return transporter;
}

/** O que o visitante digita entra no HTML do e-mail: sem escapar, um `<` no
 *  campo de mensagem quebra o layout e abre espaço para marcação arbitrária. */
function esc(valor: string): string {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function corpo(data: ContactData) {
  const linha = (rotulo: string, valor: string, zebra: boolean) =>
    `<tr${zebra ? ' style="background:#f9fafb"' : ""}>` +
    `<td style="padding:8px 12px;font-weight:bold;color:#494949;vertical-align:top;width:100px">${rotulo}</td>` +
    `<td style="padding:8px 12px;color:#212529;white-space:pre-line">${valor}</td></tr>`;

  const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="color:#2C3E50;margin-bottom:24px">Nova solicitação de consulta</h2>
        <table style="width:100%;border-collapse:collapse">
          ${linha("Nome", esc(data.name), false)}
          ${linha("Telefone", esc(data.phone), true)}
          ${linha("E-mail", `<a href="mailto:${encodeURI(data.email)}">${esc(data.email)}</a>`, false)}
          ${linha("Mensagem", esc(data.message), true)}
        </table>
        <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb">
        <p style="font-size:12px;color:#9ca3af">Enviado pelo formulário do site</p>
      </div>
    `;

  const text = [
    "Nova solicitação de consulta",
    "",
    `Nome: ${data.name}`,
    `Telefone: ${data.phone}`,
    `E-mail: ${data.email}`,
    "",
    "Mensagem:",
    data.message,
    "",
    "— Enviado pelo formulário do site",
  ].join("\n");

  return { html, text };
}

async function viaResend(data: ContactData) {
  const { html, text } = corpo(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: remetente(),
      to: [destino()],
      reply_to: data.email,
      subject: `Nova consulta – ${data.name}`,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const detalhe = await res.text().catch(() => "");
    throw new Error(`Resend respondeu ${res.status}: ${detalhe.slice(0, 300)}`);
  }
}

async function viaSmtp(data: ContactData) {
  const { html, text } = corpo(data);
  await getTransporter().sendMail({
    from: remetente(),
    to: destino(),
    replyTo: data.email,
    subject: `Nova consulta – ${data.name}`,
    html,
    text,
  });
}

export async function sendContactEmail(data: ContactData) {
  const provedor = mailProvider();
  if (provedor === "none") {
    throw new Error(
      "Nenhum provedor de e-mail configurado: defina RESEND_API_KEY ou SMTP_HOST. O lead está salvo no banco.",
    );
  }

  if (provedor === "resend") await viaResend(data);
  else await viaSmtp(data);

  console.log(`[email] lead enviado via ${provedor} para ${destino()}`);
}
