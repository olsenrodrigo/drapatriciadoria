import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { grafoJsonLd, llmsTxt, ORIGIN, rotas, urlDaRota } from "@/content/seo";
import { site } from "@/content/site";

/**
 * Entrada usada só no build, por `script/prerender.ts`.
 *
 * Motivo: buscadores de IA (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot,
 * CCBot) e vários validadores não executam JavaScript. Sem HTML estático eles
 * veem apenas `<div id="root"></div>`. E as três rotas deixam de compartilhar
 * o mesmo <title>, que é o que hoje faz o Google tratá-las como duplicadas.
 */

const escapar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function renderizarRota(path: string) {
  const dados = rotas.find((r) => r.path === path);
  if (!dados) throw new Error(`Rota sem registro em content/seo.ts: ${path}`);

  const corpo = renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );

  const url = urlDaRota(path);
  const imagem = `${ORIGIN}/opengraph.jpg`;

  const cabeca = [
    `<title>${escapar(dados.title)}</title>`,
    `<meta name="description" content="${escapar(dados.description)}" />`,
    `<meta name="keywords" content="${escapar(dados.keywords.join(", "))}" />`,
    `<meta name="author" content="${escapar(site.name)}" />`,
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="geo.region" content="BR-SP" />`,
    `<meta property="og:title" content="${escapar(dados.title)}" />`,
    `<meta property="og:description" content="${escapar(dados.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${escapar(site.name)}" />`,
    `<meta property="og:image" content="${imagem}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapar(dados.title)}" />`,
    `<meta name="twitter:description" content="${escapar(dados.description)}" />`,
    `<meta name="twitter:image" content="${imagem}" />`,
    `<script type="application/ld+json">${JSON.stringify(grafoJsonLd(path)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");

  return { corpo, cabeca };
}

export const caminhos = rotas.map((r) => r.path);
export const origem = ORIGIN;
export const llms = llmsTxt();
