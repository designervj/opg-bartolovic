import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden flex items-center justify-center">
      {/* Background Image with warm atmospheric grade */}
      <img
        src="../img/hero-img.png"
        alt="Domaći med OPG Bartolović"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Measured Dark & Amber Vignette Scrim */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60 pointer-events-none" /> */}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
        
        {/* Main Monospace Headline matching Frame 7.png */}
        <h1 
          className="text-[28px] sm:text-[38px] lg:text-[54px] leading-tight text-white drop-shadow-md max-w-3xl"
          style={{ textWrap: 'balance' }}
        >
          Iz košnice do tvog doma<br />
          -prirodno, s ljubavlju.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-white/95 max-w-2xl drop-shadow-sm px-2 sm:px-0">
          Bez aditiva, bez kompromisa – samo čista priroda, tradicija i ljubav prema pčelama.
        </p>

        {/* Call to Action Button */}
        <div className="mt-8">
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-white bg-transparent hover:bg-primary text-white hover:text-primary uppercase transition-all duration-300 shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            Pogledaj ponudu
          </button>
        </div>

      </div>
    </section>
  );
};
