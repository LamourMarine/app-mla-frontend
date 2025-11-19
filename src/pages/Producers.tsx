// src/pages/Producers.tsx
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducers } from "../store/producerSlice";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import { ASSETS_BASE_URL } from "../api";



function Producers() {
  const dispatch = useAppDispatch();

  // Lit depuis redux
  const producers = useAppSelector((state) => state.producer.producers);
  const allProducts = useAppSelector((state) => state.product.products);

  
  // Charge une seule fois au montage
  useEffect(() => {
    dispatch(fetchProducers());
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Nos Producteurs Locaux
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez les artisans et producteurs de la région
          </p>
        </div>

        {/* Sections producteurs */}
        <div className="space-y-8">
          {producers.map((producer) => (
            <ProducerSection
              key={producer.id}
              producer={producer}
              allProducts={allProducts}
            />
          ))}
        </div>

        {/* Message si aucun producteur */}
        {producers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Aucun producteur disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface ProducerSectionProps {
  producer: any; 
  allProducts: any[]; 
}

function ProducerSection({ producer, allProducts }: ProducerSectionProps) {
  // Filtre les produits de CE producteur (depuis Redux)
  const producerProducts = allProducts.filter(
    (p) => p.seller?.id === producer.id
  );

  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll 
    ? producerProducts 
    : producerProducts.slice(0, 8);

    // Gestion du chemin de l'image
  const imagePath =
    producer.photo || (producer as any).photo || "/images/default.jpg";
  const imageUrl = imagePath.startsWith("/")
    ? `${ASSETS_BASE_URL}${imagePath}`
    : imagePath;


  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header : Info producteur */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-6">
          {/* Photo */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={imageUrl} 
              alt={producer.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Infos */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {producer.name}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                📍 {producer.address}
              </span>
              <span className="flex items-center gap-1">
                ✉️ {producer.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grille avec les produits affichés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bouton Voir plus / Voir moins */}
      {producerProducts.length > 8 && (
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}  // ← Toggle
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            {showAll 
              ? '↑ Voir moins' 
              : `Voir tous les ${producerProducts.length} produits →`
            }
          </button>
        </div>
      )}
    </div>
  );
}

export default Producers;
