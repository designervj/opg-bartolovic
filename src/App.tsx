'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { CategoryGrid } from './components/CategoryGrid';
import { Bestsellers } from './components/Bestsellers';
import { StorySection } from './components/StorySection';
import { TrustBar } from './components/TrustBar';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { LegalModal } from './components/LegalModal';
import { Product, ALL_PRODUCTS } from './data/honeyData';
import { Check } from 'lucide-react';

export default function App() {
  // Navigation states: 'home' | 'shop' | 'about' | 'contact' | 'detail' | 'cart' | 'checkout'
  // Default to 'contact' to immediately showcase the newly requested "Kontakt" page!
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about' | 'contact' | 'detail' | 'cart' | 'checkout'>('contact');
  const [selectedProduct, setSelectedProduct] = useState<Product>(ALL_PRODUCTS[0]); // Defaults to Med sa saćem, 450g
  
  // Seed cart with exact items from Cart.png & Checkout.png:
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: ALL_PRODUCTS.find((p) => p.title.includes('Med sa saćem')) || ALL_PRODUCTS[0],
      quantity: 1,
    },
    {
      product: ALL_PRODUCTS.find((p) => p.title.includes('Bagremov med, 900g')) || ALL_PRODUCTS[1],
      quantity: 2,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((it) => it.product.id === product.id);
      if (existing) {
        return prevCart.map((it) =>
          it.product.id === product.id
            ? { ...it, quantity: it.quantity + quantity }
            : it
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`"${product.title}" dodan u košaricu`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((it) => {
          if (it.product.id === productId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleSetQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((it) => it.product.id !== productId);
      }
      return prevCart.map((it) =>
        it.product.id === productId ? { ...it, quantity } : it
      );
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((it) => it.product.id !== productId));
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToShop = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAbout = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToContact = () => {
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCart = () => {
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans-custom selection:bg-amber-200 selection:text-neutral-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs font-sans-custom px-4 py-3 rounded-xs shadow-xl flex items-center gap-2.5 animate-slide-up border border-neutral-700">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={handleNavigateToCart}
            className="ml-2 underline text-amber-300 hover:text-white font-medium cursor-pointer"
          >
            Pregledaj košaricu
          </button>
        </div>
      )}

      {/* 1. Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        currentView={currentView}
        onSelectView={(view) => {
          if (view === 'shop') handleNavigateToShop();
          else if (view === 'about') handleNavigateToAbout();
          else if (view === 'contact') handleNavigateToContact();
          else handleNavigateToHome();
        }}
        onOpenCart={handleNavigateToCart}
        onOpenContact={handleNavigateToContact}
        onOpenAbout={handleNavigateToAbout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'contact' ? (
          /* ======================================================= */
          /* KONTAKT PAGE (from Kontakt.png)                         */
          /* ======================================================= */
          <ContactPage onShowToast={showToast} />
        ) : currentView === 'about' ? (
          /* ======================================================= */
          /* O NAMA PAGE (from O nama.png)                           */
          /* ======================================================= */
          <AboutPage
            onNavigateShop={handleNavigateToShop}
            onNavigateContact={handleNavigateToContact}
          />
        ) : currentView === 'checkout' ? (
          /* ======================================================= */
          /* CHECKOUT / NARUDŽBA USPJEŠNA (from Checkout.png)        */
          /* ======================================================= */
          <CheckoutPage
            items={cart}
            onNavigateShop={handleNavigateToShop}
            onClearCart={() => setCart([])}
          />
        ) : currentView === 'cart' ? (
          /* ======================================================= */
          /* CART PAGE (from Cart.png & Cart (1).png)                */
          /* ======================================================= */
          <CartPage
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onSetQuantity={handleSetQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateShop={handleNavigateToShop}
            onProceedToCheckout={handleNavigateToCheckout}
          />
        ) : currentView === 'detail' ? (
          /* ======================================================= */
          /* PRODUCT DETAILS PAGE (from Frame 40.png)                */
          /* ======================================================= */
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleOpenProductDetail}
            onNavigateShop={handleNavigateToShop}
            onNavigateCart={handleNavigateToCart}
          />
        ) : currentView === 'shop' ? (
          /* ======================================================= */
          /* PRODUCT LISTING PAGE (from Product listing.png)         */
          /* ======================================================= */
          <ProductListingPage
            onAddToCart={handleAddToCart}
            onQuickView={handleOpenProductDetail}
            onNavigateHome={handleNavigateToHome}
          />
        ) : (
          /* ======================================================= */
          /* HOME PAGE (from Frame 7.png)                            */
          /* ======================================================= */
          <>
            <Hero onExplore={handleNavigateToShop} />
            <FeatureCards />
            <CategoryGrid onSelectCategory={() => handleNavigateToShop()} />
            <Bestsellers
              onAddToCart={handleAddToCart}
              onQuickView={handleOpenProductDetail}
              onViewAll={handleNavigateToShop}
            />
            <StorySection onLearnMore={handleNavigateToAbout} />
            <TrustBar />
            <CtaBanner onOrderNow={handleNavigateToShop} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectView={(view) => {
          if (view === 'shop') handleNavigateToShop();
          else if (view === 'about') handleNavigateToAbout();
          else if (view === 'contact') handleNavigateToContact();
          else handleNavigateToHome();
        }}
        onOpenAbout={handleNavigateToAbout}
        onOpenContact={handleNavigateToContact}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Cart Drawer (for quick access) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          handleNavigateToCheckout();
        }}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Legal Modal (Privacy & Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
