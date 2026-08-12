import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Accordion from "@radix-ui/react-accordion";
import { Check, ChevronDown, Droplets, Heart, MapPin, Menu, Scan, Shield, Sparkles, Stethoscope, User, X } from "lucide-react";
import type { IconName, SpecialtyContent } from "@/content/types";
import { site, whatsappUrl } from "@/content/site";
import { Seo } from "./Seo";
import { CompanyInfo } from "./CompanyInfo";
import { Testimonials } from "./Testimonials";

const icons = { stethoscope: Stethoscope, heart: Heart, shield: Shield, sparkles: Sparkles, droplets: Droplets, user: User, scan: Scan, check: Check } satisfies Record<IconName, typeof Check>;
const baseSchema = z.object({ name: z.string().min(2, "Informe seu nome."), phone: z.string().min(8, "Informe seu WhatsApp."), email: z.string().email("Informe um e-mail válido."), subject: z.string().min(1, "Selecione uma opção."), message: z.string().optional() });
const examSchema = baseSchema.extend({ previous: z.string().min(1, "Informe se já fez o exame antes."), saoPaulo: z.string().min(1, "Informe se deseja fazer o exame em São Paulo.") });
const aestheticSchema = baseSchema.extend({ previous: z.string().min(1, "Selecione a cidade de preferência."), saoPaulo: z.string().optional() });
type FormData = z.infer<typeof examSchema> | z.infer<typeof aestheticSchema>;

function Navbar({ content }: { content: SpecialtyContent }) {
  const [solid, setSolid] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { const update = () => setSolid(window.scrollY > 30); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  const close = () => setOpen(false);
  return <header className={`navbar ${solid || open ? "solid" : ""}`}><div className="nav-inner">
    <Link href="/" className="wordmark">{site.name}</Link>
    <button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? "open" : ""} aria-label="Navegação principal"><a href="#sobre" onClick={close}>Sobre</a><a href="#atuacao" onClick={close}>Atuação</a><a href="#locais" onClick={close}>Locais</a><a href="#faq" onClick={close}>Dúvidas</a><Link href={content.other.href} onClick={close}>{content.other.label}</Link><a className="nav-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar</a></nav>
  </div></header>;
}

function ContactForm({ content }: { content: SpecialtyContent }) {
  const isExam = content.form.fields === "endoscopia";
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(isExam ? examSchema : aestheticSchema) });
  const submit = (data: FormData) => {
    const details = isExam
      ? `Exame para: ${data.subject} | Já fez antes: ${data.previous} | Exame em São Paulo: ${data.saoPaulo}`
      : `Procedimento: ${data.subject} | Cidade: ${data.previous}`;
    window.location.href = whatsappUrl(`Olá! Vim pelo site (${content.form.track}). Nome: ${data.name} | WhatsApp: ${data.phone} | E-mail: ${data.email} | ${details} | Mensagem: ${data.message || "Não informada"}`);
  };
  const fieldError = (name: keyof FormData) => errors[name] && <span className="error" role="alert">{errors[name]?.message}</span>;
  return <section id="contato" className="section form-section"><div className="container form-layout"><div><p className="eyebrow">Agendamento</p><h2>{content.form.title}</h2><p>Preencha os dados. Ao enviar, você continuará o atendimento pelo WhatsApp.</p></div><form onSubmit={handleSubmit(submit)} noValidate>
    <label>Nome<input {...register("name")} autoComplete="name" />{fieldError("name")}</label>
    <div className="form-row"><label>WhatsApp<input {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" />{fieldError("phone")}</label><label>E-mail<input {...register("email")} type="email" autoComplete="email" />{fieldError("email")}</label></div>
    <label>{isExam ? "O exame é para" : "Procedimento de interesse"}<select {...register("subject")} defaultValue=""><option value="" disabled>Selecione</option>{(isExam ? ["Você mesmo(a)", "Seu filho(a)", "Outro familiar"] : ["Botox", "Bioestimulador", "Preenchimento", "Tricologia"]).map(x => <option key={x}>{x}</option>)}</select>{fieldError("subject")}</label>
    <div className="form-row"><label>{isExam ? "Já fez esse exame antes?" : "Cidade de preferência"}<select {...register("previous")} defaultValue=""><option value="" disabled>Selecione</option>{(isExam ? ["Sim", "Não"] : ["São José do Rio Preto", "São Paulo"]).map(x => <option key={x}>{x}</option>)}</select>{fieldError("previous")}</label>{isExam && <label>Exame em São Paulo?<select {...register("saoPaulo")} defaultValue=""><option value="" disabled>Selecione</option><option>Sim</option><option>Não</option></select>{fieldError("saoPaulo")}</label>}</div>
    <label>Mensagem<textarea {...register("message")} rows={4} /></label><button className="button primary submit" type="submit">Continuar pelo WhatsApp</button>
  </form></div></section>;
}

