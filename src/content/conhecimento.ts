/**
 * Artigos, publicações e participações do escritório.
 *
 * Só entra aqui material real, publicado e revisado pela responsável
 * técnica. Enquanto a lista estiver vazia, o bloco "Conhecimento do setor"
 * não aparece na Home.
 *
 * Exemplo de item:
 * {
 *   tipo: 'Artigo',
 *   titulo: 'Título exato da publicação',
 *   veiculo: 'Nome do veículo ou evento',
 *   data: '2026-11-04',
 *   url: 'https://endereco-publico-da-publicacao',
 *   resumo: 'Uma ou duas frases sobre o tema tratado.',
 * }
 */

export interface ItemConhecimento {
  tipo: 'Artigo' | 'Publicação' | 'Participação';
  titulo: string;
  veiculo: string;
  /** AAAA-MM-DD */
  data: string;
  /** Endereço público onde o material pode ser verificado. */
  url: string;
  resumo: string;
}

export const CONHECIMENTO: ItemConhecimento[] = [];

/** No máximo dois itens, do mais recente para o mais antigo. */
export const destaquesConhecimento = () =>
  [...CONHECIMENTO].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 2);
