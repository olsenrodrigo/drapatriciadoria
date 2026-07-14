import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import portrait1 from "@/assets/images/drapatricia1.jpeg";
import portrait2 from "@/assets/images/drapatricia2.jpeg";
import consultorio1 from "@/assets/images/drapatriciaconsultorio1.jpeg";
import consultorio2 from "@/assets/images/drapatriciaconsultorio2.jpeg";

const photos = [
  { src: portrait1, alt: "Dra. Patrícia Doria Lourenço sorrindo em retrato profissional" },
  { src: consultorio1, alt: "Dra. Patrícia Doria Lourenço em seu consultório" },
  { src: portrait2, alt: "Dra. Patrícia Doria Lourenço em retrato profissional" },
  { src: consultorio2, alt: "Dra. Patrícia Doria Lourenço trabalhando no consultório" },
];

export function PhotoCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const sync = useCallback(() => api && setSelected(api.selectedScrollSnap()), [api]);
  useEffect(() => { if (!api) return; sync(); api.on("select", sync); return () => { api.off("select", sync); }; }, [api, sync]);
  useEffect(() => { if (!api) return; const timer = window.setInterval(() => api.scrollNext(), 5000); return () => window.clearInterval(timer); }, [api]);
  return <div className="photo-carousel" aria-roledescription="carrossel" aria-label="Fotos da Dra. Patrícia">
    <div className="carousel-viewport" ref={ref}><div className="carousel-track">
      {photos.map((photo, index) => <div className="carousel-slide" key={photo.src}><img src={photo.src} alt={photo.alt} loading={index ? "lazy" : "eager"} /></div>)}
    </div></div>
    <div className="carousel-dots" aria-label="Selecionar foto">{photos.map((_, i) => <button key={i} className={selected === i ? "active" : ""} onClick={() => api?.scrollTo(i)} aria-label={`Ir para foto ${i + 1}`} aria-current={selected === i ? "true" : undefined} />)}</div>
  </div>;
}
