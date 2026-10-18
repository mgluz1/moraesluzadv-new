import {useEffect} from 'react';

/** Classes de cada tipo de reveal e quanto tempo dura a transição (ms). */
const TIPOS = [
  {seletor: '[data-revelar]', pendente: 'revelar-pendente', visivel: 'revelar-visivel', duracao: 700},
  {seletor: '[data-revelar-imagem]', pendente: 'foto-pendente', visivel: 'foto-visivel', duracao: 1700},
] as const;

/**
 * Reveal único dos elementos marcados com [data-revelar] (blocos) e
 * [data-revelar-imagem] (fotos).
 *
 * Roda depois da hidratação e só esconde o que ainda está abaixo da área
 * visível, então nada pisca e, sem JavaScript, tudo aparece. Com
 * prefers-reduced-motion não faz nada. O observador é desligado na saída.
 */
export function useRevelar() {
  useEffect(() => {
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (semMovimento.matches || !('IntersectionObserver' in window)) return;

    const alvos = TIPOS.flatMap((tipo) =>
      [...document.querySelectorAll<HTMLElement>(tipo.seletor)]
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight)
        .map((el) => ({el, tipo})),
    );
    if (alvos.length === 0) return;

    const porElemento = new Map(alvos.map((a) => [a.el, a.tipo]));
    const timers: number[] = [];
    const limpar = (el: HTMLElement) => {
      const tipo = porElemento.get(el);
      if (tipo) el.classList.remove(tipo.pendente, tipo.visivel);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const el = entrada.target as HTMLElement;
          const tipo = porElemento.get(el);
          if (!tipo) continue;
          observador.unobserve(el);
          el.classList.add(tipo.visivel);
          el.classList.remove(tipo.pendente);
          // Remove as classes ao fim da transição para não interferir em hovers.
          timers.push(window.setTimeout(() => limpar(el), tipo.duracao));
        }
      },
      {rootMargin: '0px 0px -8% 0px'},
    );

    for (const {el, tipo} of alvos) {
      el.classList.add(tipo.pendente);
      observador.observe(el);
    }

    // Se o visitante mudar a preferência no meio da visita, mostra tudo.
    const aoMudarPreferencia = () => {
      if (!semMovimento.matches) return;
      observador.disconnect();
      alvos.forEach(({el}) => limpar(el));
    };
    semMovimento.addEventListener('change', aoMudarPreferencia);

    return () => {
      observador.disconnect();
      timers.forEach(clearTimeout);
      semMovimento.removeEventListener('change', aoMudarPreferencia);
      alvos.forEach(({el}) => limpar(el));
    };
  }, []);
}
