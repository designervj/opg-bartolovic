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
    <div className="w-full bg-[#F7F7F7] min-h-screen py-8 sm:py-12 border-b border-neutral-200/50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ========================================================== */}
          {/* LEFT SIDEBAR: Filter by Price, Categories, Sale           */}
          {/* ========================================================== */}
          <aside className="w-full lg:w-[280px] xl:w-[310px] shrink-0 space-y-7">
            
            {/* 1. Filter by price */}
            <div className="bg-white p-6 rounded-xs shadow-xs border border-neutral-100">
              <h3 className="font-mono-custom font-bold text-[17px] text-neutral-900 tracking-tight mb-5">
                Filter by price
              </h3>

              {/* Dual Slider bar visual representation */}
              <div className="relative pt-1 pb-3">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                />
                
                <div className="flex justify-between items-center mt-3 font-sans-custom text-xs font-semibold text-neutral-800 tabular-nums">
                  <span>{minPrice}€</span>
                  <span>{maxPrice}€</span>
                </div>
              </div>
            </div>

            {/* 2. Categories */}
            <div className="bg-white p-6 rounded-xs shadow-xs border border-neutral-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono-custom font-bold text-[17px] text-neutral-900 tracking-tight">
                  Categories
                </h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-[11px] font-sans-custom text-amber-800 hover:underline"
                  >
                    Poništi
                  </button>
                )}
              </div>

              <ul className="space-y-2.5 font-sans-custom text-[13.5px]">
                {CATEGORIES_FILTER_LIST.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <li key={cat.name}>
                      <button
                        onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                        className={`w-full flex items-center justify-between py-1 transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'text-amber-900 font-semibold'
                            : 'text-neutral-700 hover:text-amber-900'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />}
                          <span>{cat.name}</span>
                        </span>
                        <span className="text-neutral-500 tabular-nums font-normal">
                          ({cat.count})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 3. Sale Sidebar */}
            <div className="bg-white p-6 rounded-xs shadow-xs border border-neutral-100">
              <h3 className="font-mono-custom font-bold text-[17px] text-neutral-900 tracking-tight mb-5">
                Sale
              </h3>

              <div className="space-y-6">
                {SALE_SIDEBAR_PRODUCTS.map((saleItem) => (
                  <div
                    key={saleItem.id}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => onQuickView(saleItem)}
                  >
                    {/* Image Container with % SALE badge */}
                    <div className="relative w-full h-[185px] sm:h-[195px] bg-[#F8F7F4] rounded-xs flex items-center justify-center p-4 overflow-hidden group-hover:bg-[#F3F0EA] transition-colors">
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="bg-neutral-900 text-white text-[10px] font-mono-custom font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
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
                      <h4 className="font-sans-custom font-bold text-[13.5px] text-neutral-900 group-hover:text-amber-900 transition-colors leading-snug">
                        {saleItem.title}
                      </h4>
                      <div className="mt-1 flex items-center font-sans-custom font-semibold text-[13.5px] text-neutral-900 tabular-nums">
                        {saleItem.originalPrice && (
                          <span className="text-neutral-400 font-normal line-through text-[12.5px] mr-2">
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
          <main className="flex-1 bg-white p-6 sm:p-8 lg:p-10 rounded-xs shadow-xs border border-neutral-100 min-w-0">
            
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 font-sans-custom text-xs text-neutral-500 mb-2">
              <button
                onClick={onNavigateHome}
                className="hover:text-amber-900 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-neutral-800 font-medium">Shop</span>
              {selectedCategory && (
                <>
                  <span>/</span>
                  <span className="text-amber-900 font-semibold">{selectedCategory}</span>
                </>
              )}
            </nav>

            {/* Main Shop Title */}
            <h1 className="font-mono-custom font-bold text-3xl sm:text-4xl text-neutral-900 tracking-tight mt-1 mb-6">
              Shop
            </h1>

            {/* Utility Bar: Count & Sorting */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-neutral-100 font-sans-custom text-xs text-neutral-600">
              <span>
                Showing all {filteredProducts.length} results
              </span>

              <div className="relative inline-block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-8 py-1.5 pl-2 font-sans-custom text-xs text-neutral-700 font-medium border border-neutral-200 rounded-xs focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  <option value="default">Default sorting</option>
                  <option value="price-low">Sort by price: low to high</option>
                  <option value="price-high">Sort by price: high to low</option>
                  <option value="name-asc">Sort by name: A to Z</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
              </div>
            </div>

            {/* Product Grid: 3 columns matching Product listing.png */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-neutral-500">
                <p className="font-mono-custom text-sm font-bold text-neutral-800">
                  Nema proizvoda za odabrane kriterije.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setMaxPrice(50);
                  }}
                  className="mt-4 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white px-5 py-2 font-mono-custom text-xs uppercase tracking-wider transition-colors cursor-pointer"
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
                    <div className="relative w-full h-[270px] sm:h-[285px] bg-[#F8F7F4] rounded-xs flex items-center justify-center p-5 overflow-hidden transition-all duration-300 group-hover:bg-[#F3F0EA]">
                      
                      {/* Optional % SALE badge */}
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
                        className="max-h-[205px] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-sm"
                      />

                      {/* Hover Overlay Buttons */}
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

                    {/* Meta Below Image */}
                    <div className="pt-3.5 flex flex-col">
                      <span className="font-sans-custom text-[11.5px] text-neutral-500 font-normal">
                        {product.category}
                      </span>

                      <h3 className="font-sans-custom font-bold text-[14.5px] text-neutral-900 mt-0.5 leading-snug group-hover:text-amber-900 transition-colors">
                        {product.title}
                      </h3>

                      {/* 5 Rating Stars */}
                      <div className="flex items-center gap-0.5 mt-1 text-[#E5A83B]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#E5A83B]" />
                        ))}
                      </div>

                      {/* Price */}
                      <div className="mt-1.5 flex items-center font-sans-custom font-semibold text-[14.5px] text-neutral-900 tabular-nums">
                        {product.originalPrice && (
                          <span className="text-neutral-400 font-normal line-through text-[13px] mr-2">
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
