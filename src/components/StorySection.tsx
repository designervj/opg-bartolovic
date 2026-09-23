import React from 'react';

interface StorySectionProps {
  onLearnMore: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onLearnMore }) => {
  return (
    <section className="w-full bg-[#F7F2EC] py-16 sm:py-20 lg:py-24 border-y border-neutral-200/40">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="font-mono-custom font-bold text-2xl sm:text-3xl lg:text-[34px] text-neutral-900 tracking-tight leading-[1.25]">
              OPG Bartolović – s<br className="hidden sm:inline" />
              ljubavlju iz Valpova
            </h2>

            <div className="mt-6 space-y-4 font-sans-custom text-[13.5px] sm:text-[14.5px] text-neutral-700 leading-relaxed">
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
              <p className="font-medium text-neutral-900">
                Birajte lokalno, birajte prirodno. Birajte OPG Bartolović.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={onLearnMore}
                className="border border-neutral-900 hover:bg-neutral-900 text-neutral-900 hover:text-white px-6 py-2.5 font-mono-custom text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
              >
                Više o nama
              </button>
            </div>
          </div>

          {/* Right Column: Hexagonal Honeycomb Image Cluster */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] h-[380px] sm:h-[420px] select-none">
              
              {/* Top Hexagon: Apiary Beekeeper */}
              <div 
                className="absolute top-0 right-[15%] w-[190px] sm:w-[220px] h-[210px] sm:h-[245px] transition-transform duration-500 hover:scale-[1.03] z-10 filter drop-shadow-md"
              >
                <div 
                  className="w-full h-full overflow-hidden clip-hexagon bg-amber-900"
                >
                  <img
                    src="/assets/images/beekeeper_apiary_1790164714451.jpg"
                    alt="Pčelinjak Valpovo OPG Bartolović"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.98]"
                  />
                </div>
              </div>

              {/* Bottom Left Hexagon: Bees on Honeycomb Macro */}
              <div 
                className="absolute bottom-2 left-[4%] w-[190px] sm:w-[220px] h-[210px] sm:h-[245px] transition-transform duration-500 hover:scale-[1.03] z-20 filter drop-shadow-md"
              >
                <div 
                  className="w-full h-full overflow-hidden clip-hexagon bg-amber-900"
                >
                  <img
                    src="/assets/images/bees_honeycomb_macro_1790164726790.jpg"
                    alt="Pčele na saću"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.98]"
                  />
                </div>
              </div>

              {/* Bottom Right Hexagon: Honeycomb Frame with Beekeeper */}
              <div 
                className="absolute bottom-4 right-[2%] w-[190px] sm:w-[220px] h-[210px] sm:h-[245px] transition-transform duration-500 hover:scale-[1.03] z-15 filter drop-shadow-md"
              >
                <div 
                  className="w-full h-full overflow-hidden clip-hexagon bg-amber-900"
                >
                  <img
                    src="/assets/images/beekeeper_frame_1790164739918.jpg"
                    alt="Svježe saće s medom"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.98]"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
