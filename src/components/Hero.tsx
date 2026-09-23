import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden flex items-center justify-center">
      {/* Background Image with warm atmospheric grade */}
      <img
        src="/assets/images/hero_honey_dipper_1790164591134.jpg"
        alt="Domaći med OPG Bartolović"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
      />

      {/* Measured Dark & Amber Vignette Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
        
        {/* Main Monospace Headline matching Frame 7.png */}
        <h1 
          className="font-mono-custom font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.18] sm:leading-[1.16] text-white drop-shadow-md max-w-3xl"
          style={{ textWrap: 'balance' }}
        >
          Iz košnice do tvog doma<br />
          -prirodno, s ljubavlju.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base md:text-[17px] font-sans-custom font-normal text-white/95 max-w-2xl leading-relaxed drop-shadow-sm">
          Bez aditiva, bez kompromisa – samo čista priroda, tradicija i ljubav prema pčelama.
        </p>

        {/* Call to Action Button */}
        <div className="mt-8">
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-[#c49852] bg-neutral-950/60 hover:bg-[#c49852] text-[#f7e8cf] hover:text-neutral-950 font-mono-custom text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            Pogledaj ponudu
          </button>
        </div>

      </div>
    </section>
  );
};
