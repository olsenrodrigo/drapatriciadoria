import hero from "@/assets/images/drapatriciaconsultorio1.jpeg";
import about from "@/assets/images/drapatriciaconsultorio2.jpeg";
import type { SpecialtyContent } from "./types";

export const endoscopia: SpecialtyContent = {
  theme: "endoscopia",
  seo: { title: "Endoscopia e Colonoscopia em São Paulo e São José do Rio Preto | Dra. Patrícia Doria Lourenço", description: "Endoscopia e colonoscopia com rigor técnico, atenção ao conforto e mais de duas décadas de experiência." },
  navLabel: "Endoscopia e Colonoscopia", other: { label: "Medicina Estética", href: "/estetica" },
  hero: { eyebrow: "Endoscopia e Colonoscopia", title: "Cuidado técnico, com o conforto que você precisa.", subtitle: "Dra. Patrícia Doria Lourenço, cirurgiã geral, especialista em endoscopia e colonoscopia.", body: "Mais de duas décadas de experiência, com atenção especial a exames delicados, incluindo crianças e adultos com receio do procedimento.", image: hero, imageAlt: "Dra. Patrícia Doria Lourenço em seu consultório" },
  about: { eyebrow: "Sobre a Dra. Patrícia", lead: "Mais de duas décadas dedicadas à endoscopia e à colonoscopia.", paragraphs: ["Venho de uma família de cirurgiões. Fiz cirurgia geral e me especializei em endoscopia, construindo uma carreira de referência em exames delicados, inclusive em crianças, atendidas com um cuidado que se tornou minha marca em São José do Rio Preto.", "Minha formação cirúrgica está por trás de cada exame: rigor técnico e atenção a detalhes que fazem diferença no diagnóstico."], image: about, imageAlt: "Dra. Patrícia Doria Lourenço trabalhando em seu consultório" },
  services: { eyebrow: "Áreas de atuação", title: "Exames conduzidos com rigor cirúrgico e atenção ao conforto do paciente.", items: [
    { title: "Endoscopia e Colonoscopia de Rotina", text: "Exames diagnósticos e terapêuticos, conduzidos com o rigor de quem também é cirurgiã geral.", icon: "stethoscope" },
    { title: "Endoscopia Delicada — Atendimento Pediátrico", text: "Experiência consolidada como referência em exames delicados em crianças.", icon: "heart" },
    { title: "Colonoscopia sem Constrangimento", text: "Preparo facilitado e equipe majoritariamente feminina, para quem adiou o exame por vergonha ou receio.", icon: "shield" },
  ]},
  middleCta: { title: "Adiou o exame por receio? Você não está sozinho(a).", text: "Preparo facilitado, equipe majoritariamente feminina e uma consulta prévia para explicar cada etapa com calma." },
  differentials: ["Cirurgiã geral com especialização em endoscopia", "Referência em exames delicados, inclusive pediátricos", "Preparo facilitado e equipe majoritariamente feminina", "Esclarecimento de dúvidas prévias sempre que necessário."],
  locations: ["São Paulo — SP", "São José do Rio Preto — SP"], testimonials: { title: "O que dizem os pacientes", items: [] },
  finalCta: { title: "Cuidado técnico. A mesma exigência cirúrgica em cada exame.", text: "Agende sua consulta virtual prévia com a Dra. Patrícia e entenda cada etapa do exame com tranquilidade." },
  faq: [
    { question: "Vocês atendem convênio?", answer: "O atendimento é particular." },
    { question: "Preciso passar por consulta antes do exame?", answer: "Sim — há consulta pré-anestésica com anestesista. Caso queira fazer uma consulta prévia com a Dra. Patrícia, será um prazer!" },
    { question: "A Dra. Patrícia atende crianças na endoscopia?", answer: "Sim, com bastante experiência em exames delicados nesse público." },
    { question: "Tenho vergonha/medo de fazer colonoscopia, isso é comum?", answer: "Muito comum. O preparo é facilitado e a equipe é majoritariamente feminina, para você se sentir confortável." },
    { question: "Em quais cidades a Dra. Patrícia atende?", answer: "São Paulo — SP e São José do Rio Preto — SP." },
  ], form: { title: "Agende seu exame", track: "Endoscopia/Colonoscopia", fields: "endoscopia" },
};
