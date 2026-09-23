import React from 'react';

interface CtaBannerProps {
  onOrderNow: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOrderNow }) => {
  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="relative w-full h-[260px] sm:h-[290px] md:h-[310px] overflow-hidden rounded-xs flex items-center justify-center text-center shadow-lg">
        
        {/* Background Image */}
        <img
          src="/assets/images/cta_honey_spoon_1790164753644.jpg"
          alt="Prirodni domaći med Slavonija"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.1]"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-neutral-950/40" />

        {/* Banner Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 flex flex-col items-center">
          
          {/* Main Monospace Headline */}
          <h2 className="font-mono-custom font-bold text-2xl sm:text-3xl md:text-[34px] text-white tracking-tight drop-shadow-md">
            Spremni za žlicu prirode?
          </h2>

          {/* Subheading */}
          <p className="mt-3 font-sans-custom font-bold text-xs sm:text-sm text-white drop-shadow-sm">
            Prirodno. Kvalitetno. Izravno s našeg pčelinjaka.
          </p>
          <p className="mt-0.5 font-sans-custom font-normal text-[11.5px] sm:text-xs text-white/85 max-w-lg leading-relaxed drop-shadow-sm">
            Naručite danas i osjetite razliku koju donosi prava priroda –<br className="hidden sm:inline" />
            izravno iz srca Slavonije!
          </p>

          {/* Call to action button */}
          <div className="mt-6">
            <button
              onClick={onOrderNow}
              className="border border-white/90 hover:border-white bg-black/30 hover:bg-white text-white hover:text-neutral-950 font-mono-custom text-xs uppercase tracking-[0.2em] px-7 py-2.5 transition-all duration-300 cursor-pointer shadow-md backdrop-blur-xs"
            >
              Naruči sada
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
