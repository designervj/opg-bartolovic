import React, { useState } from 'react';
import { Star, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { Product, ALL_PRODUCTS } from '../data/honeyData';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateShop: () => void;
  onNavigateCart: () => void;
}

interface UserReview {
  id: string;
  name: string;
  email: string;
  rating: number;
  text: string;
  date: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  onNavigateShop,
  onNavigateCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  
  // Banner state: matches "Product details page - added to cart.png"
  const [showAddedBanner, setShowAddedBanner] = useState(true);
  const [bannerProductTitle, setBannerProductTitle] = useState(product.title);

  // Reviews state
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // 4 related products
  const relatedProducts = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setBannerProductTitle(product.title);
    setShowAddedBanner(true);
    // Scroll smoothly to top so banner is prominently seen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    const newRev: UserReview = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      rating: rating || 5,
      text: reviewText.trim(),
      date: new Date().toLocaleDateString('hr-HR'),
    };

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setName('');
    setEmail('');
    setReviewText('');
    setRating(0);

    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================== */}
        {/* ADDED TO CART NOTIFICATION BANNER                         */}
        {/* (Matches "Product details page - added to cart.png")       */}
        {/* ========================================================== */}
        {showAddedBanner && (
          <div className="mb-10 w-full bg-[#F5F2EB] border-t-2 border-neutral-900 px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-xs">
            <div className="flex items-center gap-3">
              {/* Black circle with checkmark */}
              <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="font-sans-custom font-semibold text-xs sm:text-[14px] text-neutral-900">
                &ldquo;{bannerProductTitle}&rdquo; je dodano u košaricu.
              </span>
            </div>

            {/* Vidi košaricu Button */}
            <button
              type="button"
              onClick={onNavigateCart}
              className="border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white px-6 py-2.5 font-mono-custom text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer shrink-0"
            >
              Vidi košaricu
            </button>
          </div>
        )}

        {/* ========================================================== */}
        {/* TOP SECTION: 2-COLUMN PRODUCT PRESENTATION                 */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Product Showcase Container */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/3] sm:aspect-[1.15/1] bg-[#F7F6F3] rounded-xs flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
              {product.isSale && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-neutral-900 text-white text-[11px] font-mono-custom font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                    % SALE
                  </span>
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="max-h-[380px] w-auto object-contain filter drop-shadow-sm transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Information */}
          <div className="lg:col-span-6 flex flex-col justify-start pt-2">
            
            {/* Category kicker */}
            <span className="font-sans-custom text-[13px] text-neutral-500 font-normal">
              {product.category}
            </span>

            {/* Title in bold Space Mono */}
            <h1 className="font-mono-custom font-bold text-2xl sm:text-3xl lg:text-[34px] text-neutral-900 tracking-tight leading-[1.2] mt-2">
              {product.title}
            </h1>

            {/* Price line with + Besplatna dostava */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono-custom font-bold text-2xl sm:text-[26px] text-neutral-900 tabular-nums">
                {product.price.toFixed(2)} EUR
              </span>
              <span className="font-sans-custom text-xs text-neutral-500">
                + Besplatna dostava
              </span>
            </div>

            {/* Short introductory copy */}
            <p className="mt-5 font-sans-custom text-[13.5px] sm:text-[14px] text-neutral-700 leading-relaxed max-w-xl">
              Med sa saćem najzdraviji je oblik meda jer sadrži ostatke propolisa,
              peluda i matične mliječi. Ima bogatiju aromu i kiselkast okus
              zahvaljujući sačuvanim organskim kiselinama i eteričnim uljima
              biljaka.
            </p>

            {/* Stepper + Add to Cart Button */}
            <div className="mt-8 flex items-stretch gap-3">
              
              {/* Stepper Input matching screenshot */}
              <div className="relative flex items-center border border-neutral-300 rounded-xs bg-white w-20 px-3">
                <span className="font-sans-custom text-sm font-medium text-neutral-900 select-none">
                  {quantity}
                </span>
                <div className="absolute right-1 inset-y-1 flex flex-col justify-between py-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-0.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                    aria-label="Povećaj količinu"
                  >
                    <ChevronUp className="w-3 h-3 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-0.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                    aria-label="Smanji količinu"
                  >
                    <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Dodaj u košaricu Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="bg-[#1C1F20] hover:bg-neutral-800 text-white font-mono-custom text-xs uppercase tracking-wider py-3.5 px-8 rounded-xs transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                <span>Dodaj u košaricu</span>
              </button>

            </div>

            {/* Separator */}
            <div className="w-full h-px bg-neutral-200 mt-8 mb-4" />

            {/* Category meta footer */}
            <div className="font-sans-custom text-xs text-neutral-500">
              <span>Kategorija: </span>
              <button 
                onClick={onNavigateShop}
                className="text-neutral-700 hover:text-amber-900 transition-colors underline-offset-2 hover:underline cursor-pointer"
              >
                {product.category}
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================== */}
        {/* TABS SECTION: Opis proizvoda & Recenzije                   */}
        {/* ========================================================== */}
        <div className="mt-16 sm:mt-20">
          
          {/* Tab Navigation with matching top bar indicator */}
          <div className="border-t border-neutral-200/80 pt-0 relative flex gap-8">
            
            {/* Opis proizvoda tab button */}
            <button
              onClick={() => setActiveTab('description')}
              className={`pt-3.5 pb-2 font-sans-custom text-[14.5px] tracking-wide transition-all cursor-pointer relative -mt-[1px] ${
                activeTab === 'description'
                  ? 'font-bold text-neutral-900 border-t-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Opis proizvoda
            </button>

            {/* Recenzije tab button */}
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pt-3.5 pb-2 font-sans-custom text-[14.5px] tracking-wide transition-all cursor-pointer relative -mt-[1px] ${
                activeTab === 'reviews'
                  ? 'font-bold text-neutral-900 border-t-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Recenzije ({reviews.length})
            </button>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: Opis proizvoda                                    */}
          {/* ======================================================== */}
          {activeTab === 'description' && (
            <div className="pt-6 font-sans-custom text-[13.5px] sm:text-[14px] text-neutral-700 leading-relaxed space-y-4 max-w-4xl">
              <p>
                Med sa saćem je najzdraviji i najbolji način konzumacije meda zbog
                ostataka propolisa, peluda i matične mliječi koji se nalaze u pčelinjem
                saću. Med sa saćem je ukusniji od klasičnog meda jer ima kiselkast okus
                od sačuvanih organskih kiselina u saću. U saću ostaju sačuvana i
                eterična ulja biljaka s kojih pčele sakupljaju nektar, iz tog razloga mu
                je i aroma bogatija i intenzivnija.
              </p>
              <p>
                Med sa saćem je najzdraviji i najkvalitetniji oblik konzumacije meda i
                garancija je da je med u izvornom obliku, onakav kakvog su ga pčele
                proizvele, bez dodatnih obrada ili intervencija od strane čovjeka. Saće
                s medom se dobiva tijekom svibnja i lipnja - većinom na bagremovoj i
                kestenovoj paši. Medno saće se može čuvati na sobnoj temperaturi, ali
                isto tako se može i zamrznuti.
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: Recenzije                                         */}
          {/* ======================================================== */}
          {activeTab === 'reviews' && (
            <div className="pt-6 font-sans-custom">
              
              {reviews.length === 0 ? (
                <p className="text-[13.5px] text-neutral-800 mb-6 font-sans-custom">
                  Još nema recenzija.
                </p>
              ) : (
                <div className="mb-8 space-y-4 max-w-3xl">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-neutral-50/70 border border-neutral-200/80 rounded-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 text-xs sm:text-[13px]">{rev.name}</span>
                        <span className="text-[11px] text-neutral-400">{rev.date}</span>
                      </div>
                      <div className="flex text-[#E5A83B] my-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < rev.rating ? 'fill-[#E5A83B]' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-700 mt-1 leading-relaxed">{rev.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Form Box matching Product details page - reviews.png */}
              <div className="border border-neutral-300/80 bg-white p-6 sm:p-8 max-w-4xl">
                
                {reviewSubmitted && (
                  <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hvala vam! Vaša recenzija je uspješno poslana i objavljena.</span>
                  </div>
                )}

                <h3 className="font-sans-custom font-bold text-base sm:text-[17px] text-neutral-900 leading-snug">
                  Budi prvi/a i ostavi recenziju za &ldquo;{product.category || product.title}&rdquo;
                </h3>

                <p className="mt-1.5 text-xs text-neutral-500 font-sans-custom">
                  Tvoja email adresa neće biti podijeljena.
                </p>

                <form onSubmit={handleSubmitReview} className="mt-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-neutral-800">
                      Tvoja ocijena*
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-0.5 focus:outline-none transition-transform hover:scale-110"
                            aria-label={`Ocijeni s ${star} zvjezdica`}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isFilled
                                  ? 'text-[#E5A83B] fill-[#E5A83B]'
                                  : 'text-neutral-300 stroke-[1.5]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                      Tvoja recenzija*
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full p-3 text-xs sm:text-[13px] border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900 font-sans-custom resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                        Ime*
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-[13px] border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900 font-sans-custom"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                        Email*
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-[13px] border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900 font-sans-custom"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#1C1F20] hover:bg-neutral-800 text-white font-mono-custom text-xs uppercase tracking-wider py-2.5 px-7 rounded-xs transition-colors cursor-pointer"
                    >
                      Potvrdi
                    </button>
                  </div>
                </form>

              </div>

            </div>
          )}

        </div>

        {/* ========================================================== */}
        {/* POVEZANI PROIZVODI SECTION                                */}
        {/* ========================================================== */}
        <div className="mt-20 sm:mt-24">
          <h2 className="font-mono-custom font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight mb-8">
            Povezani proizvodi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                className="group flex flex-col cursor-pointer"
                onClick={() => {
                  onSelectProduct(relProduct);
                  setShowAddedBanner(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {/* Image Stage Container */}
                <div className="relative w-full h-[270px] sm:h-[285px] bg-[#F7F6F3] rounded-xs flex items-center justify-center p-6 overflow-hidden transition-all duration-300 group-hover:bg-[#F3F0EA]">
                  
                  {/* Optional % SALE badge */}
                  {relProduct.isSale && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-neutral-900 text-white text-[11px] font-mono-custom font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
                        % SALE
                      </span>
                    </div>
                  )}

                  {/* Product Image */}
                  <img
                    src={relProduct.image}
                    alt={relProduct.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[210px] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-sm"
                  />
                </div>

                {/* Metadata Below Image */}
                <div className="pt-3.5 flex flex-col">
                  <span className="font-sans-custom text-[11.5px] text-neutral-500 font-normal">
                    {relProduct.category}
                  </span>

                  <h3 className="font-sans-custom font-bold text-[14.5px] text-neutral-900 mt-0.5 leading-snug group-hover:text-amber-900 transition-colors">
                    {relProduct.title}
                  </h3>

                  {/* 5 Rating Stars */}
                  <div className="flex items-center gap-0.5 mt-1 text-[#E5A83B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E5A83B]" />
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mt-1.5 flex items-center font-sans-custom font-semibold text-[14.5px] text-neutral-900 tabular-nums">
                    {relProduct.originalPrice && (
                      <span className="text-neutral-400 font-normal line-through text-[13px] mr-2">
                        {relProduct.originalPrice.toFixed(2)} €
                      </span>
                    )}
                    <span>{relProduct.price.toFixed(2)} €</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
