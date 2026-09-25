import React from 'react';
import { Instagram } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onSelectView: (view: 'home' | 'shop' | 'about' | 'contact') => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectView,
  onOpenAbout,
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-[#232323] text-white pt-12 sm:pt-14 pb-8 sm:pb-10 border-t-  border-[#EDDDCC] select-none">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row: Brand Logo, Centered Nav Links, Right Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 pt-4">
          
          {/* 1. Left Brand Zone: Stacked Vector Logo + Wordmark */}
          <div 
            onClick={() => {
              onSelectView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer transition-opacity hover:opacity-90"
          >
            {/* <Logo variant="footer" /> */}
            <img src="../img/dark-logo.svg" alt='logo'></img>
          </div>

          {/* 2. Center Nav Links: Shop, O nama, Kontakt */}
          <nav className="flex items-center gap-8 sm:gap-11 ">
            <button
              onClick={() => {
                onSelectView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer text-[16px]"
            >
              Shop
            </button>
            <button
              onClick={() => {
                onOpenAbout();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer text-[16px]"
            >
              O nama
            </button>
            <button
              onClick={() => {
                onOpenContact();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer text-[16px]"
            >
              Kontakt
            </button>
          </nav>
          

          {/* 3. Right Social Icons: Facebook, Instagram, X */}
          <div className="flex items-center gap-4 text-white">
            {/* Facebook Solid Icon */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white hover:text-[#CEAA74] transition-colors cursor-pointer p-1"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
              </svg>
            </a>

            {/* Instagram Outline Icon */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-[#CEAA74] transition-colors cursor-pointer p-1"
            >
              <Instagram className="w-6 h-6 stroke-[2]" />
            </a>

            {/* X (formerly Twitter) Icon */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-white hover:text-[#CEAA74] transition-colors cursor-pointer p-1"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Horizontal Divider Line matching image.png */}
        <div className="w-full h-px bg-[#EDDDCC] mb-6" />

        {/* Bottom Bar: All Centered in One Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm">
          <span>© 2025 OPG Bartolović. Sva prava pridržana.</span>
          <button
            onClick={onOpenPrivacy}
            className="underline underline-offset-3 hover:text-white transition-colors cursor-pointer text-sm"
          >
            Politika privatnosti
          </button>
          <button
            onClick={onOpenTerms}
            className="underline underline-offset-3 hover:text-white transition-colors cursor-pointer text-sm"
          >
            Uvjeti korištenja
          </button>
        </div>

      </div>
    </footer>
  );
};
