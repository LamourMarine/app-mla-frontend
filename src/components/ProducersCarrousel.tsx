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

  // Navigation vers le produit précédent (avec boucle infinie)
  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Navigation vers le produit suivant (avec boucle infinie)
  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % products.length);
  };

  // Récupère les produits visibles, gère le cas où on boucle sur la fin
  const getVisibleProducts = () => {
    if (startIndex + visibleCount <= products.length) {
      return products.slice(startIndex, startIndex + visibleCount);
    } else {
      // Boucle : prend la fin du tableau + le début
      return [
        ...products.slice(startIndex),
        ...products.slice(0, startIndex + visibleCount - products.length)
      ];
    }
  };

  const showArrows = products.length > visibleCount;

  return (
    <div className="relative">
      {/* Container principal avec les flèches */}
      <div className="flex items-center justify-center gap-8">
        
        {/* Flèche gauche - minimaliste */}
        <div className="w-10 flex-shrink-0">
          {showArrows && (
            <button
              onClick={prevSlide}
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200 p-2 hover:scale-110 active:scale-95 transition-transform"
              aria-label="Produit précédent"
            >
              <ChevronLeft className="w-7 h-7 stroke-[1.5]" />
            </button>
          )}
        </div>

        {/* Container des produits avec largeur dynamique */}
        <div 
          className="flex overflow-hidden gap-5" 
          style={{ width: `${visibleCount * 21}rem` }}
        >
          {getVisibleProducts().map((product) => (
            <div key={product.id} className="flex-shrink-0 w-80">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Flèche droite - minimaliste */}
        <div className="w-10 flex-shrink-0">
          {showArrows && (
            <button
              onClick={nextSlide}
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200 p-2 hover:scale-110 active:scale-95 transition-transform"
              aria-label="Produit suivant"
            >
              <ChevronRight className="w-7 h-7 stroke-[1.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Indicateurs de pagination épurés */}
      {showArrows && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: products.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === startIndex
                  ? 'bg-gray-900 w-8'
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5'
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