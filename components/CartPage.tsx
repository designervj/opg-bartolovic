import React, { useState } from 'react';
import { ChevronUp, ChevronDown, XCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSetQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigateShop: () => void;
  onProceedToCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveItem,
  onNavigateShop,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Calculate cart subtotal
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'BARTOLOVIC10' || couponCode.trim().toUpperCase() === 'MED10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Nevažeći kupon kod. Pokušajte s "MED10"');
    }
  };

  const handleUpdateCart = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 600);
  };

  return (
    <div className="w-full bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer White Card Container */}
        <div className="bg-background p-6 sm:p-10 lg:p-14 shadow-xs rounded-xs">
          
          {/* Main Title matching Cart.png and Cart (1).png */}
          <h4 className="lg:text-[24px] text-foreground mb-8">
            Košarica
          </h4>

          {/* ======================================================== */}
          {/* EMPTY CART STATE (Matches "Cart (1).png")                 */}
          {/* ======================================================== */}
          {items.length === 0 ? (
            <div className="space-y-8 animate-fade-in">
              {/* Notification Banner */}
              <div className="w-full bg-[#F5F2EB] border-t-2 border-neutral-900 px-6 sm:px-8 py-4 sm:py-5 flex items-center gap-3.5 shadow-xs">
                <ShoppingBag className="w-5 h-5 text-foreground stroke-[2] shrink-0" />
                <span className="sm:text-[14px] text-foreground">
                  Tvoja košarica je trenutno prazna.
                </span>
              </div>

              {/* Natrag na shop Button */}
              <div>
                <button
                  type="button"
                  onClick={onNavigateShop}
                  className="bg-[#1C1F20] hover:bg-neutral-800 text-white uppercase py-3.5 px-8 rounded-xs transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
                >
                  Natrag na shop
                </button>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* FILLED CART STATE (Matches "Cart.png")                   */
            /* ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: Cart Table & Coupon Row (lg:col-span-8) */}
              <div className="lg:col-span-8">
                <div className="border border-border rounded-xs overflow-hidden">
                  
                  {/* Table Header Row */}
                  <div className="bg-background border-b border-border px-4 py-3.5 grid grid-cols-12 text-foreground">
                    <div className="col-span-1"></div>
                    <div className="col-span-5 text-left text-[14px] font-semibold">Proizvod</div>
                    <div className="col-span-2 text-center text-[14px] font-semibold">Cijena</div>
                    <div className="col-span-2 text-center text-[14px] font-semibold">Količina</div>
                    <div className="col-span-2 text-right text-[14px] font-semibold">Iznos</div>
                  </div>

                  {/* Cart Items Rows */}
                  <div className="divide-y divide-neutral-200">
                    {items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="px-4 py-5 grid grid-cols-12 items-center gap-2"
                      >
                        {/* Remove Icon */}
                        <div className="col-span-1 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            className="text-foreground/40 hover:text-foreground transition-colors cursor-pointer p-1"
                            aria-label={`Ukloni ${product.title}`}
                          >
                            <XCircle className="w-5 h-5 stroke-[1.5]" />
                          </button>
                        </div>

                        {/* Product Image & Title */}
                        <div className="col-span-5 flex items-center gap-3 sm:gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F6F3] rounded-xs p-1 flex items-center justify-center shrink-0 border border-border">
                            <img
                              src={product.image}
                              alt={product.title}
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-foreground">
                              {product.title}
                            </span>
                            <span className="text-[14px] text-foreground/60 mt-0.5">
                              {product.weight}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center text-foreground tabular-nums">
                          {product.price.toFixed(2)}€
                        </div>

                        {/* Quantity Stepper */}
                        <div className="col-span-2 flex justify-center">
                          <div className="relative flex items-center border border-border rounded-xs bg-background w-14 sm:w-16 h-9 px-2">
                            <span className="text-foreground select-none">
                              {quantity}
                            </span>
                            <div className="absolute right-1 inset-y-1 flex flex-col justify-between py-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(product.id, 1)}
                                className="p-0.5 text-foreground/60 hover:text-foreground transition-colors"
                                aria-label="Povećaj količinu"
                              >
                                <ChevronUp className="w-3 h-3 stroke-[2.5]" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(product.id, -1)}
                                className="p-0.5 text-foreground/60 hover:text-foreground transition-colors"
                                aria-label="Smanji količinu"
                              >
                                <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-2 text-right text-foreground tabular-nums">
                          {(product.price * quantity).toFixed(2)}€
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Coupon & Update Actions Row */}
                  <div className="bg-[#FBFBFA] border-t border-border px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Coupon Input & Button */}
                    <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        placeholder="Kupon kod"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="px-3.5 py-2 border border-border rounded-xs focus:outline-none focus:border-neutral-900 w-36 sm:w-44"
                      />
                      <button
                        type="submit"
                        className="border border-neutral-900 bg-background hover:bg-foreground text-foreground hover:text-white px-6 py-2.5 uppercase transition-colors duration-200 cursor-pointer shrink-0"
                      >
                        Primjeni
                      </button>
                    </form>

                    {/* Ažuriraj košaricu Button */}
                    <button
                      type="button"
                      onClick={handleUpdateCart}
                      disabled={isUpdating}
                      className="w-full sm:w-auto border border-border bg-background text-foreground/40 hover:text-neutral-700 hover:border-neutral-400 px-6 py-2.5 uppercase transition-colors duration-200 cursor-pointer shrink-0"
                    >
                      {isUpdating ? 'Ažuriranje...' : 'Ažuriraj košaricu'}
                    </button>
                  </div>

                </div>

                {/* Optional Coupon Error / Success Feedback */}
                {couponError && (
                  <p className="mt-2 text-red-600">{couponError}</p>
                )}
                {couponApplied && (
                  <p className="mt-2 text-emerald-700">
                    Kupon je primijenjen! Ostvarili ste 10% popusta.
                  </p>
                )}
              </div>

              {/* Right Column: Ukupan iznos košarice Box (lg:col-span-4) */}
              <div className="lg:col-span-4">
                <div className="border border-border rounded-xs overflow-hidden bg-background">
                  
                  {/* Header */}
                  <div className="bg-background border-b border-border p-4">
                    <h6 className="text-[14.5px] text-foreground">
                      Ukupan iznos košarice
                    </h6>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-center text-neutral-700">
                      <span>Iznos košarice</span>
                      <span className="tabular-nums text-foreground">
                        {subtotal.toFixed(2)}€
                      </span>
                    </div>

                    {couponApplied && (
                      <div className="flex justify-between items-center text-emerald-700">
                        <span>Popust (10%)</span>
                        <span className="tabular-nums">- {discount.toFixed(2)}€</span>
                      </div>
                    )}

                    <div className="w-full h-px bg-neutral-200" />

                    <div className="flex justify-between items-center text-foreground">
                      <span>Ukupno</span>
                      <span className="tabular-nums">
                        {total.toFixed(2)}€
                      </span>
                    </div>

                    {/* Nastavi na plaćanje Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onProceedToCheckout}
                        className="w-full bg-[#1C1F20] hover:bg-neutral-800 text-white uppercase py-3.5 px-4 rounded-xs transition-colors duration-200 cursor-pointer shadow-sm active:scale-98"
                      >
                        Nastavi na plaćanje
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
