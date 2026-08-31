import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const raiz = document.getElementById("root")!;

// O build gera HTML estático por rota (script/prerender.ts) e marca a raiz com
// `data-prerender`. Nesse caso hidratamos o HTML existente em vez de recriar a
// árvore: sem isso o React apagaria o conteúdo já pintado e o usuário veria um
// flash de tela em branco.
if (raiz.dataset.prerender === "true") {
  hydrateRoot(raiz, <App />);
} else {
  createRoot(raiz).render(<App />);
}
