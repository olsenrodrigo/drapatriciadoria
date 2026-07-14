# PLANO — Site Dra. Patrícia Doria Lourenço

> Planejamento: Fable 5 (Claude). Execução: Codex. Base: whitelabel_v2 (já copiada para este diretório, deps instaladas).
> Fontes de conteúdo (LER ANTES DE COMEÇAR — a copy deve ser seguida fielmente):
> - `../insumos/COPY DA LANDING PAGE — ENDOSCOPIA E COLONOSCOPIA.md`
> - `../insumos/COPY DA LANDING PAGE — ESTÉTICA.md`
> Fotos já copiadas em `client/src/assets/images/` (drapatricia1.jpeg, drapatricia2.jpeg, drapatriciaconsultorio1.jpeg, drapatriciaconsultorio2.jpeg).

## 1. Conceito

Dra. Patrícia tem DUAS especialidades com públicos, tons e paletas distintos. O site é UM sistema com TRÊS rotas:

| Rota | Conteúdo | Tema |
|---|---|---|
| `/` | Portal de entrada: carrossel de fotos da Dra. + apresentação breve + duas "portas" para as especialidades | Neutro elegante (ponte entre os dois temas) |
| `/endoscopia` | Landing completa com a copy de Endoscopia/Colonoscopia | `endoscopia` (verde-petróleo, sóbrio, institucional) |
| `/estetica` | Landing completa com a copy de Estética | `estetica` (rosé/terroso, leve, aspiracional) |

As duas landings usam a MESMA árvore de componentes (`SpecialtyLanding`), alimentada por um objeto de conteúdo tipado. Só mudam: copy, paleta, fotos, campos do formulário e metadados.

## 2. Estrutura de arquivos (criar/alterar)

```
client/src/
  content/
    types.ts            — tipos do conteúdo (SpecialtyContent)
    endoscopia.ts       — toda a copy da trilha endoscopia
    estetica.ts         — toda a copy da trilha estética
    site.ts             — dados globais: nome, CRMs, WhatsApp, cidades, portal
  pages/
    Gateway.tsx         — página raiz (portal)
    Endoscopia.tsx      — <SpecialtyLanding content={endoscopia} theme="endoscopia" />
    Estetica.tsx        — <SpecialtyLanding content={estetica} theme="estetica" />
  components/
    SpecialtyLanding.tsx — orquestra as seções (substitui Home.tsx)
    PhotoCarousel.tsx    — carrossel embla com as 4 fotos (usar embla-carousel-react, já nas deps)
    ... componentes de seção existentes refatorados para receber conteúdo via props
  App.tsx               — rotas wouter: /, /endoscopia, /estetica, 404
  index.css             — temas via CSS variables com escopo [data-theme="..."]
```

- `Home.tsx` sai de cena (apagar ou deixar de referenciar).
- O atributo `data-theme` vai no elemento raiz de cada página; os componentes usam APENAS variáveis CSS (nada de hex hardcoded nos componentes — o whitelabel atual tem hex inline espalhado, ex. `Hero.tsx`; trocar por `var(--...)`).

## 3. Paletas (CSS variables em index.css)

Tema base/neutro (Gateway) e dois overrides:

**`[data-theme="endoscopia"]`** — institucional, técnico, sóbrio:
- `--primary: #124A4F` (verde-petróleo profundo — headlines, botões)
- `--accent: #3E7C78` (petróleo médio — eyebrows, detalhes, hovers)
- `--background: #F7F7F4` · `--surface-alt: #EDF0EE` (seções alternadas)
- `--foreground: #1E2A2B` · `--muted-text: #55625F`
- Blocos de contraste (CTA intermediário/final): fundo `#124A4F`, texto `#F4F1EA`

**`[data-theme="estetica"]`** — rosé/terroso elegante (próximo ao Instagram dela):
- `--primary: #8A5A52` (rosé terroso escuro — headlines, botões)
- `--accent: #C08E80` (rosé claro — eyebrows, detalhes)
- `--background: #FAF6F3` · `--surface-alt: #F3EAE4`
- `--foreground: #443530` · `--muted-text: #7A665F`
- Blocos de contraste: fundo `#6E4A42`, texto `#FBF3EE`

**Gateway (base)**: neutros quentes (`#F8F6F2` fundo, texto `#2B2725`), com o cartão de cada especialidade adotando um toque da sua respectiva paleta (borda/hover petróleo vs. rosé).

