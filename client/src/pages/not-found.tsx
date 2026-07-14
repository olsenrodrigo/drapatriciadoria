import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return <div data-theme="gateway" className="not-found"><Seo title="Página não encontrada | Dra. Patrícia Doria" description="A página solicitada não foi encontrada." /><main><p className="eyebrow">Erro 404</p><h1>Página não encontrada.</h1><p>O endereço acessado não existe ou foi alterado.</p><Link href="/" className="button primary">Voltar ao início</Link></main></div>;
}
