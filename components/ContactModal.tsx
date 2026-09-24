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
        className="fixed inset-0 bg-foreground/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-background w-full max-w-xl rounded-sm shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-background">
          <div>
            <span className="uppercase text-primary">
              Otvoreni za vaša pitanja
            </span>
            <h2 className="text-foreground mt-0.5">
              Kontaktirajte OPG Bartolović
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-foreground/40 hover:text-foreground rounded-full hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          
          {/* Contact Information Quick Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-background rounded-xs border border-border/70">
            <div className="flex items-center gap-2.5 text-neutral-700">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Valpovo, Osječko-baranjska županija</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>+385 (0)98 456 789</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>info@opg-bartolovic.hr</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-700">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>Pon - Sub: 08:00 - 18:00</span>
            </div>
          </div>

          {/* Contact Message Form */}
          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-center rounded-xs">
              <Check className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <h4 className="">Poruka je uspješno poslana!</h4>
              <p className="mt-1 text-emerald-700">Odgovorit ćemo vam u najkraćem mogućem roku.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-neutral-700 mb-1">
                  Vaše ime i prezime
                </label>
                <input
                  required
                  type="text"
                  placeholder="npr. Ana Kovačević"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-neutral-700 mb-1">
                  Vaša e-mail adresa
                </label>
                <input
                  required
                  type="email"
                  placeholder="ana@primjer.hr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-neutral-700 mb-1">
                  Vaša poruka ili upit za veleprodaju
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Kako vam možemo pomoći?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-xs focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-foreground hover:bg-primary text-white uppercase py-2.5 px-6 rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
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
