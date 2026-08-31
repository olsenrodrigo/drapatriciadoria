// Registro de SEO/GEO: origem canônica, uma entrada por rota e o texto do
// llms.txt. Fonte única lida pelo pré-render (`entry-ssr.tsx`).
//
// Por que existe: até aqui as três rotas serviam o MESMO index.html, com o
// mesmo <title> e a mesma description. Para o Google eram três URLs
// indistinguíveis — ele escolhe uma e descarta as outras. E para os crawlers de
// IA, que não executam JavaScript, o HTML era só `<div id="root"></div>`.

import { endoscopia } from "./endoscopia";
import { estetica } from "./estetica";
import { CONTACT_EMAIL, WHATSAPP_NUMBER, site } from "./site";

/** Sem barra final. Produção responde em www (o ápice redireciona 301). */
export const ORIGIN = "https://www.drapatriciadoria.com.br";

export const urlDaRota = (path: string) =>
  path === "/" ? `${ORIGIN}/` : `${ORIGIN}${path}`;

export type Rota = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  faq?: Array<{ question: string; answer: string }>;
};

export const rotas: Rota[] = [
  {
    path: "/",
    title:
      "Dra. Patrícia Doria Lourenço | Cirurgiã Geral, Endoscopia e Medicina Estética",
    description:
      "Dra. Patrícia Doria Lourenço (CRM-SP 082229), cirurgiã geral com mais de duas décadas de experiência. Endoscopia e colonoscopia, e medicina estética, em São Paulo e São José do Rio Preto.",
    keywords: [
      "Dra. Patrícia Doria Lourenço",
      "cirurgiã geral São Paulo",
      "endoscopia São José do Rio Preto",
      "medicina estética São José do Rio Preto",
    ],
  },
  {
    path: "/endoscopia",
    title: endoscopia.seo.title,
    description: endoscopia.seo.description,
    keywords: [
      "endoscopia digestiva alta São Paulo",
      "colonoscopia São Paulo",
      "endoscopia São José do Rio Preto",
      "colonoscopia São José do Rio Preto",
      "endoscopia com sedação",
      "colonoscopia preventiva",
      "endoscopia infantil",
      "exame de endoscopia para quem tem medo",
    ],
    faq: endoscopia.faq,
  },
  {
    path: "/estetica",
    title: estetica.seo.title,
    description: estetica.seo.description,
    keywords: [
      "medicina estética São Paulo",
      "medicina estética São José do Rio Preto",
      "harmonização facial",
      "toxina botulínica",
      "preenchimento facial",
      "bioestimulador de colágeno",
      "médica esteta São José do Rio Preto",
    ],
    faq: estetica.faq,
  },
];

/**
 * JSON-LD por rota. `Physician` é o tipo certo para profissional de saúde;
 * `FAQPage` só entra em página que realmente exibe as perguntas na tela —
 * declarar FAQ sem conteúdo visível correspondente é violação de diretriz.
 */
export function grafoJsonLd(path: string) {
  const rota = rotas.find((r) => r.path === path)!;

  const physician = {
    "@type": "Physician",
    "@id": `${ORIGIN}/#physician`,
    name: site.name,
    url: `${ORIGIN}/`,
    image: `${ORIGIN}/opengraph.jpg`,
    identifier: site.crm,
    telephone: `+${WHATSAPP_NUMBER}`,
    email: CONTACT_EMAIL,
    medicalSpecialty: ["Gastroenterologic Surgery", "Surgical", "Dermatology"],
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      { "@type": "City", name: "São José do Rio Preto" },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: site.company.legalName,
      taxID: site.company.cnpj,
    },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${urlDaRota(path)}#webpage`,
    url: urlDaRota(path),
    name: rota.title,
    description: rota.description,
    inLanguage: "pt-BR",
    about: { "@id": `${ORIGIN}/#physician` },
  };

  const grafo: unknown[] = [physician, webPage];

  if (rota.faq?.length) {
    grafo.push({
      "@type": "FAQPage",
      "@id": `${urlDaRota(path)}#faq`,
      inLanguage: "pt-BR",
      mainEntity: rota.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": grafo };
}

/** `llms.txt`: markdown limpo que motores generativos leem sem executar script. */
export function llmsTxt() {
  const trilha = (c: typeof endoscopia, rota: string) => [
    `## ${c.navLabel}`,
    "",
    c.hero.body,
    "",
    ...c.about.paragraphs,
    "",
    "### Serviços",
    "",
    ...c.services.items.map((i) => `- ${i.title}: ${i.text}`),
    "",
    "### Diferenciais",
    "",
    ...c.differentials.map((d) => `- ${d}`),
    "",
    "### Perguntas frequentes",
    "",
    ...c.faq.flatMap((f) => [`#### ${f.question}`, "", f.answer, ""]),
    `Fonte: ${urlDaRota(rota)}`,
    "",
  ];

  return [
    `# ${site.name}`,
    "",
    `> Cirurgiã geral (${site.crm}) com duas frentes de atendimento: endoscopia e`,
    "> colonoscopia, e medicina estética. Atende em São Paulo e São José do Rio Preto/SP.",
    "",
    "## Ficha",
    "",
    `- Profissional: ${site.name}`,
    `- Registro: ${site.crm}`,
    `- E-mail: ${site.email}`,
    `- Razão social: ${site.company.legalName} (CNPJ ${site.company.cnpj})`,
    `- Site: ${ORIGIN}/`,
    `- Observação: ${site.locationNote}`,
    "",
    ...trilha(endoscopia, "/endoscopia"),
    ...trilha(estetica, "/estetica"),
    "## Observações",
    "",
    "- Este site é informativo e não substitui consulta médica: nenhuma conduta é",
    "  indicada sem avaliação presencial.",
    `- Fonte: ${ORIGIN}/`,
  ].join("\n");
}
