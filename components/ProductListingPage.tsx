import React, { useState, useMemo } from 'react';
import { Star, ShoppingCart, Eye, ChevronDown } from 'lucide-react';
import { Product, ALL_PRODUCTS, CATEGORIES_FILTER_LIST, SALE_SIDEBAR_PRODUCTS } from '../data/honeyData';

interface ProductListingPageProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onNavigateHome: () => void;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  onAddToCart,
  onQuickView,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('default');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (selectedCategory) {
      list = list.filter((p) => p.filterCategory === selectedCategory || p.category === selectedCategory);
    }

    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // default order matches image
        break;
    }

    return list;
  }, [selectedCategory, minPrice, maxPrice, sortBy]);

  return (
    <div className="w-full bg-[#F7F7F7] min-h-screen py-8 sm:py-12 border-b border-border/50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ========================================================== */}
          {/* LEFT SIDEBAR: Filter by Price, Categories, Sale           */}
          {/* ========================================================== */}
          <aside className="w-full lg:w-[280px] xl:w-[310px] shrink-0 space-y-7">
            
            {/* 1. Filter by price */}
            <div className="bg-background p-6 rounded-xs shadow-xs border border-border">
              <h5 className="text-[17px] text-foreground mb-5">
                Filter by price
              </h5>

              {/* Dual Slider bar visual representation */}
              <div className="relative pt-1 pb-3">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1 bg-primary rounded-lg appearance-none cursor-pointer accent-neutral-900"
                />
                
                <div className="flex justify-between items-center mt-3 text-primary-foreground font-bold tabular-nums">
                  <span>{minPrice}€</span>
                  <span>{maxPrice}€</span>
                </div>
              </div>
            </div>

            {/* 2. Categories */}
            <div className="bg-background p-6 rounded-xs shadow-xs border border-border">
              <div className="flex items-center justify-between mb-4">
                <h5 className=" text-foreground f">
                  Categories
                </h5>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-[11px] text-primary hover:underline"
                  >
                    Poništi
                  </button>
                )}
              </div>

              <ul className="space-y-2.5">
                {CATEGORIES_FILTER_LIST.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <li key={cat.name}>
                      <button
                        onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                        className={`w-full flex items-center justify-between py-1 transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'text-amber-900 '
                            : 'text-neutral-700 hover:text-amber-900'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                          <span className='text-[16px] font-medium hover:text-primary'>{cat.name}</span>
                        </span>
                        <span className="text-foreground/60 tabular-nums text-[16px] font-medium">
                          ({cat.count})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 3. Sale Sidebar */}
            <div className="bg-background p-6 rounded-xs shadow-xs border border-border">
              <h5 className=" text-foreground mb-5">
                Sale
              </h5>

              <div className="space-y-6">
                {SALE_SIDEBAR_PRODUCTS.map((saleItem) => (
                  <div
                    key={saleItem.id}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => onQuickView(saleItem)}
                  >
                    {/* Image Container with % SALE badge */}
                    <div className="relative w-full h-[185px] sm:h-[195px] bg-[#F7F3F0] rounded-xs flex items-center justify-center p-4 overflow-hidden group-hover:bg-[#F3F0EA] transition-colors">
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="bg-foreground text-xs text-white px-3 font-semibold py-2 rounded-full shadow-xs">
                          % SALE
                        </span>
                      </div>

                      <img
                        src={saleItem.image}
                        alt={saleItem.title}
                        referrerPolicy="no-referrer"
                        className="max-h-[145px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-xs"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="mt-2.5 flex flex-col">
                      <h6 className="text-[13.5px] text-foreground group-hover:text-amber-900 transition-colors">
                        {saleItem.title}
                      </h6>
                      <div className="mt-1 flex items-center text-foreground tabular-nums">
                        {saleItem.originalPrice && (
                          <span className="text-foreground/40 line-through mr-2">
                            {saleItem.originalPrice.toFixed(2)} €
                          </span>
                        )}
                        <span>{saleItem.price.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: Breadcrumbs, Title, Sort, Product Grid       */}
          {/* ========================================================== */}
          <main className="flex-1 bg-background p-6 sm:p-8 lg:p-10 rounded-xs shadow-xs border border-border min-w-0">
            
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-foreground/60 mb-2">
              <button
                onClick={onNavigateHome}
                className="hover:text-amber-900 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-foreground">Shop</span>
              {selectedCategory && (
                <>
                  <span>/</span>
                  <span className="text-amber-900">{selectedCategory}</span>
                </>
              )}
            </nav>

            {/* Main Shop Title */}
            <h2 className="text-foreground mt-1 mb-6">
              Shop
            </h2>

            {/* Utility Bar: Count & Sorting */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-border text-foreground/70">
              <span>
                Showing all {filteredProducts.length} results
              </span>

              <div className="relative inline-block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-0 py-1.5 pl-0 text-secondary-foreground rounded-xs focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  <option value="default">Default sorting</option>
                  <option value="price-low">Sort by price: low to high</option>
                  <option value="price-high">Sort by price: high to low</option>
                  <option value="name-asc">Sort by name: A to Z</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/60" />
              </div>
            </div>

            {/* Product Grid: 3 columns matching Product listing.png */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-foreground/60">
                <p className="text-foreground">
                  Nema proizvoda za odabrane kriterije.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setMaxPrice(50);
                  }}
                  className="mt-4 border border-neutral-900 text-foreground hover:bg-foreground hover:text-white px-5 py-2 uppercase transition-colors cursor-pointer"
                >
                  Poništi filtere
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {filteredProducts.map((product) => (

                  <div
                    key={product.id}
                    className="group flex flex-col cursor-pointer"
                    onClick={() => onQuickView(product)}
                  >
                    {/* Image Stage Container */}
                    <div className="relative w-full h-[270px] sm:h-[285px] bg-[#F7F3F0] rounded-xs flex items-center justify-center p-5 overflow-hidden transition-all duration-300 group-hover:bg-[#F3F0EA]">
                      
                      {/* Optional % SALE badge */}
                      {product.isSale && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-foreground text-xs text-white px-3 font-semibold py-2 rounded-full shadow-xs">
                            % SALE
                          </span>
                        </div>
                      )}

                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="max-h-[205px]  w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-sm"
                      />

                      {/* Hover Overlay Buttons */}
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

                    {/* Meta Below Image */}
                    <div className="pt-3.5 flex flex-col">
                      <span className="text-[14px] text-[#646772]">
                        {product.category}
                      </span>

                      <h6 className="text-[16px] text-[#232323]  mt-0.5 group-hover:text-primary font-bold transition-colors">
                        {product.title}
                      </h6>

                      {/* 5 Rating Stars */}
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          // <Star key={i} className="w-3.5 h-3.5 fill-[#E5A83B]" />
                  <img src="../img/single-star.svg" alt='star'></img>

                        ))}
                      </div>

                      {/* Price */}
                      <div className="mt-1.5 flex items-center text-foreground tabular-nums">
                        {product.originalPrice && (
                          <span className="text-foreground/40 line-through mr-2">
                            {product.originalPrice.toFixed(2)} €
                          </span>
                        )}
                        <span>{product.price.toFixed(2)} €</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
