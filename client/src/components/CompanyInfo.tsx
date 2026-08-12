import { site } from "@/content/site";

const { company } = site;

/* Dados cadastrais exibidos no rodapé — exigidos na verificação da Business Manager (Meta). */
export function CompanyInfo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return <dl className={`company-info ${variant}`} aria-label="Dados da empresa">
    <div><dt>Razão social</dt><dd>{company.legalName}</dd></div>
    <div className="company-cnpj"><dt>CNPJ</dt><dd>{company.cnpj}</dd></div>
    <div className="company-address"><dt>Endereço</dt><dd>{company.address}</dd></div>
    <div className="company-email"><dt>E-mail</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
  </dl>;
}
