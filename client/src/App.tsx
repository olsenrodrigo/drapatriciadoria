import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Gateway from "@/pages/Gateway";
import Endoscopia from "@/pages/Endoscopia";
import Estetica from "@/pages/Estetica";

/* O corpo em bloco é obrigatório: no Chrome novo window.scrollTo devolve uma Promise, e o
   React chamaria esse retorno como função de limpeza — o que derrubava a árvore inteira
   (tela branca) ao trocar de rota. O behavior "instant" ignora o scroll-behavior:smooth do
   CSS: troca de rota deve saltar para o topo, não animar a página toda. */
function ScrollToTop() { const [location] = useLocation(); useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [location]); return null; }

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Gateway} />
        <Route path="/endoscopia" component={Endoscopia} />
        <Route path="/estetica" component={Estetica} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
