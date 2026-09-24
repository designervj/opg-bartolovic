import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../data/honeyData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 30.0;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 3.9;
  const total = subtotal + shippingCost;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-foreground">
              Vaša košarica ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-foreground/40 hover:text-foreground rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-accent/70 border-b border-primary">
            <div className="flex justify-between items-center mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span className="text-amber-900">
                  Dodajte još <strong className="">{remainingForFreeShipping.toFixed(2)} €</strong> za besplatnu dostavu!
                </span>
              ) : (
                <span className="text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Čestitamo! Ostvarili ste besplatnu dostavu.
                </span>
              )}
              <span className="text-foreground/60">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full bg-accent h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-foreground/60 py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                  <span className="">🍯</span>
                </div>
                <h3 className="text-foreground">
                  Košarica je prazna
                </h3>
                <p className="mt-1 text-foreground/60 max-w-xs">
                  Istražite našu ponudu 100% prirodnog domaćeg meda i dodajte proizvode u košaricu.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 border border-neutral-900 text-foreground hover:bg-foreground hover:text-white px-5 py-2 uppercase transition-colors cursor-pointer"
                >
                  Istraži proizvode
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="flex gap-4 p-3 bg-background/60 rounded-sm border border-border/60"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-background rounded-xs border border-border/60 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-foreground">
                          {product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-foreground/40 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-foreground/60">
                        {product.weight}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-border rounded-xs bg-background">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="px-2 py-1 text-foreground/70 hover:bg-neutral-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-foreground">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="px-2 py-1 text-foreground/70 hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-foreground tabular-nums">
                        {(product.price * quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-background/50 space-y-3">
              <div className="flex justify-between text-foreground/70">
                <span>Međuzbroj</span>
                <span className="text-foreground">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-foreground/70">
                <span>Dostava (GLS / Paket)</span>
                <span className="text-foreground">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700">Besplatno</span>
                  ) : (
                    `${shippingCost.toFixed(2)} €`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between text-foreground">
                <span>Ukupno</span>
                <span className="">{total.toFixed(2)} €</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full mt-4 bg-foreground hover:bg-primary text-white uppercase py-3.5 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>Dovrši narudžbu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
