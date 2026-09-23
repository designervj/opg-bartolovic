import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 30.0;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 3.9;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `OPG-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono-custom font-bold text-base text-neutral-900 tracking-tight">
              {orderConfirmed ? 'Narudžba zaprimljena!' : 'Podaci za dostavu'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-scale-in">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-mono-custom font-bold text-xl text-neutral-900">
              Hvala vam na narudžbi!
            </h3>
            
            <p className="mt-2 text-xs font-sans-custom text-neutral-600 max-w-sm leading-relaxed">
              Vaša narudžba <strong>#{orderId}</strong> je uspješno zaprimljena.
              Poslat ćemo vam potvrdu na <strong>{formData.email || 'vašu e-mail adresu'}</strong> čim pčelari zapakiraju vaš paket!
            </p>

            <div className="mt-6 p-4 bg-neutral-50 rounded-xs border border-neutral-200 w-full text-left font-sans-custom text-xs space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Dostava na adresu:</span>
                <span className="font-medium text-neutral-900">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Način plaćanja:</span>
                <span className="font-medium text-neutral-900">
                  {formData.paymentMethod === 'cod' ? 'Plaćanje pouzećem (gotovinom dostavljaču)' : 'Kreditna kartica'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-900 font-bold pt-2 border-t border-neutral-200">
                <span>Ukupno za platiti:</span>
                <span className="font-mono-custom text-sm">{total.toFixed(2)} €</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="mt-6 bg-neutral-900 hover:bg-neutral-800 text-white font-mono-custom text-xs uppercase tracking-wider py-3 px-8 rounded-xs transition-colors cursor-pointer"
            >
              U redu, povratak na trgovinu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Order summary mini bar */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xs flex items-center justify-between text-xs font-sans-custom">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-800" />
                <span className="text-amber-900 font-medium">
                  {items.length} {items.length === 1 ? 'proizvod' : 'proizvoda'} u košarici
                </span>
              </div>
              <span className="font-bold text-neutral-900 font-mono-custom text-sm">
                Ukupno: {total.toFixed(2)} €
              </span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans-custom">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Ime i prezime *
                </label>
                <input
                  required
                  type="text"
                  placeholder="npr. Marko Horvat"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  E-mail adresa *
                </label>
                <input
                  required
                  type="email"
                  placeholder="marko@primjer.hr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Broj mobitela *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+385 91 234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Ulica i kućni broj *
                </label>
                <input
                  required
                  type="text"
                  placeholder="npr. Osječka 14"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Grad / Mjesto *
                </label>
                <input
                  required
                  type="text"
                  placeholder="npr. Zagreb"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Poštanski broj *
                </label>
                <input
                  required
                  type="text"
                  placeholder="npr. 10000"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-2 font-sans-custom">
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Način plaćanja
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-2 p-2.5 border rounded-xs cursor-pointer text-xs transition-colors ${formData.paymentMethod === 'cod' ? 'border-amber-800 bg-amber-50/50' : 'border-neutral-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="accent-amber-800"
                  />
                  <span>Plaćanje pouzećem (gotovinom pri preuzimanju)</span>
                </label>

                <label className={`flex items-center gap-2 p-2.5 border rounded-xs cursor-pointer text-xs transition-colors ${formData.paymentMethod === 'card' ? 'border-amber-800 bg-amber-50/50' : 'border-neutral-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="accent-amber-800"
                  />
                  <span>Kartično plaćanje (Sigurni CorvusPay)</span>
                </label>
              </div>
            </div>

            {/* Note */}
            <div className="font-sans-custom">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Napomena za dostavljača (opcionalno)
              </label>
              <input
                type="text"
                placeholder="npr. ostaviti na porti ili nazvati prije dolaska"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
              />
            </div>

            {/* Trust disclaimer */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-sans-custom pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Vaši podaci su zaštićeni 256-bitnom SSL enkripcijom.</span>
            </div>

            {/* Submit */}
            <div className="pt-3 border-t border-neutral-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-sans-custom text-neutral-600 hover:text-neutral-900"
              >
                Odustani
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-neutral-900 hover:bg-amber-800 text-white font-mono-custom text-xs uppercase tracking-wider px-6 py-2.5 rounded-xs transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {isSubmitting ? 'Obrada narudžbe...' : `Potvrdi narudžbu (${total.toFixed(2)} €)`}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
