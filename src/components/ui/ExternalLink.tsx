import React from 'react';

type ExternalLinkProps = React.ComponentPropsWithoutRef<'a'> & { href: string };

/**
 * Link para fora do site. Abre em nova aba e sempre com
 * rel="noopener noreferrer", que impede a página de destino de alcançar
 * o window.opener e de receber o referrer.
 */
export const ExternalLink = ({ children, ...props }: ExternalLinkProps) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);
