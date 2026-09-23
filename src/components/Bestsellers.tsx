import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product, PRODUCTS } from '../data/honeyData';

interface BestsellersProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onViewAll: () => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({
  onAddToCart,
  onQuickView,
  onViewAll,
}) => {
  return (
    <section id="bestsellers" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
      
      {/* Header Row: Title, Subtitle, "Vidi sve" button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h2 className="font-mono-custom font-bold text-2xl sm:text-3xl lg:text-[34px] text-neutral-900 tracking-tight">
            Naši bestselleri
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-sans-custom text-neutral-600 max-w-2xl leading-relaxed">
            Ne znate koji med odabrati? Inspirirajte se kolekcijom naših najprodavanijih mednih proizvoda.
          </p>
        </div>

        {/* Outline Vidi sve button */}
        <div className="shrink-0">
          <button
            onClick={onViewAll}
            className="border border-neutral-800 hover:bg-neutral-900 text-neutral-900 hover:text-white px-5 py-2 font-mono-custom text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Vidi sve
          </button>
        </div>
      </div>

      {/* 4 Products Grid matching Frame 7.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col cursor-pointer"
            onClick={() => onQuickView(product)}
          >
            {/* Image Container with Soft Neutral Studio Background */}
            <div className="relative w-full h-[280px] sm:h-[290px] bg-[#F7F6F3] rounded-xs flex items-center justify-center p-6 overflow-hidden transition-all duration-300 group-hover:bg-[#F3F0EA]">
              
              {/* Optional % SALE badge for 4th card */}
              {product.isSale && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-neutral-900 text-white text-[11px] font-mono-custom font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
                    % SALE
                  </span>
                </div>
              )}

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="max-h-[220px] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-sm"
              />

              {/* Hover Quick-Action Overlay Buttons */}
              <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="flex-1 bg-neutral-900 hover:bg-amber-800 text-white text-xs font-sans-custom font-medium py-2.5 px-3 rounded-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Dodaj u košaricu</span>
                </button>
                <button
                  type="button"
                  aria-label="Brzi pregled"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                  className="bg-white/95 hover:bg-white text-neutral-800 p-2.5 rounded-xs transition-colors shadow-sm cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Product Meta Below Image */}
            <div className="pt-3.5 flex flex-col">
              {/* Category */}
              <span className="font-sans-custom text-[11.5px] text-neutral-500 font-normal">
                {product.category}
              </span>

              {/* Title */}
              <h3 className="font-sans-custom font-bold text-[14.5px] text-neutral-900 mt-0.5 leading-snug group-hover:text-amber-900 transition-colors">
                {product.title}
              </h3>

              {/* 5 Rating Stars in Amber */}
              <div className="flex items-center gap-0.5 mt-1 text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#E5A83B]" />
                ))}
              </div>

              {/* Price */}
              <div className="mt-1.5 flex items-center font-sans-custom font-semibold text-[14.5px] text-neutral-900 tabular-nums">
                {product.originalPrice && (
                  <span className="text-neutral-400 font-normal line-through text-[13.5px] mr-2">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
                <span>{product.price.toFixed(2)} €</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
