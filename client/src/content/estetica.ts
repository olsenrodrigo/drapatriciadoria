import hero from "@/assets/images/drapatricia1.jpeg";
import about from "@/assets/images/drapatricia2.jpeg";
import type { SpecialtyContent } from "./types";

export const estetica: SpecialtyContent = {
  theme: "estetica",
  seo: { title: "Medicina Estética em São José do Rio Preto e São Paulo | Dra. Patrícia Doria Lourenço", description: "Medicina estética com avaliação individual, segurança, ciência e foco em beleza natural." },
  navLabel: "Medicina Estética", other: { label: "Endoscopia e Colonoscopia", href: "/endoscopia" },
  hero: { eyebrow: "Medicina Estética", title: "Beleza natural, com segurança e ciência.", subtitle: "Dra. Patrícia Doria Lourenço — cirurgiã geral especializada em medicina estética.", body: "Botox, bioestimulador, preenchimento e tricologia, com a exigência técnica de quem também é cirurgiã.", image: hero, imageAlt: "Dra. Patrícia Doria Lourenço sorrindo em retrato profissional" },
  about: { eyebrow: "Sobre a Dra. Patrícia", lead: "Não sou médica de estética. Sou cirurgiã geral que também faz estética.", paragraphs: ["Venho de uma família de cirurgiões. Antes de me especializar em medicina estética, construí mais de duas décadas de carreira em cirurgia geral e endoscopia.", "Uso a mesma exigência técnica e o mesmo rigor da cirurgia em cada procedimento estético que realizo — porque acredito que beleza natural se constrói com segurança e ciência, não só com produto."], image: about, imageAlt: "Retrato profissional da Dra. Patrícia Doria Lourenço" },
  services: { eyebrow: "Áreas de atuação", title: "Procedimentos com técnica cirúrgica e olhar de naturalidade.", intro: "Sem exagero, sem padronização, cada avaliação é individual.", note: "A Dra. Patrícia atende homens e mulheres.", items: [
    { title: "Botox / Toxina Botulínica", text: "Suaviza linhas de expressão preservando a naturalidade dos movimentos do rosto.", icon: "sparkles" },
    { title: "Bioestimulador de Colágeno", text: "Estimula a produção natural de colágeno para firmeza e viço da pele.", icon: "droplets" },
    { title: "Preenchimento", text: "Harmonização facial com foco em equilíbrio e naturalidade.", icon: "user" },
    { title: "Tricologia", text: "Avaliação e tratamento capilar.", icon: "scan" },
  ]},
  middleCta: { title: "O primeiro passo é sempre uma consulta.", text: "Nenhum procedimento é tratado como algo avulso, a Dra. Patrícia avalia seu caso com calma antes de qualquer indicação." },
  differentials: ["Cirurgiã geral com formação em medicina estética", "Consulta prévia sempre, avaliação individual, nunca padronizada", "Décadas de experiência clínica e cirúrgica", "Atendimento particular, em São José do Rio Preto e em São Paulo"],
  locations: ["São José do Rio Preto — SP", "São Paulo — SP"], testimonials: { title: "O que dizem as pacientes", items: [] },
  finalCta: { title: "Beleza natural. Cuidado técnico. A mesma exigência em cada consulta.", text: "Agende sua consulta com a Dra. Patrícia e receba uma avaliação individual, sem procedimentos padronizados." },
  faq: [
    { question: "Vocês atendem convênio?", answer: "O atendimento é particular." },
    { question: "Preciso passar por consulta antes do procedimento?", answer: "Sim, a consulta prévia é sempre o primeiro passo, para a Dra. Patrícia entender seu caso e explicar tudo com calma." },
    { question: "Quais procedimentos vocês realizam?", answer: "Botox, bioestimulador de colágeno, preenchimento e tricologia, medicina regenerativa, endolaser, entre outros." },
    { question: "Em quais cidades a Dra. Patrícia atende?", answer: "São José do Rio Preto — SP e São Paulo — SP." },
  ], form: { title: "Agende sua consulta", track: "Estética", fields: "estetica" },
};