export function SpecialtyLanding({ content }: { content: SpecialtyContent }) {
  return <div data-theme={content.theme}><Seo {...content.seo} /><Navbar content={content} /><main>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">{content.hero.eyebrow}</p><h1>{content.hero.title}</h1><p className="hero-subtitle">{content.hero.subtitle}</p><p>{content.hero.body}</p><div className="actions"><a className="button primary" href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar consulta</a><a className="button secondary" href="#sobre">Conheça a Dra. Patrícia</a></div></div><div className="hero-image"><img src={content.hero.image} alt={content.hero.imageAlt} fetchPriority="high" /></div></div></section>
    <section id="sobre" className="section alt"><div className="container about-grid"><img src={content.about.image} alt={content.about.imageAlt} loading="lazy" /><div><p className="eyebrow">{content.about.eyebrow}</p><h2>{content.about.lead}</h2>{content.about.paragraphs.map(p => <p key={p}>{p}</p>)}<p className="crm">{site.crm}</p></div></div></section>
    <section id="atuacao" className="section"><div className="container"><p className="eyebrow">{content.services.eyebrow}</p><h2>{content.services.title}</h2>{content.services.intro && <p className="section-intro">{content.services.intro}</p>}<div className={`services count-${content.services.items.length}`}>{content.services.items.map(item => { const Icon = icons[item.icon]; return <article key={item.title}><Icon strokeWidth={1.5} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div>{content.services.note && <p className="service-note">{content.services.note}</p>}</div></section>
    <section className="contrast"><div className="container cta-inner"><div><h2>{content.middleCta.title}</h2><p>{content.middleCta.text}</p></div><a className="button light" href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar minha consulta</a></div></section>
    <section className="section alt"><div className="container"><p className="eyebrow">Diferenciais</p><div className="differentials">{content.differentials.map(item => <div key={item}><Check strokeWidth={1.5} aria-hidden="true" /><p>{item}</p></div>)}</div></div></section>
    <section id="locais" className="section"><div className="container"><p className="eyebrow">Locais de atendimento</p><h2>Atendimento em duas cidades</h2><div className="locations">{content.locations.map(city => <article key={city}><MapPin strokeWidth={1.5} aria-hidden="true" /><h3>{city}</h3><p>{site.locationNote}</p></article>)}</div></div></section>
    <Testimonials content={content.testimonials} />
    <section className="contrast"><div className="container final-cta"><h2>{content.finalCta.title}</h2><p>{content.finalCta.text}</p><a className="button light" href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a><small>Atendimento particular. Consulta prévia sempre.</small></div></section>
    <section id="faq" className="section alt"><div className="container narrow"><p className="eyebrow">Dúvidas frequentes</p><h2>Informações para sua consulta</h2><Accordion.Root type="single" collapsible className="faq">{content.faq.map((item, i) => <Accordion.Item value={`item-${i}`} key={item.question}><Accordion.Header><Accordion.Trigger>{item.question}<ChevronDown strokeWidth={1.5} aria-hidden="true" /></Accordion.Trigger></Accordion.Header><Accordion.Content><p>{item.answer}</p></Accordion.Content></Accordion.Item>)}</Accordion.Root></div></section>
    <ContactForm content={content} />
  </main><footer><div className="container"><div className="footer-inner"><div><strong>{site.name}</strong><small>{site.crm}</small></div><nav aria-label="Links do rodapé"><a href="#sobre">Sobre</a><a href="#atuacao">Atuação</a><a href="#faq">FAQ</a><Link href={content.other.href}>Conheça também: {content.other.label}</Link></nav><small className="credit">ELYSSA</small></div><CompanyInfo /></div></footer></div>;
}
