export const WHATSAPP_NUMBER = "5517999999999"; // TODO: confirmar número real com a Dra. Patrícia

export const site = {
  name: "Dra. Patrícia Doria Lourenço",
  crm: "CRM-SP 082229 · CRM-SC 26183",
  locationNote: "Endereço e dias de atendimento serão confirmados no agendamento.",
  whatsapp: WHATSAPP_NUMBER,
};

export const whatsappUrl = (message = "Olá! Vim pelo site e gostaria de agendar uma consulta.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
