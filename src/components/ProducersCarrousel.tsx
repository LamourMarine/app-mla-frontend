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

  const showArrows = products.length > visibleCount;

return (
  <div className="relative">
    {/* Container avec largeur fixe pour les flèches (toujours présente) */}
    <div className="flex items-center justify-center gap-4">
      {/* Espace pour flèche gauche (invisible si pas de flèches) */}
      <div className="w-12 flex-shrink-0">
        {showArrows && (
          <button
            onClick={prevSlide}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Produit précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Container des produits */}
      <div className="flex overflow-hidden" style={{ width: `${visibleCount * 21}rem` }}>
        {getVisibleProducts().map((product) => (
          <div key={product.id} className="flex-shrink-0 w-80">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Espace pour flèche droite (invisible si pas de flèches) */}
      <div className="w-12 flex-shrink-0">
        {showArrows && (
          <button
            onClick={nextSlide}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label="Produit suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>

    {/* Indicateurs */}
    {showArrows && (
      <div className="flex justify-center gap-2 mt-6">
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
}

export default ProducersCarrousel;