export type SpecialtyTheme = "endoscopia" | "estetica";

export type IconName = "stethoscope" | "heart" | "shield" | "sparkles" | "droplets" | "user" | "scan" | "check";

export interface SpecialtyContent {
  theme: SpecialtyTheme;
  seo: { title: string; description: string };
  navLabel: string;
  other: { label: string; href: string };
  hero: { eyebrow: string; title: string; subtitle: string; body: string; image: string; imageAlt: string };
  about: { eyebrow: string; lead: string; paragraphs: string[]; image: string; imageAlt: string };
  services: { eyebrow: string; title: string; intro?: string; note?: string; items: Array<{ title: string; text: string; icon: IconName }> };
  middleCta: { title: string; text: string };
  differentials: string[];
  locations: string[];
  testimonials: { title: string; items: Array<{ quote: string; author: string }> };
  finalCta: { title: string; text: string };
  faq: Array<{ question: string; answer: string }>;
  form: { title: string; track: string; fields: "endoscopia" | "estetica" };
}
