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
        className="fixed inset-0 bg-foreground/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-background w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-foreground/40 hover:text-foreground rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Stage */}
          <div className="bg-background p-8 flex items-center justify-center relative min-h-[300px]">
            {product.isSale && (
              <span className="absolute top-4 left-4 bg-foreground text-white px-2.5 py-0.5 rounded-full">
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
              <span className="text-foreground/60 uppercase">
                {product.category}
              </span>

              <h3 className="text-foreground mt-1">
                {product.title}
              </h3>

              {/* Stars & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5A83B]" />
                  ))}
                </div>
                <span className="text-foreground/60">
                  ({product.reviewCount} recenzija)
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                {product.originalPrice && (
                  <span className="text-foreground/40 line-through">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
                <span className="text-foreground tabular-nums">
                  {product.price.toFixed(2)} €
                </span>
                <span className="text-foreground/40">
                  / pakiranje ({product.weight})
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-foreground/70">
                {product.description}
              </p>

              {/* Quality Guarantee Note */}
              <div className="mt-4 p-3 bg-background rounded-xs border border-border/80 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-foreground/70">
                  100% slavonski med s certifikatom <strong>"Med hrvatskih pčelinjaka"</strong>.
                  Ručno vrcano i punjeno u Valpovu.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-border rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-foreground/70 hover:bg-neutral-100 transition"
                >
                  -
                </button>
                <span className="px-3">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-foreground/70 hover:bg-neutral-100 transition"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-foreground hover:bg-primary text-white uppercase py-3 px-4 rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
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
