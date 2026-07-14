import type { SpecialtyContent } from "@/content/types";
import useEmblaCarousel from "embla-carousel-react";

export function Testimonials({ content }: { content: SpecialtyContent["testimonials"] }) {
  const [ref] = useEmblaCarousel({ loop: content.items.length > 1 });
  if (!content.items.length) return null;
  return <section className="section"><div className="container"><p className="eyebrow">Depoimentos</p><h2>{content.title}</h2><div className="testimonials" ref={ref}><div className="testimonials-track">{content.items.map(item => <blockquote key={item.quote}><p>“{item.quote}”</p><cite>{item.author}</cite></blockquote>)}</div></div></div></section>;
}
