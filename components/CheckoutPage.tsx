import React, { useState } from 'react';
import { Ticket, ChevronDown, Phone, Mail, ArrowLeft } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutPageProps {
  items: CartItem[];
  onNavigateShop: () => void;
  onClearCart: () => void;
}

interface OrderData {
  orderNumber: string;
  date: string;
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  street: string;
  apartment: string;
  city: string;
  county: string;
  postalCode: string;
  phone: string;
  email: string;
  notes: string;
  paymentMethod: 'Kreditna kartica' | 'Gotovina prilikom preuzimanja';
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onNavigateShop,
  onClearCart,
}) => {
  // Step state: 'form' (Checkout (1).png) -> 'success' (Checkout (2).png)
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Coupon banner toggle
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Form Data prefilled with realistic values matching screenshots
  const [formData, setFormData] = useState<OrderData>({
    orderNumber: '1234',
    date: '26.04.2025.',
    firstName: 'Iva',
    lastName: 'Ivić',
    companyName: '',
    country: 'Hrvatska',
    street: 'Ulica 123',
    apartment: '',
    city: 'Zagreb',
    county: 'Grad Zagreb',
    postalCode: '10000',
    phone: '123456789',
    email: 'ivaivic@gmail.com',
    notes: '',
    paymentMethod: 'Kreditna kartica',
  });

  // Calculate items subtotal or use exact fallback from screenshot (53.07€)
  const rawSubtotal = items.length > 0
    ? items.reduce((sum, it) => sum + it.product.price * it.quantity, 0)
    : 53.07;

  const total = Math.max(0, rawSubtotal - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'MED10' || couponCode.trim().toUpperCase() === 'BARTOLOVIC10') {
      setCouponDiscount(rawSubtotal * 0.1);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate dynamic or current order date
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(
      today.getMonth() + 1
    ).padStart(2, '0')}.${today.getFullYear()}.`;

    setFormData((prev) => ({
      ...prev,
      orderNumber: prev.orderNumber || '1234',
      date: formattedDate,
    }));

    // Transition to second image (Checkout (2).png)
    setStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClearCart();
  };

  return (
    <div className="w-full bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer White Card Container */}
        <div className="bg-background p-6 sm:p-10 lg:p-14 shadow-xs rounded-xs">
          
          {step === 'form' ? (
            /* ======================================================== */
            /* 1. CHECKOUT FORM PAGE (Exact match to "Checkout (1).png") */
            /* ======================================================== */
            <div className="animate-fade-in space-y-8">
              
              {/* Main Title */}
              <h1 className="lg:text-[34px] text-foreground">
                Checkout
              </h1>

              {/* Coupon Notice Banner */}
              <div className="w-full bg-[#F5F2EB] border-t-2 border-neutral-900 px-5 sm:px-6 py-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <Ticket className="w-4 h-4 text-foreground stroke-[1.8] shrink-0" />
                  <span className="sm:text-[13.5px] text-foreground">
                    Imaš kupon kod?{' '}
                    <button
                      type="button"
                      onClick={() => setShowCouponInput(!showCouponInput)}
                      className="text-foreground hover:underline cursor-pointer"
                    >
                      Klikni ovdje za upis koda.
                    </button>
                  </span>
                </div>

                {showCouponInput && (
                  <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 pt-2 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Kupon kod (npr. MED10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="px-3 py-1.5 border border-border rounded-xs bg-background focus:outline-none focus:border-neutral-900 w-48"
                    />
                    <button
                      type="submit"
                      className="bg-foreground hover:bg-neutral-800 text-white uppercase px-4 py-1.5 rounded-xs transition-colors cursor-pointer"
                    >
                      Primijeni
                    </button>
                    {couponDiscount > 0 && (
                      <span className="text-emerald-700">
                        Popust od 10% primijenjen!
                      </span>
                    )}
                  </form>
                )}
              </div>

              {/* Main 2-Column Checkout Layout */}
              <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                
                {/* ==================================================== */}
                {/* LEFT COLUMN: Detalji o naplati (lg:col-span-7)       */}
                {/* ==================================================== */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Section Title */}
                  <div className="border-b border-border pb-2">
                    <h2 className="text-[15px] text-foreground">
                      Detalji o naplati
                    </h2>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Row 1: Ime* & Prezime* */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-foreground mb-1.5">
                          Ime<span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-foreground mb-1.5">
                          Prezime<span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                        />
                      </div>
                    </div>

                    {/* Row 2: Ime tvrtke (opcionalno) */}
                    <div>
                      <label className="block text-foreground mb-1.5">
                        Ime tvrtke (opcionalno)
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {/* Row 3: Država* */}
                    <div>
                      <label className="block text-foreground mb-1.5">
                        Država<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full appearance-none px-3.5 py-2.5 border border-border rounded-xs bg-background focus:outline-none focus:border-neutral-900 pr-10 cursor-pointer"
                        >
                          <option value="Hrvatska">Hrvatska</option>
                          <option value="Slovenija">Slovenija</option>
                          <option value="Austrija">Austrija</option>
                          <option value="Njemačka">Njemačka</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-foreground/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Row 4: Adresa* */}
                    <div className="space-y-2.5">
                      <label className="block text-foreground mb-1.5">
                        Adresa<span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ulica i kućni broj"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900 placeholder:text-foreground/40"
                      />
                      <input
                        type="text"
                        placeholder="Broj apartmana, stana itd. (opcionalno)"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900 placeholder:text-foreground/40"
                      />
                    </div>

                    {/* Row 5: Grad* */}
                    <div>
                      <label className="block text-foreground mb-1.5">
                        Grad<span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {/* Row 6: Županija* */}
                    <div>
                      <label className="block text-foreground mb-1.5">
                        Županija<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.county}
                          onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                          className="w-full appearance-none px-3.5 py-2.5 border border-border rounded-xs bg-background focus:outline-none focus:border-neutral-900 pr-10 cursor-pointer"
                        >
                          <option value="Odaberi...">Odaberi...</option>
                          <option value="Grad Zagreb">Grad Zagreb</option>
                          <option value="Zagrebačka županija">Zagrebačka županija</option>
                          <option value="Splitsko-dalmatinska">Splitsko-dalmatinska</option>
                          <option value="Primorsko-goranska">Primorsko-goranska</option>
                          <option value="Osječko-baranjska">Osječko-baranjska</option>
                          <option value="Istarska">Istarska</option>
                          <option value="Dubrovačko-neretvanska">Dubrovačko-neretvanska</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-foreground/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Row 7: Poštanski broj* */}
                    <div>
                      <label className="block text-foreground mb-1.5">
                        Poštanski broj<span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {/* Row 8: Telefon* */}
                    <div>
                      <label className="block text-foreground mb-1.5">
                        Telefon<span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {/* Row 9: Email adresa* */}
                    <div>
                      <label className="block text-foreground mb-1.5">
                        Email adresa<span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                  </div>

                  {/* Section 2: Dodatne informacije */}
                  <div className="pt-6">
                    <div className="border-b border-border pb-2 mb-4">
                      <h2 className="text-[15px] text-foreground">
                        Dodatne informacije
                      </h2>
                    </div>

                    <div>
                      <label className="block text-foreground mb-1.5">
                        Bilješke o narudžbi (opcionalno)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Unesi bilješke o narudžbi, npr. posebne napomene za dostavu"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xs focus:outline-none focus:border-neutral-900 placeholder:text-foreground/40 resize-none"
                      />
                    </div>
                  </div>

                </div>

                {/* ==================================================== */}
                {/* RIGHT COLUMN: Tvoja narudžba (lg:col-span-5)        */}
                {/* ==================================================== */}
                <div className="lg:col-span-5">
                  <div className="border border-border/80 rounded-xs p-6 bg-background space-y-5">
                    
                    {/* Header */}
                    <h2 className="text-[15px] text-foreground">
                      Tvoja narudžba
                    </h2>

                    {/* Proizvod & Iznos header line */}
                    <div className="flex justify-between items-center text-foreground pb-2 border-b border-border">
                      <span>Proizvod</span>
                      <span>Iznos</span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-4 text-foreground">
                      {items.length > 0 ? (
                        items.map(({ product, quantity }) => (
                          <div key={product.id} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F7F6F3] p-1 rounded-xs flex items-center justify-center shrink-0 border border-border">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  referrerPolicy="no-referrer"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <span>
                                {product.title} x {quantity}
                              </span>
                            </div>
                            <span className="tabular-nums text-foreground shrink-0">
                              {(product.price * quantity).toFixed(2)}€
                            </span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F7F6F3] p-1 rounded-xs flex items-center justify-center shrink-0 border border-border">
                                <img
                                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80"
                                  alt="Med sa saćem"
                                  referrerPolicy="no-referrer"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <span>Med sa saćem, 450g x 1</span>
                            </div>
                            <span className="tabular-nums text-foreground shrink-0">16.49€</span>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F7F6F3] p-1 rounded-xs flex items-center justify-center shrink-0 border border-border">
                                <img
                                  src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=300&q=80"
                                  alt="Bagremov med"
                                  referrerPolicy="no-referrer"
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <span>Bagremov med, 900g x 2</span>
                            </div>
                            <span className="tabular-nums text-foreground shrink-0">36.58€</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between items-center text-neutral-700">
                      <span>Iznos</span>
                      <span className="tabular-nums text-foreground">{rawSubtotal.toFixed(2)}€</span>
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between items-center text-foreground">
                      <span>Ukupno</span>
                      <span className="tabular-nums">{total.toFixed(2)}€</span>
                    </div>

                    {/* Payment Radio Options */}
                    <div className="border-t border-border pt-4 space-y-2.5">
                      {/* Option 1: Kreditna kartica */}
                      <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'Kreditna kartica'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'Kreditna kartica' })}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            formData.paymentMethod === 'Kreditna kartica'
                              ? 'border-[#B89047] bg-background'
                              : 'border-border bg-background group-hover:border-neutral-400'
                          }`}>
                            {formData.paymentMethod === 'Kreditna kartica' && (
                              <div className="w-2 h-2 rounded-full bg-[#B89047]" />
                            )}
                          </div>
                        </div>
                        <span className="sm:text-[13px] text-foreground">
                          Kreditna kartica
                        </span>
                      </label>

                      {/* Option 2: Gotovina prilikom preuzimanja */}
                      <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'Gotovina prilikom preuzimanja'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'Gotovina prilikom preuzimanja' })}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            formData.paymentMethod === 'Gotovina prilikom preuzimanja'
                              ? 'border-[#B89047] bg-background'
                              : 'border-border bg-background group-hover:border-neutral-400'
                          }`}>
                            {formData.paymentMethod === 'Gotovina prilikom preuzimanja' && (
                              <div className="w-2 h-2 rounded-full bg-[#B89047]" />
                            )}
                          </div>
                        </div>
                        <span className="sm:text-[13px] text-foreground">
                          Gotovina prilikom preuzimanja
                        </span>
                      </label>
                    </div>

                    {/* Naruči Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#1C1F20] hover:bg-neutral-800 text-white uppercase py-3.5 px-4 rounded-xs transition-colors duration-200 cursor-pointer shadow-sm active:scale-98"
                      >
                        Naruči
                      </button>
                    </div>

                  </div>
                </div>

              </form>

            </div>
          ) : (
            /* ======================================================== */
            /* 2. ORDER SUCCESS PAGE (Exact match to "Checkout (2).png") */
            /* ======================================================== */
            <div className="space-y-8 animate-fade-in max-w-4xl">
              
              {/* Back to form button for convenience */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-foreground/60 hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Natrag na checkout</span>
                </button>
              </div>

              {/* Header Title & Subtitle */}
              <div>
                <h1 className="lg:text-[34px] text-foreground">
                  Narudžba uspješna
                </h1>
                <p className="mt-2 text-foreground/70">
                  Zahvaljujemo se na vašoj narudžbi.
                </p>
              </div>

              {/* 4-Item KPI Horizontal Stat Bar with vertical separators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:gap-y-0 py-2 sm:py-3 border-y border-border sm:border-none">
                
                {/* 1. Broj narudžbe */}
                <div className="sm:pr-6 sm:border-r border-border">
                  <span className="block uppercase text-foreground/60">
                    Broj narudžbe
                  </span>
                  <span className="block text-foreground mt-1">
                    {formData.orderNumber}
                  </span>
                </div>

                {/* 2. Datum */}
                <div className="sm:px-6 sm:border-r border-border">
                  <span className="block uppercase text-foreground/60">
                    Datum
                  </span>
                  <span className="block text-foreground mt-1">
                    {formData.date}
                  </span>
                </div>

                {/* 3. Ukupno */}
                <div className="sm:px-6 sm:border-r border-border">
                  <span className="block uppercase text-foreground/60">
                    Ukupno
                  </span>
                  <span className="block text-foreground mt-1">
                    {total.toFixed(2)}€
                  </span>
                </div>

                {/* 4. Način plaćanja */}
                <div className="sm:pl-6">
                  <span className="block uppercase text-foreground/60">
                    Način plaćanja
                  </span>
                  <span className="block text-foreground mt-1">
                    {formData.paymentMethod}
                  </span>
                </div>

              </div>

              {/* ====================================================== */}
              {/* TABLE 1: Detalji narudžbe                              */}
              {/* ====================================================== */}
              <div className="border border-border rounded-xs overflow-hidden">
                {/* Section Header */}
                <div className="bg-background border-b border-border px-5 py-3.5">
                  <h2 className="text-[14.5px] text-foreground">
                    Detalji narudžbe
                  </h2>
                </div>

                {/* Subheader: Proizvod | Iznos */}
                <div className="border-b border-border px-5 py-3 flex justify-between text-foreground">
                  <span>Proizvod</span>
                  <span>Iznos</span>
                </div>

                {/* Product List Rows */}
                <div className="divide-y divide-neutral-200">
                  {items.length > 0 ? (
                    items.map(({ product, quantity }) => (
                      <div key={product.id} className="px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 bg-[#F7F6F3] p-1 rounded-xs flex items-center justify-center shrink-0">
                            <img
                              src={product.image}
                              alt={product.title}
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <span className="text-foreground">
                            {product.title} x {quantity}
                          </span>
                        </div>
                        <span className="text-foreground tabular-nums">
                          {(product.price * quantity).toFixed(2)}€
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 bg-[#F7F6F3] p-1 rounded-xs flex items-center justify-center shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80"
                              alt="Med sa saćem"
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <span className="text-foreground">Med sa saćem, 450g x 1</span>
                        </div>
                        <span className="text-foreground tabular-nums">16.49€</span>
                      </div>
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 bg-[#F7F6F3] p-1 rounded-xs flex items-center justify-center shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=300&q=80"
                              alt="Bagremov med"
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <span className="text-foreground">Bagremov med, 900g x 2</span>
                        </div>
                        <span className="text-foreground tabular-nums">36.58€</span>
                      </div>
                    </>
                  )}

                  {/* Summary Rows */}
                  <div className="px-5 py-3 flex justify-between items-center text-neutral-700">
                    <span>Iznos:</span>
                    <span className="text-foreground tabular-nums">{rawSubtotal.toFixed(2)}€</span>
                  </div>

                  <div className="px-5 py-3 flex justify-between items-center text-neutral-700">
                    <span>Način plaćanja</span>
                    <span className="text-foreground">{formData.paymentMethod}</span>
                  </div>

                  <div className="px-5 py-3.5 flex justify-between items-center text-foreground">
                    <span>Ukupno</span>
                    <span className="tabular-nums">{total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* TABLE 2: Adresa za dostavu                             */}
              {/* ====================================================== */}
              <div className="border border-border rounded-xs overflow-hidden">
                {/* Header */}
                <div className="bg-background border-b border-border px-5 py-3.5">
                  <h2 className="text-[14.5px] text-foreground">
                    Adresa za dostavu
                  </h2>
                </div>

                {/* Details Body */}
                <div className="p-5 text-neutral-700 space-y-1.5">
                  <p className="text-foreground">{formData.firstName} {formData.lastName}</p>
                  <p>{formData.street}</p>
                  <p>{formData.city}</p>
                  <p>{formData.postalCode}</p>
                  <p>{formData.country}</p>

                  <div className="pt-2 space-y-1">
                    <p className="flex items-center gap-2 text-foreground">
                      <Phone className="w-3.5 h-3.5 text-foreground/60 shrink-0" />
                      <span>{formData.phone}</span>
                    </p>
                    <p className="flex items-center gap-2 text-foreground">
                      <Mail className="w-3.5 h-3.5 text-foreground/60 shrink-0" />
                      <span>{formData.email}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button: Nastavi kupovinu */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateShop}
                  className="bg-[#1C1F20] hover:bg-neutral-800 text-white uppercase py-3.5 px-8 rounded-xs transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
                >
                  Nastavi kupovinu
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
