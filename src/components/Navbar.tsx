import React from 'react';
import { User, ShoppingBag } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  currentView: string;
  onSelectView: (view: 'home' | 'shop' | 'about' | 'contact') => void;
  onOpenCart: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  currentView,
  onSelectView,
  onOpenCart,
  onOpenContact,
  onOpenAbout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">
        
        {/* Brand Zone: Logo + Wordmark */}
        <div 
          onClick={() => {
            onSelectView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer"
        >
          <Logo variant="light" />
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-9 text-[14.5px] font-medium text-neutral-800 tracking-wide font-sans-custom">
          <button
            onClick={() => onSelectView('shop')}
            className={`py-1 cursor-pointer transition-colors ${
              currentView === 'shop'
                ? 'text-amber-900 font-semibold border-b-2 border-amber-900'
                : 'hover:text-amber-800'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => onSelectView('about')}
            className={`py-1 cursor-pointer transition-colors ${
              currentView === 'about'
                ? 'text-amber-900 font-semibold border-b-2 border-amber-900'
                : 'hover:text-amber-800'
            }`}
          >
            O nama
          </button>
          <button
            onClick={() => onSelectView('contact')}
            className={`py-1 cursor-pointer transition-colors ${
              currentView === 'contact'
                ? 'text-amber-900 font-semibold border-b-2 border-amber-900'
                : 'hover:text-amber-800'
            }`}
          >
            Kontakt
          </button>
        </nav>

        {/* Action Zone: User profile & Cart */}
        <div className="flex items-center gap-5">
          <button 
            type="button"
            aria-label="Korisnički račun"
            onClick={onOpenContact}
            className="p-1.5 text-neutral-700 hover:text-amber-900 transition-colors cursor-pointer rounded-full hover:bg-neutral-100"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Košarica"
          >
            <span className="font-sans-custom font-semibold text-[14.5px] text-neutral-900 tabular-nums">
              {cartTotal.toFixed(2)}€
            </span>
            <div className="relative p-1">
              <ShoppingBag className="w-5 h-5 text-neutral-900 stroke-[1.8] group-hover:text-amber-800 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center font-mono-custom animate-scale-in">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};
