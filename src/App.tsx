/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { AreasDeAtuacao } from './components/sections/AreasDeAtuacao';
import { Diferenciais } from './components/sections/Diferenciais';
import { Depoimentos } from './components/sections/Depoimentos';
import { Contato } from './components/sections/Contato';
import { Footer } from './components/sections/Footer';
import { MessageCircle } from 'lucide-react';
import { ExternalLink } from './components/ui/ExternalLink';
import { LINKS } from './constants/data';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f4f0] selection:bg-nude selection:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <AreasDeAtuacao />
        <Diferenciais />
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <ExternalLink
        href={LINKS.WHATSAPP}
        aria-label="Falar conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-50 md:hidden bg-green-500 text-white p-4 rounded-full shadow-lg shadow-black/30 hover:bg-green-600 hover:shadow-xl transition-all"
      >
        <MessageCircle size={28} aria-hidden="true" />
      </ExternalLink>
    </div>
  );
}
