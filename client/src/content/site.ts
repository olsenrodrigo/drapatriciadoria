export const WHATSAPP_NUMBER = "5517999999999"; // TODO: confirmar número real com a Dra. Patrícia
export const CONTACT_EMAIL = "drapatriciadoria@gmail.com";

export const site = {
  name: "Dra. Patrícia Doria Lourenço",
  crm: "CRM-SP 082229 · CRM-SC 26183",
  locationNote: "Endereço e dias de atendimento serão confirmados no agendamento.",
  whatsapp: WHATSAPP_NUMBER,
  email: CONTACT_EMAIL,
  company: {
    legalName: "S. MARAO LOURENCO JUNIOR SERVICOS MEDICOS LTDA",
    cnpj: "64.414.989/0001-62",
    address: "Av. Presidente Juscelino Kubitschek de Oliveira, 2040, Apto. 43 — Jardim Tarraf II, São José do Rio Preto — SP, CEP 15.092-415",
    email: CONTACT_EMAIL,
  },
};

export const whatsappUrl = (message = "Olá! Vim pelo site e gostaria de agendar uma consulta.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
