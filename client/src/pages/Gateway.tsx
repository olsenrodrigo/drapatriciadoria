import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { Seo } from "@/components/Seo";
import { site } from "@/content/site";

export default function Gateway() {
  return <div data-theme="gateway" className="gateway"><Seo title="Dra. Patrícia Doria Lourenço — Cirurgiã Geral | Endoscopia e Medicina Estética" description="Dra. Patrícia Doria Lourenço: cirurgia geral, endoscopia, colonoscopia e medicina estética em São Paulo e São José do Rio Preto." /><main className="gateway-main"><div className="gateway-grid"><PhotoCarousel /><div className="gateway-copy"><p className="eyebrow">Cirurgiã geral</p><h1>{site.name}</h1><p className="gateway-support">Cirurgiã geral · Endoscopia e Colonoscopia · Medicina Estética</p><p className="crm">{site.crm}</p><div className="gateway-doors"><Link href="/endoscopia" className="door endoscopy"><span><strong>Endoscopia e Colonoscopia</strong><small>Cuidado técnico, com o conforto que você precisa</small></span><ArrowRight strokeWidth={1.5} aria-hidden="true" /></Link><Link href="/estetica" className="door aesthetics"><span><strong>Medicina Estética</strong><small>Beleza natural, com segurança e ciência</small></span><ArrowRight strokeWidth={1.5} aria-hidden="true" /></Link></div></div></div></main><footer className="gateway-footer"><span>{site.crm}</span><span>ELYSSA</span></footer></div>;
}
