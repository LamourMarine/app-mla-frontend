// src/pages/Producers.tsx
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducers } from "../store/producerSlice";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import { ASSETS_BASE_URL } from "../api";
import { ChevronDown, ChevronUp } from "lucide-react";

function Producers() {
  const dispatch = useAppDispatch();

  const producers = useAppSelector((state) => state.producer.producers);
  const allProducts = useAppSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducers());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            🌾 Circuit court
          </div>
          <h1 className="text-5xl font-bold text-gray-900">
            Nos Producteurs{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Locaux
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les artisans et producteurs passionnés de votre région
          </p>
        </div>

        {/* Sections producteurs */}
        <div className="space-y-12">
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
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌾</div>
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
  const producerProducts = allProducts.filter(
    (p) => p.seller?.id === producer.id
  );

  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll
    ? producerProducts
    : producerProducts.slice(0, 8);

  const imagePath =
    producer.photo || (producer as any).photo || "/images/default.jpg";
  const imageUrl = imagePath.startsWith("/")
    ? `${ASSETS_BASE_URL}${imagePath}`
    : imagePath;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header producteur */}
      <div className="p-8 border-b border-gray-200">
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
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {producer.name}
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {producerProducts.length} produit
                {producerProducts.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                📍 {producer.address}
              </span>
              <span className="flex items-center gap-2">
                ✉️ {producer.email}
              </span>
            </div>
          </div>
        </div>

        {/* Badge nombre de produits */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium">
          {producerProducts.length} produit
          {producerProducts.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* Grille produits */}
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bouton Voir */}
        {producerProducts.length > 8 && (
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-green-600 text-gray-700 hover:text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Voir moins
                </>
              ) : (
                <>
                  Voir tous les {producerProducts.length} produits
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Producers;
