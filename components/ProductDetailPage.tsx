import React, { useEffect, useState } from 'react';
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
  const [showAddedBanner, setShowAddedBanner] = useState(false);
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

  useEffect(() => {
    setQuantity(1);
    setShowAddedBanner(false);
    setBannerProductTitle(product.title);
  }, [product.id, product.title]);

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
    <div className="w-full bg-background min-h-screen py-8 sm:py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================== */}
        {/* ADDED TO CART NOTIFICATION BANNER                         */}
        {/* (Matches "Product details page - added to cart.png")       */}
        {/* ========================================================== */}
        {showAddedBanner && (
          <div className="mb-10 w-full bg-[#F5F2EB] border-t-2 border-neutral-900 px-6 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-xs">
            <div className="flex items-center gap-3">
              {/* Black circle with checkmark */}
              <div className="w-5 h-5 rounded-full bg-foreground text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="sm:text-[14px] text-foreground">
                &ldquo;{bannerProductTitle}&rdquo; je dodano u košaricu.
              </span>
            </div>

            {/* Vidi košaricu Button */}
            <button
              type="button"
              onClick={onNavigateCart}
              className="border border-neutral-900 text-foreground hover:bg-foreground hover:text-white px-6 py-2.5 uppercase transition-colors duration-200 cursor-pointer shrink-0"
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
                  <span className="bg-foreground text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    % SALE
                  </span>
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className=" w-[400px] h-auto object-contain filter drop-shadow-sm transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Information */}
          <div className="lg:col-span-6 flex flex-col justify-start pt-2">
            
            {/* Category kicker */}
            <span className="text-[13px] text-foreground/60">
              {product.category}
            </span>

            {/* Title in bold Space Mono */}
            <h3 className=" text-foreground mt-2">
              {product.title}
            </h3>

            {/* Price line with + Besplatna dostava */}
            <div className="mt-4 flex items-baseline gap-3">
              <h5 className="sm:text- text-foreground tabular-nums">
                {product.price.toFixed(2)} EUR
              </h5>
              <span className="text-foreground/60 text-sm">
                + Besplatna dostava
              </span>
            </div>

            {/* Short introductory copy */}
            <p className="mt-5 text-neutral-700 max-w-xl">
              Med sa saćem najzdraviji je oblik meda jer sadrži ostatke propolisa,
              peluda i matične mliječi. Ima bogatiju aromu i kiselkast okus
              zahvaljujući sačuvanim organskim kiselinama i eteričnim uljima
              biljaka.
            </p>

            {/* Stepper + Add to Cart Button */}
            <div className="mt-8 flex items-stretch gap-3">
              
              {/* Stepper Input matching screenshot */}
              <div className="relative flex items-center border border-border rounded-xs bg-background w-20 px-3">
                <span className="text-foreground select-none">
                  {quantity}
                </span>
                <div className="absolute right-1 inset-y-1 flex flex-col justify-between py-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-0.5 text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="Povećaj količinu"
                  >
                    <ChevronUp className="w-3 h-3 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-0.5 text-foreground/60 hover:text-foreground transition-colors"
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
                className="bg-[#1C1F20] hover:bg-neutral-800 text-white uppercase py-3.5 px-8 rounded-xs transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                <span>Dodaj u košaricu</span>
              </button>

            </div>

            {/* Separator */}
            <div className="w-full h-px bg-neutral-200 mt-8 mb-4" />

            {/* Category meta footer */}
            <div className="text-foreground/60">
              <span>Kategorija: </span>
              <button 
                onClick={onNavigateShop}
                className="text-sm font-[400] hover:text-primary transition-colors underline-offset-2 hover:underline cursor-pointer"
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
          <div className="border-t border-border/80 pt-0 relative flex gap-8">
            
            {/* Opis proizvoda tab button */}
            <button
              onClick={() => setActiveTab('description')}
              className={`pt-3.5 pb-2    transition-all cursor-pointer relative -mt-[1px] ${
                activeTab === 'description'
                  ? ' text-foreground border-t-2 border-neutral-900'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Opis proizvoda
            </button>

            {/* Recenzije tab button */}
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pt-3.5 pb-2    transition-all cursor-pointer relative -mt-[1px] ${
                activeTab === 'reviews'
                  ? ' text-foreground border-t-2 border-neutral-900'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Recenzije ({reviews.length})
            </button>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: Opis proizvoda                                    */}
          {/* ======================================================== */}
          {activeTab === 'description' && (
            <div className="pt-6 text-neutral-700 space-y-4 max-w-4xl">
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
            <div className="pt-6">
              
              {reviews.length === 0 ? (
                <p className=" text-primary-foreground mb-6">
                  Još nema recenzija.
                </p>
              ) : (
                <div className="mb-8 space-y-4 max-w-3xl">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-background/70 border border-border/80 rounded-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">{rev.name}</span>
                        <span className="text-[11px] text-foreground/40">{rev.date}</span>
                      </div>
                      <div className="flex my-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < rev.rating ? 'fill-[#E5A83B]' : 'text-foreground/40'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-neutral-700 mt-1">{rev.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Form Box matching Product details page - reviews.png */}
              <div className="border border-border/80 bg-background p-6 sm:p-8 max-w-4xl">
                
                {reviewSubmitted && (
                  <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hvala vam! Vaša recenzija je uspješno poslana i objavljena.</span>
                  </div>
                )}

                <h5 >
                  Budi prvi/a i ostavi recenziju za &ldquo;{product.category || product.title}&rdquo;
                </h5>

                <p className="mt-1.5 text-foreground/60">
                  Tvoja email adresa neće biti podijeljena.
                </p>

                <form onSubmit={handleSubmitReview} className="mt-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-foreground font-semibold">
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
                            className="p-0.5 font-semibold focus:outline-none transition-transform hover:scale-110"
                            aria-label={`Ocijeni s ${star} zvjezdica`}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isFilled
                                  ? 'text-[#E5A83B] fill-[#E5A83B]'
                                  : 'text-foreground/40 stroke-[1.5]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-foreground mb-1.5 font-semibold">
                      Tvoja recenzija*
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full p-3 border border-border rounded-xs focus:outline-none focus:border-neutral-900 resize-y"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-primary-foreground mb-1.5 text-sm font-semibold">
                        Ime*
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-primary-foreground mb-1.5 text-sm font-semibold">
                        Email*
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#1C1F20] hover:bg-neutral-800 text-white tracking-[1px] text-md py-2.5 px-7 rounded-xs transition-colors cursor-pointer"
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
          <h2 className="text-foreground mb-8 tracking-[2px] ">
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
                      <span className="bg-foreground text-white px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
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
                  <span className="text-[14px] text-[#646772]">
                    {relProduct.category}
                  </span>

                  <h3 className="text-[16px] text-[#232323]  mt-0.5 group-hover:text-primary font-bold transition-colors">
                    {relProduct.title}
                  </h3>

                  {/* 5 Rating Stars */}
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      // <Star key={i} className="w-3.5 h-3.5 fill-[#E5A83B]" />
                      <img alt="star" src="../img/single-star.svg"></img>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mt-1.5 flex items-center text-foreground tabular-nums">
                    {relProduct.originalPrice && (
                      <span className="text-foreground/40 line-through mr-2">
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
