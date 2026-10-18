import {RESPONSAVEL} from '../../config/site';

/**
 * Credencial institucional da sócia-fundadora, em linha discreta. O losango
 * dourado repete o topo do emblema da marca.
 */
export const Credencial = ({escuro = false, comNome = false, className = ''}: {escuro?: boolean; comNome?: boolean; className?: string}) => (
  <p className={`flex items-start gap-3 text-[0.9375rem] leading-snug ${escuro ? 'text-white/85' : 'text-verde-profundo'} ${className}`}>
    <span aria-hidden="true" className="mt-[0.45em] h-2 w-2 shrink-0 rotate-45 bg-dourado" />
    <span>
      {comNome && <>{RESPONSAVEL.tratamento}, </>}
      {comNome ? RESPONSAVEL.credencial.cargo.replace(/^Presidente/, 'presidente') : RESPONSAVEL.credencial.cargo}
    </span>
  </p>
);
