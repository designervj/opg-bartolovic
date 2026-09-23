import React, { useState } from 'react';
import { X, MapPin, Mail, Phone, Clock, Send, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-[#F8F6F0]">
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-amber-800">
              Otvoreni za vaša pitanja
            </span>
            <h2 className="font-mono-custom font-bold text-xl text-neutral-900 tracking-tight mt-0.5">
              Kontaktirajte OPG Bartolović
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 font-sans-custom">
          
          {/* Contact Information Quick Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xs border border-neutral-200/70 text-xs">
            <div className="flex items-center gap-2.5 text-neutral-700">
              <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
              <span>Valpovo, Osječko-baranjska županija</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700">
              <Phone className="w-4 h-4 text-amber-800 shrink-0" />
              <span>+385 (0)98 456 789</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700">
              <Mail className="w-4 h-4 text-amber-800 shrink-0" />
              <span>info@opg-bartolovic.hr</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700">
              <Clock className="w-4 h-4 text-amber-800 shrink-0" />
              <span>Pon - Sub: 08:00 - 18:00</span>
            </div>
          </div>

          {/* Contact Message Form */}
          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-center rounded-xs">
              <Check className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <h4 className="font-bold text-sm">Poruka je uspješno poslana!</h4>
              <p className="text-xs mt-1 text-emerald-700">Odgovorit ćemo vam u najkraćem mogućem roku.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Vaše ime i prezime
                </label>
                <input
                  required
                  type="text"
                  placeholder="npr. Ana Kovačević"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Vaša e-mail adresa
                </label>
                <input
                  required
                  type="email"
                  placeholder="ana@primjer.hr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Vaša poruka ili upit za veleprodaju
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Kako vam možemo pomoći?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xs focus:outline-none focus:border-amber-800 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-amber-800 text-white font-mono-custom text-xs uppercase tracking-wider py-2.5 px-6 rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Pošalji poruku</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
