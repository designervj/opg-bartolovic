import React, { useState } from 'react';
import { MapPin, Phone, Mail, Map as MapIcon, Check } from 'lucide-react';
import EditableText from '@/components/shared/EditableText';

interface ContactPageProps {
  onShowToast: (message: string) => void;
  isEditable?: boolean;
  pageData?: any;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast, isEditable = false, pageData, onSave = () => {} }) => {
  const section = (type: string) => pageData?.content?.find((item: any) => item.type === type || item.adminTitle === type);
  const hero = section('hero');
  const details = section('contactDetails');
  const form = section('contactForm');
  const map = section('map');
  const save = (sectionId: string | undefined, fieldPath: string) => (value: string) => sectionId && onSave(sectionId, fieldPath, value);
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
    <div className="w-full bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      
      {/* ======================================================== */}
      {/* 1. HERO BANNER                                           */}
      {/* ======================================================== */}
      <section className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] overflow-hidden flex items-center justify-center">
        {/* Background Image: Honey dipper and golden honey on wood/comb */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('../img/contact-img.png')`,
          }}
        >
          {/* Subtle warm overlay to match screenshot contrast */}
          {/* <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[0.5px]" /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto space-y-6">
          <EditableText tag="h1" value={hero?.props?.title || 'Kontaktiraj nas'} isEditable={isEditable} onSave={save(hero?.id, 'props.title')} className="text-white" />
          <div className="text-white/95 max-w-lg mx-auto space-y-1">
            <EditableText tag="p" value={hero?.props?.subtitle || 'Imate pitanje o našim proizvodima, narudžbi ili suradnji? Rado ćemo vam pomoći!'} isEditable={isEditable} onSave={save(hero?.id, 'props.subtitle')} />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. MAIN 2-COLUMN CONTACT LAYOUT                          */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container mx-auto px-4 ">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ==================================================== */}
            {/* LEFT COLUMN: Kontakt podatci & Pošalji nam poruku   */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 space-y-10">
              
              {/* Part A: Kontakt podatci */}
              <div className="space-y-6">
                <EditableText tag="h4" value={details?.props?.title || 'Kontakt podatci'} isEditable={isEditable} onSave={save(details?.id, 'props.title')} className="text-foreground" />

                {/* 3 Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Card 1: Lokacija */}
                  <div className="bg-secondary p-5 flex gap-2 rounded-xs space-y-2">
                    <div>
                      {/* <MapPin className="w-4 h-4 stroke-[2] shrink-0 text-primary" /> */}
                      <img src="../img/Solid.svg" alt='Map Pin'></img>
                     
                    </div>
                    <div className="text-secondary-foreground pl-2">
                       <EditableText tag="h6" value={details?.props?.location?.title || 'Lokacija'} isEditable={isEditable} onSave={save(details?.id, 'props.location.title')} className="text-secondary-foreground pb-2" />
                      <EditableText tag="p" value={details?.props?.location?.address || 'Ulica Janka Leskovara 15'} isEditable={isEditable} onSave={save(details?.id, 'props.location.address')} />
                      <EditableText tag="p" value={details?.props?.location?.city || '31550 Valpovo'} isEditable={isEditable} onSave={save(details?.id, 'props.location.city')} />
                    </div>
                  </div>

                  {/* Card 2: Nazovite nas */}
                  <div className="bg-secondary p-5 flex gap-2 rounded-xs space-y-2">
                    <div>
                      {/* <Phone className="w-4 h-4 stroke-[2] shrink-0" /> */}
                      <img src="../img/phone.svg" alt='Map Pin'></img>
                    </div>
                    <div className=" text-secondary-foreground pl-2">
                       <EditableText tag="h6" value={details?.props?.phone?.title || 'Nazovite nas'} isEditable={isEditable} onSave={save(details?.id, 'props.phone.title')} className="text-secondary-foreground pb-2" />
                      <EditableText tag="p" value={details?.props?.phone?.numbers?.[0] || '+123 456 7890'} isEditable={isEditable} onSave={save(details?.id, 'props.phone.numbers.0')} />
                      <EditableText tag="p" value={details?.props?.phone?.numbers?.[1] || '+123 456 7891'} isEditable={isEditable} onSave={save(details?.id, 'props.phone.numbers.1')} />
                    </div>
                  </div>

                  {/* Card 3: Email */}
                  <div className="bg-secondary p-5 flex gap-2 rounded-xs space-y-2">
                    <div>
                      {/* <Mail className="w-4 h-4 stroke-[2] shrink-0" /> */}
                      <img src="../img/mail-01.svg" alt='Map Pin'></img>


                    
                    </div>
                    <div className=" text-secondary-foreground pl-2">
                        <EditableText tag="h6" value={details?.props?.email?.title || 'Email'} isEditable={isEditable} onSave={save(details?.id, 'props.email.title')} className="text-secondary-foreground pb-2" />
                      <EditableText tag="p" value={details?.props?.email?.address || 'info@opgbartolovic.hr'} isEditable={isEditable} onSave={save(details?.id, 'props.email.address')} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Thin Divider */}
              <div className="border-b border-border" />

              {/* Part B: Pošalji nam poruku */}
              <div className="space-y-6">
                <EditableText tag="h4" value={form?.props?.title || 'Pošalji nam poruku'} isEditable={isEditable} onSave={save(form?.id, 'props.title')} className="text-foreground" />

                {isSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs flex items-center gap-3 text-emerald-800 animate-fade-in">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hvala vam na poruci! Javit ćemo vam se u najkraćem mogućem roku.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Ime* */}
                  <div>
                    <label className="block text-primary-foreground font-semibold text-sm mb-1.5">
                      Ime<span className="text-[#CC2B52]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border rounded-xs bg-background focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>

                  {/* Email* */}
                  <div>
                    <label className="block text-primary-foreground font-semibold text-sm mb-1.5">
                      Email<span className="text-[#CC2B52]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border rounded-xs bg-background focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>

                  {/* Naslov* */}
                  <div>
                    <label className="block text-primary-foreground font-semibold text-sm mb-1.5">
                      Naslov<span className="text-[#7C8393]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border rounded-xs bg-background focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                  </div>

                  {/* Poruka* */}
                  <div>
                    <label className="block text-primary-foreground font-semibold text-sm mb-1.5">
                      Poruka<span className="text-[#7C8393]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-border rounded-xs bg-background focus:outline-none focus:border-neutral-900 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#232323] hover:bg-neutral-800 text-white text-sm font-semibold  py-3 px-8 rounded-xs transition-colors duration-200 cursor-pointer shadow-xs active:scale-95"
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
              <EditableText tag="h4" value={map?.props?.title || 'Pronađi nas'} isEditable={isEditable} onSave={save(map?.id, 'props.title')} className="text-foreground" />

              {/* Map Canvas / Container matching the exact screenshot */}
              <div className="relative border border-border rounded-xs overflow-hidden shadow-xs group bg-background">
                
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
                    <div className="bg-background/95 backdrop-blur-xs border border-border px-3 py-1.5 rounded-xs shadow-md mb-1.5 flex items-center gap-1.5 animate-bounce">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                      <span className="text-[11px] text-foreground whitespace-nowrap">
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
                  className="inline-flex items-center font-semibold gap-2 text-foreground hover:text-primary transition-colors cursor-pointer group"
                >
                  <MapIcon className="w-5 h-5 text-foreground group-hover:text-primary stroke-[2]" />
                  <span className="">Otvori na Mapama</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
