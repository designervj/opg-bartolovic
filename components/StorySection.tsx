import React from 'react';

interface StorySectionProps {
  onLearnMore: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onLearnMore }) => {
  return (
    <section className="w-full bg-[#F7F2EC] py-16 sm:py-20 lg:py-24 border-y border-border/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="lg:text-[34px] text-foreground">
              OPG Bartolović – s<br className="hidden sm:inline" />
              ljubavlju iz Valpova
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700">
              <p>
                Naše pčelarstvo nije samo posao – to je obiteljska priča koja traje
                generacijama. Brinemo o 150 košnica koje se nalaze u netaknutoj prirodi oko
                Valpova. Vjerujemo u održivo pčelarenje, poštujemo prirodu i svaku kap meda
                proizvodimo s najvećom pažnjom.
              </p>
              <p>
                Naš trud prepoznat je i nacionalno – sav naš med pakiran je u nacionalnu
                staklenku s oznakom &quot;Med hrvatskih pčelinjaka&quot;, jamčeći vam vrhunsku
                kvalitetu i podrijetlo.
              </p>
              <p className="text-foreground">
                Birajte lokalno, birajte prirodno. Birajte OPG Bartolović.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={onLearnMore}
                className="border border-neutral-900 hover:bg-foreground text-foreground hover:text-white px-6 py-2.5 uppercase transition-colors duration-200 cursor-pointer"
              >
                Više o nama
              </button>
            </div>
          </div>

          {/* Right Column: Hexagonal Honeycomb Image Cluster */}
          <div className="lg:col-span-6 flex justify-center items-center">

            {/* Mobile: 3 hexagons in a row */}
            <div className="flex flex-row justify-center gap-3 lg:hidden w-full py-4">
              {[
                { src: '../img/Vector.png', alt: 'P\u010delinjak' },
                { src: '../img/Vector-1.png', alt: 'P\u010dele na sa\u0107u' },
                { src: '../img/Vector-2.png', alt: 'Sa\u0107e s medom' },
              ].map((img) => (
                <div key={img.src} className="w-[100px] h-[112px] sm:w-[140px] sm:h-[156px] flex-shrink-0">
                  <div className="w-full h-full overflow-hidden clip-hexagon">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: overlapping absolute cluster */}
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
  );
};
