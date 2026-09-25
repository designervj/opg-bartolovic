import React from 'react';
import { User, ShoppingBag } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleNav = (view: 'home' | 'shop' | 'about' | 'contact') => {
    onSelectView(view);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background backdrop-blur-md border-b border-border/80 transition-all">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">

          {/* Brand Zone: Logo */}
          <div
            onClick={() => handleNav('home')}
            className="cursor-pointer flex-shrink-0"
          >
            <img src="../img/logo.svg" alt="logo" className="h-12 w-auto" />
          </div>

          {/* Center Navigation Links — Desktop only */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-9 m-0 p-0 list-none">
              <li>
                <a
                  onClick={() => handleNav('shop')}
                  className={`menu-link ${currentView === 'shop' ? 'active' : ''}`}
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleNav('about')}
                  className={`menu-link ${currentView === 'about' ? 'active' : ''}`}
                >
                  O nama
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleNav('contact')}
                  className={`menu-link ${currentView === 'contact' ? 'active' : ''}`}
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </nav>

          {/* Action Zone: User, Cart + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* User icon — desktop only */}
            <button
              type="button"
              aria-label="Korisnički račun"
              onClick={onOpenContact}
              className="hidden md:flex p-1.5 text-neutral-700 hover:text-amber-900 transition-colors cursor-pointer rounded-full hover:bg-neutral-100"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 group cursor-pointer"
              aria-label="Košarica"
            >
              <span className="hidden sm:inline text-[14.5px] text-foreground tabular-nums">
                {cartTotal.toFixed(2)}€
              </span>
              <div className="relative p-1">
                <ShoppingBag className="w-5 h-5 text-foreground stroke-[1.8] group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-black flex items-center justify-center text-[10px] animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 text-foreground cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-[74px] border-b border-border flex-shrink-0">
          <img src="../img/logo.svg" alt="logo" className="h-8 w-auto" />
          <button
            type="button"
            aria-label="Zatvori menu"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-foreground cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col px-6 py-8 gap-6">
          <a
            onClick={() => handleNav('home')}
            className={`text-[18px] font-medium cursor-pointer transition-colors border-b border-border pb-4 ${currentView === 'home' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Početna
          </a>
          <a
            onClick={() => handleNav('shop')}
            className={`text-[18px] font-medium cursor-pointer transition-colors border-b border-border pb-4 ${currentView === 'shop' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Shop
          </a>
          <a
            onClick={() => handleNav('about')}
            className={`text-[18px] font-medium cursor-pointer transition-colors border-b border-border pb-4 ${currentView === 'about' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            O nama
          </a>
          <a
            onClick={() => handleNav('contact')}
            className={`text-[18px] font-medium cursor-pointer transition-colors ${currentView === 'contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
          >
            Kontakt
          </a>
        </nav>

        {/* Cart quick-access at bottom */}
        <div className="mt-auto px-6 pb-8 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => { onOpenCart(); setMobileOpen(false); }}
            className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-foreground font-medium">Košarica</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground/70 text-sm">{cartTotal.toFixed(2)}€</span>
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-foreground stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-black flex items-center justify-center text-[10px]">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
