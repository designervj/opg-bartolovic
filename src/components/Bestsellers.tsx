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
    <section id="bestsellers" className="container mx-auto px-4  pb-20 sm:pb-24">
      <div className="flex items-center justify-between mb-12">
        <div className='col-10'>
          <h2 className="lg:text-[34px] text-foreground font-bold">
            Naši bestselleri
          </h2>
          <p className="mt-2 text-foreground/70 ">
            Ne znate koji med odabrati? Inspirirajte se kolekcijom naših najprodavanijih mednih proizvoda.
          </p>
        </div>

        <div className="shrink-0 col-2">
          <button
            onClick={onViewAll}
            className="border border-black text-black hover:bg-primary hover:text-white px-5 py-2 uppercase transition-colors duration-200 cursor-pointer rounded-xs font-semibold"
          >
            Vidi sve
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col cursor-pointer"
            onClick={() => onQuickView(product)}
          >
            <div className="relative w-full h-[280px] sm:h-[290px] bg-secondary/50 rounded-xs flex items-center justify-center p-6 overflow-hidden transition-all duration-300 group-hover:bg-secondary">
              {product.isSale && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-primary text-white px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs text-xs font-semibold">
                    % SALE
                  </span>
                </div>
              )}

              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="max-h-[220px] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-sm"
              />

              <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-2.5 px-3 rounded-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer font-semibold text-xs"
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

            <div className="pt-3.5 flex flex-col">
              <span className="text-[14px] text-muted-foreground">
                {product.category}
              </span>

              <h6 className="text-[16px] text-foreground mt-0.5 group-hover:text-primary font-bold transition-colors">
                {product.title}
              </h6>

              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src="../img/single-star.svg" alt='star' />
                ))}
              </div>

              <div className="mt-1.5 flex items-center text-foreground tabular-nums font-semibold">
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through mr-2">
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
