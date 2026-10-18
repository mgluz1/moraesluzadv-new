/**
 * Mensuração de contatos.
 *
 * Nenhuma ferramenta de Analytics está instalada nesta versão. As funções
 * abaixo só enviam eventos se um `dataLayer` (Google Tag Manager) existir na
 * página; caso contrário, não fazem nada. Assim, a instalação futura do GTM
 * não exige mexer nos componentes.
 *
 * Regras:
 * - Nunca enviar nome, telefone, e-mail ou o texto da mensagem.
 * - Clique em canal de contato é intenção de contato, não contratação.
 * - Envio de formulário só é registrado depois da confirmação do servidor.
 */

export type CanalContato = 'whatsapp' | 'email' | 'mapa' | 'instagram';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function enviar(evento: Record<string, unknown>) {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push(evento);
}

export function registrarCliqueContato(canal: CanalContato, posicao: string) {
  enviar({event: 'contato_clique', canal, posicao, pagina: window.location.pathname});
}

export function registrarEnvioFormulario(assunto: string) {
  enviar({event: 'formulario_enviado', assunto, pagina: window.location.pathname});
}
