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
          <h2 className="lg:text-[34px] text-foreground">
            Naši bestselleri
          </h2>
          <p className="mt-2 text-foreground/70 max-w-2xl">
            Ne znate koji med odabrati? Inspirirajte se kolekcijom naših najprodavanijih mednih proizvoda.
          </p>
        </div>

        {/* Outline Vidi sve button */}
        <div className="shrink-0">
          <button
            onClick={onViewAll}
            className="border border-neutral-800 hover:bg-foreground text-foreground hover:text-white px-5 py-2 uppercase transition-colors duration-200 cursor-pointer"
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
            <div className="relative w-full h-[280px] sm:h-[290px] bg-[#F7F3F0] rounded-xs flex items-center justify-center p-6 overflow-hidden transition-all duration-300 group-hover:bg-[#F3F0EA]">
              
              {/* Optional % SALE badge for 4th card */}
              {product.isSale && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-foreground text-white px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
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
                  className="flex-1 bg-foreground hover:bg-primary text-white py-2.5 px-3 rounded-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
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
                  className="bg-background/95 hover:bg-background text-foreground p-2.5 rounded-xs transition-colors shadow-sm cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Product Meta Below Image */}
            <div className="pt-3.5 flex flex-col">
              {/* Category */}
              <span className="text-[14px] text-[#646772]">
                {product.category}
              </span>

              {/* Title */}
              <h6 className="text-[16px] text-[#232323]  mt-0.5 group-hover:text-primary font-bold transition-colors">
                {product.title}
              </h6>

              {/* 5 Rating Stars in Amber */}
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  // <Star key={i} className="w-3.5 h-3.5 fill-[#E5A83B]" />
                  <img src="../img/single-star.svg" alt='star'></img>
                ))}
              </div>

              {/* Price */}
              <div className="mt-1.5 flex items-center text-foreground tabular-nums">
                {product.originalPrice && (
                  <span className="text-[#232323] line-through mr-2">
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
