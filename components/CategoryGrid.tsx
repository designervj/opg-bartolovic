import React from 'react';

interface CategoryGridProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
      
      {/* Top Row: 2 Wide Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:gap-y-6">
        
        {/* Med od bagrema */}
        <div
          onClick={() => onSelectCategory('bagrem')}
          className="group relative h-[240px] sm:h-[280px] lg:h-[300px] overflow-hidden rounded-xs cursor-pointer bg-neutral-100"
        >
          <img
            src="../img/service-img.png"
            alt="Med od bagrema"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
          <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7 z-10">
            <h3 className="lg:text-[24px] font-semibold  tracking-[3px] text-white drop-shadow-md">
              Med od bagrema
            </h3>
          </div>
        </div>

        {/* Med od lipe */}
        <div
          onClick={() => onSelectCategory('lipa')}
          className="group relative h-[240px] sm:h-[280px] lg:h-[300px] overflow-hidden rounded-xs cursor-pointer bg-neutral-100"
        >
          <img
            src="../img/services-img-1.png"
            alt="Med od lipe"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
          <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7 z-10">
            <h3 className="lg:text-[24px] font-semibold  tracking-[3px] text-white drop-shadow-md">
              Med od lipe
            </h3>
          </div>
        </div>

      </div>

      {/* Bottom Row: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Cvijetni med */}
        <div
          onClick={() => onSelectCategory('cvjetni')}
          className="group relative h-[210px] sm:h-[240px] lg:h-[260px] overflow-hidden rounded-xs cursor-pointer bg-neutral-100"
        >
          <img
            src="../img/services-img-2.png"
            alt="Cvijetni med"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10">
            <h3 className="lg:text-[24px] font-semibold  tracking-[3px] text-white drop-shadow-md">
              Cvijetni med
            </h3>
          </div>
        </div>

        {/* Livadni med */}
        <div
          onClick={() => onSelectCategory('livadni')}
          className="group relative h-[210px] sm:h-[240px] lg:h-[260px] overflow-hidden rounded-xs cursor-pointer bg-neutral-100"
        >
          <img
            src="../img/services-img-3.png"
            alt="Livadni med"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10">
            <h3 className="lg:text-[24px] font-semibold  tracking-[3px] text-white drop-shadow-md">
              Livadni med
            </h3>
          </div>
        </div>

        {/* Ostali proizvodi */}
        <div
          onClick={() => onSelectCategory('ostalo')}
          className="group relative h-[210px] sm:h-[240px] lg:h-[260px] overflow-hidden rounded-xs cursor-pointer bg-neutral-100"
        >
          <img
            src="../img/services-img-4.png"
            alt="Ostali proizvodi"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-10">
            <h3 className="lg:text-[24px] font-semibold  tracking-[3px] text-white drop-shadow-md">
              Ostali proizvodi
            </h3>
          </div>
        </div>

      </div>

    </section>
  );
};
