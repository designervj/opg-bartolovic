import React from 'react';

interface CtaBannerProps {
  onOrderNow: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOrderNow }) => {
  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="relative w-full h-[220px] sm:h-[290px] md:h-[329px] overflow-hidden rounded-xs flex items-center justify-center text-center shadow-lg">
        
        {/* Background Image */}
        <img
          src="../img/cta-img.png"
          alt="Prirodni domaći med Slavonija"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center "
        />

        {/* Ambient Dark Overlay */}
        {/* <div className="absolute inset-0 bg-foreground/40" /> */}

        {/* Banner Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 flex flex-col items-center">
          
          {/* Main Monospace Headline */}
          <h2 className="text-[20px] sm:text-[26px] md:text-[34px] leading-tight text-white drop-shadow-md">
            Spremni za žlicu prirode?
          </h2>

          {/* Subheading */}
          <p className="mt-2 text-xs sm:text-sm text-white drop-shadow-sm">
            Prirodno. Kvalitetno. Izravno s našeg pčelinjaka.
          </p>
          <p className="hidden sm:block mt-0.5 text-white/85 max-w-lg drop-shadow-sm">
            Naručite danas i osjetite razliku koju donosi prava priroda –
            izravno iz srca Slavonije!
          </p>

          {/* Call to action button */}
          <div className="mt-4 sm:mt-6">
            <button
              onClick={onOrderNow}
              className="border border-white/90 hover:border-white bg-foreground/30 hover:bg-background text-white hover:text-neutral-950 uppercase text-xs sm:text-sm px-5 sm:px-7 py-2 sm:py-2.5 transition-all duration-300 cursor-pointer shadow-md backdrop-blur-xs"
            >
              Naruči sada
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