## 4. Tipografia

Substituir Lora/Montserrat por **Fraunces** (títulos, weights 400–600, usar `opsz`) + **Figtree** (corpo/UI, 300–600), via Google Fonts no `index.css`. Títulos com peso 500–600 (não 700 gritado), tracking normal. É um pairing menos batido e dá personalidade editorial sem perder sobriedade médica.

## 5. Seções de cada landing (ordem = ordem da copy)

1. **Hero** — 100vh no mobile. Headline da copy, nome + título, parágrafo, CTA primário (WhatsApp) + secundário (âncora #sobre). Foto: `drapatriciaconsultorio1.jpeg` (endoscopia) / `drapatricia1.jpeg` (estética). Foto em destaque real no layout (coluna direita no desktop, presença forte — não o SVG placeholder atual).
2. **Sobre (#sobre)** — texto da copy, frase de abertura em destaque tipográfico (na estética: "Não sou médica de estética. Sou cirurgiã geral que também faz estética."). Foto: `drapatricia2.jpeg` (estética) / `drapatriciaconsultorio2.jpeg` (endoscopia). CRMs: CRM-SP 082229 · CRM-SC 26183.
3. **Áreas de atuação** — grid de cards (3 na endoscopia, 4 na estética). Ícones lucide discretos (linha fina). Na estética incluir a observação "A Dra. Patrícia atende homens e mulheres" como nota abaixo do grid.
4. **CTA intermediário** — bloco de contraste com fundo `--primary` escuro. Texto da copy. Botão WhatsApp.
5. **Diferenciais** — barra com os 4 itens da copy, ícone minimalista acima de cada um.
6. **Locais de atendimento** — 2 cards de cidade. Endoscopia: São Paulo–SP e São José do Rio Preto–SP. Estética: São José do Rio Preto–SP e São Paulo–SP (ordem da copy). Usar texto "Endereço e dias de atendimento serão confirmados no agendamento." (os endereços ainda não existem — NÃO inventar endereço, NÃO usar mapa fake).
7. **Depoimentos** — implementar o componente (carrossel), mas renderizar null enquanto `testimonials.items` estiver vazio (a copy manda ocultar até haver conteúdo real).
8. **CTA final** — bloco de contraste, texto da copy, botão "Agendar pelo WhatsApp", microtexto "Atendimento particular. Consulta prévia sempre."
9. **FAQ** — accordion (radix já disponível), perguntas/respostas exatamente como na copy de cada trilha.
10. **Formulário** — campos DIFERENTES por trilha (ver §6).
11. **Footer** — nome, CRMs, links âncora, link discreto para a OUTRA especialidade ("Conheça também: Medicina Estética" / "...Endoscopia e Colonoscopia"), crédito "ELYSSA" pequeno.

**Navbar**: transparente sobre o hero → sólida no scroll (padrão do whitelabel). Links âncora das seções + um link discreto para a outra trilha. Logo/wordmark: "Dra. Patrícia Doria" em Fraunces.

## 6. Formulários e WhatsApp

Sem backend de e-mail: ao enviar, montar mensagem e redirecionar para `https://wa.me/<numero>?text=<mensagem urlencoded>`. A mensagem DEVE identificar a trilha para a assistente Marina, ex.:

- Endoscopia: `Olá! Vim pelo site (Endoscopia/Colonoscopia). Nome: ... | Exame para: ... | Já fez antes: ... | Exame em São Paulo: ... | Mensagem: ...`
- Estética: `Olá! Vim pelo site (Estética). Nome: ... | Procedimento: ... | Cidade: ... | Mensagem: ...`

Campos endoscopia: Nome, WhatsApp, E-mail, "O exame é para" (você mesmo(a)/seu filho(a)/outro familiar — select), "Já fez esse exame antes?" (sim/não), "Exame em São Paulo?" (sim/não), Mensagem.
Campos estética: Nome, WhatsApp, E-mail, "Procedimento de interesse" (Botox/Bioestimulador/Preenchimento/Tricologia — select), "Cidade de preferência" (SJRP/SP), Mensagem.

Número do WhatsApp: criar constante única em `content/site.ts`:
`export const WHATSAPP_NUMBER = "5517999999999"; // TODO: confirmar número real com a Dra. Patrícia`
Todos os CTAs "Agendar" usam essa constante (hero, CTAs intermediário/final, navbar, formulário).

Validação com react-hook-form + zod (já nas deps). Máscara simples de telefone é bem-vinda, sem libs novas.

## 7. Gateway (rota `/`)

Página de um viewport (desktop) / rolagem curta (mobile):
- Coluna/bloco com **PhotoCarousel** (embla, autoplay suave ~5s, fade ou slide, dots discretos): as 4 fotos. Fotos com `object-cover`, cantos levemente arredondados, sem molduras chamativas.
- Nome grande em Fraunces, linha de apoio: "Cirurgiã geral · Endoscopia e Colonoscopia · Medicina Estética", CRMs pequenos.
- Duas portas (cards grandes clicáveis): "Endoscopia e Colonoscopia — Cuidado técnico, com o conforto que você precisa" → `/endoscopia`; "Medicina Estética — Beleza natural, com segurança e ciência" → `/estetica`. Hover: cada card puxa sua paleta (borda/fundo sutil petróleo vs. rosé). Sem ícones infantis; tipografia + cor resolvem.
- Footer mínimo (CRMs + ELYSSA).

## 8. SEO / meta por rota

- Componente pequeno `Seo.tsx` (useEffect) atualizando `document.title` e meta description por página:
  - `/` → "Dra. Patrícia Doria Lourenço — Cirurgiã Geral | Endoscopia e Medicina Estética"
  - `/endoscopia` → "Endoscopia e Colonoscopia em São Paulo e São José do Rio Preto | Dra. Patrícia Doria Lourenço"
  - `/estetica` → "Medicina Estética em São José do Rio Preto e São Paulo | Dra. Patrícia Doria Lourenço"
- `client/index.html`: atualizar title/description/og padrão e `lang="pt-BR"`.

## 9. O que EVITAR (importante — o site não pode parecer feito por IA)

- NADA de: emoji na interface, "Descubra", "Transforme", "Eleve", "jornada", gradientes roxo/azul saturados, glassmorphism gratuito, sombras enormes, bordas arco-íris, seções "⚡ rápido, 🔒 seguro".
- Usar a copy dos documentos PRATICAMENTE VERBATIM (corrigindo apenas espaçamento/pontuação óbvia tipo "exame ,conduzidos" → "exame, conduzidos"). Não reescrever, não "melhorar", não adicionar superlativo.
- Animações: framer-motion apenas em fade/slide sutis de entrada (0.4–0.6s, uma vez, `whileInView` com `viewport={{ once: true }}`). Nada de elementos flutuando/pulsando em loop.
- Ícones lucide com `strokeWidth={1.5}`, tamanho contido.
- Hierarquia tipográfica editorial: headlines grandes com peso médio, eyebrows pequenos em caps com tracking, MUITO espaço em branco.

## 10. Técnica / limpeza

- Rotas com wouter (já nas deps) em `App.tsx`. Scroll para o topo na troca de rota.
- Remover textos placeholder do whitelabel que sobrarem (ex. stats "USP", "Medicina Especializada").
- As landings NÃO compartilham estado; conteúdo 100% dos arquivos `content/`.
- Manter servidor express como está (`npm run dev`, porta via `PORT`).
- `npm run check` (tsc) deve passar limpo ao final.
- Imagens: importar via Vite (import estático). Fotos grandes — usar `loading="lazy"` fora do hero e `fetchpriority="high"` no hero.
- Acessibilidade: alts descritivos reais ("Dra. Patrícia Doria Lourenço em seu consultório"), foco visível nos botões, contraste AA nos blocos de cor.

## 11. Critérios de aceite

1. `/`, `/endoscopia` e `/estetica` funcionam; 404 para o resto.
2. Cada landing segue a ordem e o texto da sua copy; temas visivelmente distintos mas da mesma família.
3. Carrossel de fotos funcionando no Gateway (autoplay + dots + arrastável).
4. Formulários por trilha redirecionando ao wa.me com mensagem identificada.
5. Depoimentos ocultos (estrutura pronta).
6. `npm run check` limpo; `npm run dev` sobe sem erro.
7. Nenhum hex de tema hardcoded em componente (tudo via CSS variables).
8. Mobile-first: hero 100vh mobile, CTA full-width mobile, grids empilham.
