/// <reference types="vite/client" />

/** Ano do build, injetado pelo Vite (evita divergência entre HTML pré-renderizado e hidratação). */
declare const __ANO_BUILD__: number;

interface ImportMetaEnv {
  /** 'netlify' ativa o formulário de contato (ver docs/ENTREGA-REESTRUTURACAO.md). */
  readonly VITE_FORMULARIO_CONTATO?: string;
}
