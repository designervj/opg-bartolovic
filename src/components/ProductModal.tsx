import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../data/honeyData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Stage */}
          <div className="bg-[#F8F7F4] p-8 flex items-center justify-center relative min-h-[300px]">
            {product.isSale && (
              <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[11px] font-mono-custom font-semibold px-2.5 py-0.5 rounded-full">
                % SALE
              </span>
            )}
            <img
              src={product.image}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="max-h-[260px] w-auto object-contain filter drop-shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="font-sans-custom text-xs text-neutral-500 uppercase tracking-wider">
                {product.category}
              </span>

              <h3 className="font-sans-custom font-bold text-xl text-neutral-900 mt-1 leading-snug">
                {product.title}
              </h3>

              {/* Stars & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#E5A83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5A83B]" />
                  ))}
                </div>
                <span className="text-xs font-sans-custom text-neutral-500">
                  ({product.reviewCount} recenzija)
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                {product.originalPrice && (
                  <span className="text-neutral-400 font-sans-custom line-through text-sm">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
                <span className="font-sans-custom font-bold text-2xl text-neutral-900 tabular-nums">
                  {product.price.toFixed(2)} €
                </span>
                <span className="text-xs text-neutral-400 font-sans-custom">
                  / pakiranje ({product.weight})
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs font-sans-custom text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quality Guarantee Note */}
              <div className="mt-4 p-3 bg-neutral-50 rounded-xs border border-neutral-200/80 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p className="text-[11px] font-sans-custom text-neutral-600 leading-tight">
                  100% slavonski med s certifikatom <strong>"Med hrvatskih pčelinjaka"</strong>.
                  Ručno vrcano i punjeno u Valpovu.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-neutral-300 rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 transition"
                >
                  -
                </button>
                <span className="px-3 font-mono-custom text-xs font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 transition"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-neutral-900 hover:bg-amber-800 text-white text-xs font-mono-custom uppercase tracking-wider py-3 px-4 rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Dodano u košaricu!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Dodaj u košaricu</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
