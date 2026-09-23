import React, { useState } from 'react';
import { MapPin, Phone, Mail, Map as MapIcon, Check } from 'lucide-react';

interface ContactPageProps {
  onShowToast: (message: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitted(true);
    onShowToast('Vaša poruka je uspješno poslana! Odgovorit ćemo vam ubrzo.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="w-full bg-white text-neutral-900 font-sans-custom selection:bg-amber-200 selection:text-neutral-900">
      
      {/* ======================================================== */}
      {/* 1. HERO BANNER                                           */}
      {/* ======================================================== */}
      <section className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] overflow-hidden flex items-center justify-center">
        {/* Background Image: Honey dipper and golden honey on wood/comb */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1920&q=85')`,
          }}
        >
          {/* Subtle warm overlay to match screenshot contrast */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto space-y-3">
          <h1 className="font-mono-custom font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
            Kontaktiraj  nas
          </h1>
          <div className="font-sans-custom text-white/95 text-xs sm:text-sm md:text-[14.5px] leading-relaxed max-w-lg mx-auto font-normal space-y-1">
            <p>Imate pitanje o našim proizvodima, narudžbi ili suradnji?</p>
            <p>Rado ćemo vam pomoći!</p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. MAIN 2-COLUMN CONTACT LAYOUT                          */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ==================================================== */}
            {/* LEFT COLUMN: Kontakt podatci & Pošalji nam poruku   */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 space-y-10">
              
              {/* Part A: Kontakt podatci */}
              <div className="space-y-6">
                <h2 className="font-mono-custom font-bold text-xl sm:text-2xl text-neutral-900 tracking-tight">
                  Kontakt podatci
                </h2>

                {/* 3 Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Card 1: Lokacija */}
                  <div className="bg-[#F8F7F4] p-5 rounded-xs space-y-2 border border-neutral-100">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#A88241] stroke-[2] shrink-0" />
                      <span className="font-sans-custom font-bold text-xs sm:text-[13px] text-neutral-900">
                        Lokacija
                      </span>
                    </div>
                    <div className="text-xs sm:text-[12.5px] text-neutral-700 pl-6 leading-relaxed">
                      <p>Ulica Janka Leskovara 15</p>
                      <p>31550 Valpovo</p>
                    </div>
                  </div>

                  {/* Card 2: Nazovite nas */}
                  <div className="bg-[#F8F7F4] p-5 rounded-xs space-y-2 border border-neutral-100">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#A88241] stroke-[2] shrink-0" />
                      <span className="font-sans-custom font-bold text-xs sm:text-[13px] text-neutral-900">
                        Nazovite nas
                      </span>
                    </div>
                    <div className="text-xs sm:text-[12.5px] text-neutral-700 pl-6 leading-relaxed">
                      <p>+123 456 7890</p>
                      <p>+123 456 7891</p>
                    </div>
                  </div>

                  {/* Card 3: Email */}
                  <div className="bg-[#F8F7F4] p-5 rounded-xs space-y-2 border border-neutral-100 sm:col-span-1">
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#A88241] stroke-[2] shrink-0" />
                      <span className="font-sans-custom font-bold text-xs sm:text-[13px] text-neutral-900">
                        Email
                      </span>
                    </div>
                    <div className="text-xs sm:text-[12.5px] text-neutral-700 pl-6 leading-relaxed">
                      <p>info@opgbartolovic.hr</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Thin Divider */}
              <div className="border-b border-neutral-200" />

              {/* Part B: Pošalji nam poruku */}
              <div className="space-y-6">
                <h2 className="font-mono-custom font-bold text-xl sm:text-2xl text-neutral-900 tracking-tight">
                  Pošalji nam poruku
                </h2>

                {isSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs flex items-center gap-3 text-emerald-800 text-xs sm:text-sm animate-fade-in">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hvala vam na poruci! Javit ćemo vam se u najkraćem mogućem roku.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Ime* */}
                  <div>
                    <label className="block text-xs text-neutral-800 mb-1.5 font-medium">
                      Ime<span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] border border-neutral-300 rounded-xs bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>

                  {/* Email* */}
                  <div>
                    <label className="block text-xs text-neutral-800 mb-1.5 font-medium">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] border border-neutral-300 rounded-xs bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>

                  {/* Naslov* */}
                  <div>
                    <label className="block text-xs text-neutral-800 mb-1.5 font-medium">
                      Naslov<span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] border border-neutral-300 rounded-xs bg-white focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>

                  {/* Poruka* */}
                  <div>
                    <label className="block text-xs text-neutral-800 mb-1.5 font-medium">
                      Poruka<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-[13px] border border-neutral-300 rounded-xs bg-white focus:outline-none focus:border-neutral-900 transition-colors resize-none font-sans-custom"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#1C1F20] hover:bg-neutral-800 text-white font-mono-custom text-xs uppercase tracking-wider py-3 px-8 rounded-xs transition-colors duration-200 cursor-pointer shadow-xs active:scale-95"
                    >
                      Pošalji
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: Pronađi nas (Map Section)              */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-mono-custom font-bold text-xl sm:text-2xl text-neutral-900 tracking-tight">
                Pronađi nas
              </h2>

              {/* Map Canvas / Container matching the exact screenshot */}
              <div className="relative border border-neutral-200 rounded-xs overflow-hidden shadow-xs group bg-[#e5e3df]">
                
                {/* Embedded Map Visual */}
                <div className="relative w-full h-[480px] sm:h-[540px]">
                  
                  {/* Real interactive Google Maps iframe centered on Valpovo */}
                  <iframe
                    title="OPG Bartolović Valpovo Lokacija"
                    src="https://maps.google.com/maps?q=Valpovo,Ulica%20Janka%20Leskovara%2015,Croatia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter saturate-90"
                    loading="lazy"
                  />

                  {/* Overlay Pin replicating screenshot's branded marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md flex flex-col items-center">
                    <div className="bg-white/95 backdrop-blur-xs border border-neutral-300 px-3 py-1.5 rounded-xs shadow-md mb-1.5 flex items-center gap-1.5 animate-bounce">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                      <span className="text-[11px] font-sans-custom font-semibold text-neutral-900 whitespace-nowrap">
                        Pčelarstvo OPG Bartolović
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <MapPin className="w-5 h-5 fill-white stroke-red-600" />
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Action: "Otvori na Mapama" matching screenshot with Map icon */}
              <div className="pt-1">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Valpovo+Ulica+Janka+Leskovara+15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono-custom font-bold text-xs uppercase text-neutral-900 hover:text-amber-800 transition-colors cursor-pointer group"
                >
                  <MapIcon className="w-4 h-4 text-neutral-900 group-hover:text-amber-800 stroke-[2]" />
                  <span className="tracking-wide">Otvori na Mapama</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
