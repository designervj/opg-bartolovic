import React from 'react';
import { Check } from 'lucide-react';

interface AboutPageProps {
  onNavigateShop: () => void;
  onNavigateContact?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateShop }) => {
  return (
    <div className="w-full bg-background text-foreground selection:bg-amber-200 selection:text-foreground">
      
      {/* ======================================================== */}
      {/* 1. HERO BANNER                                           */}
      {/* ======================================================== */}
      <section className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden flex items-center justify-center">
        {/* Background Image: Bee on honeycomb */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('../img/about-img.png')`,
          }}
        >
          {/* Subtle dark gradient overlay to ensure text contrast matching screenshot */}
          {/* <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[0.5px]" /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <h1 className="text-white">
            O  nama
          </h1>
          <p className="text-white/95 max-w-2xl mx-auto">
            Naše pčelarstvo nije samo posao – to je obiteljska priča koja traje generacijama.
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. STORY & MISSION (OPG Bartolović – s ljubavlju iz Valpova) */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-foreground">
                OPG Bartolović – s<br className="hidden sm:inline" /> ljubavlju iz Valpova
              </h2>

              <div className="space-y-4 text-neutral-700">
                <p>
                  Naše pčelarstvo nije samo posao – to je obiteljska priča koja traje generacijama. Brinemo o 150 košnica koje se nalaze u netaknutoj prirodi oko Valpova. Vjerujemo u održivo pčelarenje, poštujemo prirodu i svaku kap meda proizvodimo s najvećom pažnjom.
                </p>

                <p>
                  Naš trud prepoznat je i nacionalno – sav naš med pakiran je u nacionalnu staklenku s oznakom “Med hrvatskih pčelinjaka”, jamčeći vam vrhunsku kvalitetu i podrijetlo.
                </p>

                <p className="text-foreground pt-1">
                  Birajte lokalno, birajte prirodno. Birajte OPG Bartolović.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onNavigateShop}
                  className="inline-flex items-center justify-center bg-foreground hover:bg-neutral-800 text-white uppercase px-6 py-3 rounded-xs transition-colors cursor-pointer"
                >
                  Istraži naše proizvode
                </button>
              </div>
            </div>

            {/* Right: Honeycomb Hexagon Photo Cluster */}
            <div className="lg:col-span-6 flex justify-center items-center">
                 <div className="relative hidden lg:block w-full max-w-[480px] h-[480px] select-none mx-auto">
              {/* Top Hexagon */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[240px] h-[265px] transition-transform duration-500 hover:scale-[1.03] z-10 filter drop-shadow-sm">
                <div className="w-full h-full overflow-hidden clip-hexagon">
                  <img src="../img/Vector.png" alt="P\u010delinjak Valpovo OPG Bartolovi\u0107" className="w-full h-full object-cover object-center" />
                </div>
              </div>
              {/* Bottom Left Hexagon */}
              <div className="absolute bottom-0 left-[-3%] w-[240px] h-[265px] transition-transform duration-500 hover:scale-[1.03] z-20 filter drop-shadow-sm">
                <div className="w-full h-full overflow-hidden clip-hexagon">
                  <img src="../img/Vector-1.png" alt="P\u010dele na sa\u0107u" className="w-full h-full object-cover object-center" />
                </div>
              </div>
              {/* Bottom Right Hexagon */}
              <div className="absolute bottom-0 right-[-3%] w-[240px] h-[265px] transition-transform duration-500 hover:scale-[1.03] z-15 filter drop-shadow-sm">
                <div className="w-full h-full overflow-hidden clip-hexagon">
                  <img src="../img/Vector-2.png" alt="Svje\u017ee sa\u0107e s medom" className="w-full h-full object-cover object-center" />
                </div>
              </div>
            </div>
            </div>

         

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. PRODUCT SPECIALTIES BAND (Warm Beige Background)      */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-28 bg-[#F7F5F0]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Image: Honey jar collection on dark surface */}
            <div className="lg:col-span-6 overflow-hidden rounded-xs shadow-sm">
              <img
                src="../img/about-service.png"
                alt="Razne vrste prirodnog meda OPG Bartolović"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[380px] object-cover"
              />
            </div>

            {/* Right Specialties List */}
            <div className="lg:col-span-6 space-y-6">
              <h6 className="text-foreground">
                Specijalizirani smo za razne vrste meda i proizvode na bazi meda poput:
              </h6>

              {/* Checkmark List */}
              <ul className="space-y-3.5">
                {[
                  'Bagremovog meda',
                  'Meda sa saćem',
                  'Livadnog i cvijetnog meda',
                  'Imunomeda, propolisa, peludi',
                  'Meda s orasima, sjemenkama i uljem konoplje',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="sm:text-[16px] text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="pt-2 pe-2">
                Naš cilj je pružiti vam prirodan i zdrav proizvod kojem možete vjerovati – za vaše zdravlje i svakodnevno uživanje.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. OUR TEAM (Naš tim)                                    */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-foreground">
              Naš tim
            </h2>
            <p className=" text-neutral-700">
              Naš tim je mala, ali snažna obiteljska zajednica koja dijeli zajedničku strast prema pčelarstvu i očuvanju prirode.
            </p>
            <p className=" text-foreground/60">
              Tko smo mi:
            </p>
          </div>

          {/* 3 Team Members in Hexagons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 max-w-4xl mx-auto">
            
            {/* Member 1: Ivo Bartolović */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div 
                className="w-48 h-52 sm:w-52 sm:h-56 overflow-hidden shadow-md transition-transform hover:scale-105 duration-300"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <img
                  src="../img/team.png"
                  alt="Ivo Bartolović"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h5 className="text-foreground py-1">
                  Ivo Bartolović
                </h5>
                <p className=" text-foreground/60">
                  Glavni pčelar i čuvar tradicije
                </p>
              </div>
            </div>

            {/* Member 2: Ana Bartolović */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div 
                className="w-48 h-52 sm:w-52 sm:h-56 overflow-hidden shadow-md transition-transform hover:scale-105 duration-300"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <img
                  src="../img/team-1.png"
                  alt="Ana Bartolović"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h5 className="text-foreground py-1">
                  Ana Bartolović
                </h5>
                <p className="sm:text-[13px] text-foreground/60">
                  Zadužena za kontrolu kvalitete i pakiranje
                </p>
              </div>
            </div>

            {/* Member 3: Marko Bartolović */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div 
                className="w-48 h-52 sm:w-52 sm:h-56 overflow-hidden shadow-md transition-transform hover:scale-105 duration-300"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <img
                  src="../img/team-2.png"
                  alt="Marko Bartolović"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h5 className="text-foreground py-1">
                  Marko Bartolović
                </h5>
                <p className="sm:text-[13px] text-foreground/60">
                  Brine o marketingu i dostavi
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Commitment Statement */}
          <div className="mt-16 text-center max-w-2xl mx-auto px-8">
            <p className=" text-foreground/70">
              Svaki član tima osobno je posvećen tome da vam dostavimo najbolje što priroda može ponuditi. Zajedno, s puno rada i još više srca, stvaramo proizvode kojima se ponosimo i koje s radošću dijelimo s vama.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
