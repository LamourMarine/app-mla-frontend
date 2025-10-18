// src/components/ProducersCarrousel.tsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from '../Types/product';
import ProductCard from './ProductCard';

interface ProducersCarrouselProps {
  products: Product[];
  visibleCount?: number;
}

const ProducersCarrousel: React.FC<ProducersCarrouselProps> = ({
  products,
  visibleCount = 3,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % products.length);
  };

  const getVisibleProducts = () => {
    if (startIndex + visibleCount <= products.length) {
      return products.slice(startIndex, startIndex + visibleCount);
    } else {
      return [
        ...products.slice(startIndex),
        ...products.slice(0, startIndex + visibleCount - products.length)
      ];
    }
  };

  // Ne pas afficher les flèches si pas assez de produits
  const showArrows = products.length > visibleCount;

  return (
    <div className="relative w-full mx-auto">
      {/* Flèche gauche */}
      {showArrows && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full p-3 shadow-lg z-10 transition-all hover:scale-110"
          aria-label="Produit précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Produits */}
      <div className="flex justify-center gap-6 overflow-hidden py-4 px-2">
        {getVisibleProducts().map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Flèche droite */}
      {showArrows && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full p-3 shadow-lg z-10 transition-all hover:scale-110"
          aria-label="Produit suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Indicateurs (points) */}
      {showArrows && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: products.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === startIndex
                  ? 'bg-green-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au produit ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProducersCarrousel;